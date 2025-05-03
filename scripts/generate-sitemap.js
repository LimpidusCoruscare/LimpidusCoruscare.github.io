const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');

// 태그 목록을 가져오는 함수
const getAllTagsForSitemap = async () => {
  try {
    // 모든 포스트 파일에서 태그 정보 추출
    const postFiles = await glob(['content/posts/**/*.md', 'content/posts/**/*.mdx']);
    const tagsSet = new Set();

    for (const file of postFiles) {
      const content = fs.readFileSync(file, 'utf8');
      // frontmatter에서 tags 부분 찾기
      const tagsMatch = content.match(/tags:\s*\[(.*?)\]/s);
      if (tagsMatch && tagsMatch[1]) {
        // 태그 문자열 파싱
        const tagsStr = tagsMatch[1];
        const tagsList = tagsStr.match(/'([^']+)'|"([^"]+)"/g);

        if (tagsList) {
          tagsList.forEach(tag => {
            // 따옴표 제거
            const cleanTag = tag.replace(/['"]/g, '').trim();
            if (cleanTag) {
              tagsSet.add(cleanTag);
            }
          });
        }
      }
    }

    return Array.from(tagsSet);
  } catch (error) {
    console.error('Error extracting tags:', error);
    return [];
  }
};

(async () => {
  const baseUrl = 'https://LimpidusCoruscare.github.io'; // 실제 도메인으로 변경

  console.log('Sitemap genration started...');

  // 올바른 경로 패턴으로 수정 - 404 페이지 제외
  const pages = await glob([
    'src/pages/**/*.js',
    'src/pages/**/*.jsx',
    'content/posts/**/*.md',
    'content/posts/**/*.mdx',
    '!src/pages/_*.js',
    '!src/pages/_*.jsx',
    '!src/pages/api/**/*.js',
    '!src/pages/404.js', // 404 페이지 제외
  ]);

  // 마크다운 파일 경로를 URL로 변환
  const markdownUrls = pages
    .filter(page => page.includes('content/posts'))
    .map(page => {
      // 파일명만 추출 (확장자 제외)
      const slug = path.basename(page, path.extname(page));
      // 파일 수정 날짜 가져오기
      const fileStat = fs.statSync(page);
      return {
        url: `/blog/${slug}`,
        lastmod: fileStat.mtime.toISOString().split('T')[0], // YYYY-MM-DD 형식
        priority: 1.0 // 블로그 포스트 우선순위
      };
    });

  // 일반 페이지 경로를 URL로 변환
  const pageUrls = pages
    .filter(page => page.includes('src/pages'))
    .map(page => {
      // src/pages 부분 제거 및 확장자 제거
      let url = page
        .replace('src/pages', '')
        .replace(/\.(js|jsx)$/, '');

      // 동적 라우트 ([slug], [page] 등) 제외
      if (url.includes('[') && url.includes(']')) {
        return null;
      }

      // /index를 /로 변환
      url = url.replace(/\/index$/, '/');

      // 빈 문자열이면 홈 페이지
      if (url === '') {
        url = '/';
      }

      // 파일 수정 날짜 가져오기
      const fileStat = fs.statSync(page);

      // 우선순위 결정
      let priority = 0.6; // 기본 우선순위
      if (url === '/') {
        priority = 0.8; // 홈페이지
      } else if (url === '/blog') {
        priority = 0.7; // 블로그 메인
      } else if (url.includes('/tags')) {
        priority = 0.4; // 태그 페이지
      }

      return {
        url,
        lastmod: fileStat.mtime.toISOString().split('T')[0],
        priority
      };
    })
    .filter(Boolean); // null 값 제거

  // 모든 태그 가져오기
  const tags = await getAllTagsForSitemap();
  console.log(`Found ${tags.length} tags.`);

  // 태그 페이지 URL 생성
  const tagUrls = tags.map(tag => {
    return {
      url: `/tags/${encodeURIComponent(tag)}`,
      lastmod: new Date().toISOString().split('T')[0], // 현재 날짜
      priority: 0.5 // 태그 상세 페이지
    };
  });

  const allUrls = [...pageUrls, ...markdownUrls, ...tagUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
      .map(item => {
        return `
    <url>
      <loc>${baseUrl}${item.url}</loc>
      <lastmod>${item.lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${item.priority}</priority>
    </url>
  `;
      })
      .join('')}
</urlset>
`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated!');
  console.log(`Total URLs: ${allUrls.length} (Pages: ${pageUrls.length}, Posts: ${markdownUrls.length}, Tags: ${tagUrls.length})`);
})();