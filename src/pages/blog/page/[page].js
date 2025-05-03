import Head from 'next/head';
import { Box, Typography, Grid2 } from '@mui/material';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import { getAllPosts } from '@/lib/posts';
import Custom404 from '@/pages/404';

export default function BlogPagePaginated({
  posts,
  currentPage,
  totalPosts
}) {
  if (!posts || posts.length === 0) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>Blog Page {currentPage} | LimpidusCoruscans Tech Blog</title>

        {/* 기본 메타 태그 */}
        <meta name="description" content={`Collection of LimpidusCoruscans blog posts - Page ${currentPage}`} />
        <meta name="author" content="LimpidusCoruscans" />
        <meta name="keywords" content="blog, web development, programming, computer science, java, spring boot, javascript, react, Next.js" />

        {/* 오픈 그래프 태그 - Facebook, LinkedIn 등 소셜 미디어 공유용 */}
        <meta property="og:title" content={`Blog Page ${currentPage} | LimpidusCoruscans Tech Blog`} />
        <meta property="og:description" content={`Collection of LimpidusCoruscans blog posts - Page ${currentPage}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://limpcoru.github.io/blog/page/${currentPage}`} />
        <meta property="og:image" content="https://limpcoru.github.io/images/blog-cover.png" />
        <meta property="og:site_name" content="LimpidusCoruscans Tech Blog" />

        {/* Twitter 카드 태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Blog Page ${currentPage} | LimpidusCoruscans Tech Blog`} />
        <meta name="twitter:description" content={`Collection of LimpidusCoruscans blog posts - Page ${currentPage}`} />
        <meta name="twitter:image" content="https://limpcoru.github.io/images/blog-cover.png" />

        {/* 표준 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://limpcoru.github.io/blog/page/${currentPage}`} />
      </Head>

      <Box sx={{ mt: 2, mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          Blog
        </Typography>

        <SearchBar />

        <Grid2 container spacing={4}>
          {posts.map((post) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
              <PostCard post={post} />
            </Grid2>
          ))}
        </Grid2>

        <Pagination
          totalItems={totalPosts}
          currentPage={currentPage}
        />
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const allPosts = getAllPosts();
  const POSTS_PER_PAGE = 9;
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const paths = Array.from({ length: totalPages }).map((_, i) => ({
    params: { page: String(i + 1) },
  }));

  // 첫 페이지는 /blog로 처리하므로 제외
  return {
    paths: paths.filter(path => path.params.page !== '1'),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page);
  const POSTS_PER_PAGE = 9;

  const allPosts = getAllPosts();
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  return {
    props: {
      posts: allPosts.slice(startIndex, endIndex),
      currentPage: page,
      totalPosts: allPosts.length,
    },
  };
}