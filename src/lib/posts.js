import { remark } from 'remark';
import { serialize } from 'next-mdx-remote/serialize';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import breaks from 'remark-breaks'; // 줄바꿈을 위한 플러그인 추가

// 모든 포스트 데이터 가져오기
export function getAllPosts() {
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');

  const postsDirectory = path.join(process.cwd(), 'content/posts');

  // /content/posts 디렉토리에서 파일 이름을 가져오기
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      // ID로 파일 이름에서 .md 제거
      const id = fileName.replace(/\.mdx?$/, '');

      // 마크다운 파일을 읽어서 문자열로 변환
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // gray-matter를 사용하여 post 메타데이터 파싱
      const matterResult = matter(fileContents);

      // 데이터와 ID 결합 (content 추가)
      return {
        id,
        content: matterResult.content, // 검색을 위한 마크다운 콘텐츠 추가
        ...matterResult.data
      };
    })
    // 날짜를 기준으로 포스트 정렬
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

// 모든 포스트 ID 가져오기(동적 라우팅용)
export function getAllPostIds() {
  const fs = require('fs');
  const path = require('path');

  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.mdx?$/, '')
        }
      };
    });
}

// ID로 특정 포스트 데이터 가져오기
export async function getPostData(id) {
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');

  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const fullPath = path.join(postsDirectory, `${id}.md`);
  let fileContents;

  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      // 파일이 없는 경우에만 .mdx 시도
      try {
        fileContents = fs.readFileSync(mdxPath, 'utf8');
      } catch (mdxError) {
        throw new Error(`Post ${id} not found in either .md or .mdx format: ${mdxError.message}`);
      }
    } else {
      // 다른 에러는 그대로 전파
      throw new Error(`Error reading post ${id}: ${error.message}`);
    }
  }

  // gray-matter를 사용하여 post 메타데이터 파싱
  const matterResult = matter(fileContents);

  // 마크다운 콘텐츠를 HTML 문자열로 변환
  const processedContent = await remark()
    .use(breaks) // 줄바꿈을 <br>로 변환하는 플러그인 추가
    .use(remarkParse)
    .use(remarkRehype, {
      allowDangerousHtml: false // HTML 태그를 보존
    })
    .use(rehypeSlug) // rehypeSlug를 먼저 적용하여 헤딩에 ID 추가
    .use(rehypePrismPlus, {
      showLineNumbers: true,
      ignoreMissing: true,
    })
    .use(rehypeStringify, {
      allowDangerousHtml: false // HTML 태그를 보존
    })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // MDX 처리 (코드 하이라이팅 등 고급 기능 추가)
  const mdxSource = await serialize(matterResult.content, {
    mdxOptions: {
      remarkPlugins: [
        breaks, // 줄바꿈을 위한 플러그인 MDX 처리에도 추가
      ],
      rehypePlugins: [
        rehypeSlug, // 헤딩에 ID 추가 (목차 기능용)
        [rehypePrismPlus, {
          showLineNumbers: true, // 라인 번호 표시
          ignoreMissing: true, // 알 수 없는 언어 무시
        }]
      ]
    }
  });

  // 데이터와 ID 및 콘텐츠 결합
  return {
    id,
    contentHtml: contentHtml, // 후처리된 HTML 사용
    mdxSource,
    ...matterResult.data
  };
}