import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import breaks from 'remark-breaks';

export default async function markdownToHtml(markdown) {
  // 줄바꿈 문자 정규화 (Windows CRLF -> LF)
  const normalizedMarkdown = markdown.replace(/\r\n/g, '\n');

  const result = await remark()
    .use(breaks) // 줄바꿈 처리 추가
    .use(remarkParse)
    .use(remarkRehype, {
      allowDangerousHtml: false
    })
    .use(rehypeSlug) // 헤딩에 id 속성 추가 (rehype 방식으로 변경)
    .use(rehypePrismPlus, {
      showLineNumbers: true,
      ignoreMissing: true,
    })
    .use(rehypeStringify, {
      allowDangerousHtml: false
    })
    .process(normalizedMarkdown);

  return result.toString();
}