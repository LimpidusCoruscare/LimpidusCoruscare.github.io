/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // 정적 HTML/CSS/JS 파일로 내보내기
  images: {
    unoptimized: true, // GitHub Pages에서는 Next.js의 이미지 최적화 기능을 사용할 수 없으므로 비활성화
  },
};

export default nextConfig;
