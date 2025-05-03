import Head from 'next/head';
import { Box, Typography, Grid2 } from '@mui/material';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import { getAllPosts } from '@/lib/posts';
import NotFound from '@/components/NotFound';

export default function BlogPage({ posts, totalPosts }) {
  return (
    <>
      <Head>
        <title>Blog | LimpidusCoruscans Tech Blog</title>

        {/* 기본 메타 태그 */}
        <meta name="description" content="A collection of blog posts about web development and programming by LimpidusCoruscans." />
        <meta name="author" content="LimpidusCoruscans" />
        <meta name="keywords" content="blog, web development, programming, computer science, java, spring boot, javascript, react, Next.js" />

        {/* 오픈 그래프 태그 - Facebook, LinkedIn 등 소셜 미디어 공유용 */}
        <meta property="og:title" content="Blog | LimpidusCoruscans Tech Blog" />
        <meta property="og:description" content="A collection of blog posts about web development and programming by LimpidusCoruscans." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://limpcoru.github.io/blog" />
        <meta property="og:image" content="https://limpcoru.github.io/images/blog-cover.png" />
        <meta property="og:site_name" content="LimpidusCoruscans Tech Blog" />

        {/* Twitter 카드 태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | LimpidusCoruscans Tech Blog" />
        <meta name="twitter:description" content="A collection of blog posts about web development and programming by LimpidusCoruscans." />
        <meta name="twitter:image" content="https://limpcoru.github.io/images/blog-cover.png" />

        {/* 표준 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://limpcoru.github.io/blog" />
      </Head>

      <Box sx={{ mt: 2, mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          Blog
        </Typography>

        {posts.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '50vh',
              textAlign: 'center',
              pt: 6,
            }}
          >
            <NotFound message={"posts"} />
          </Box>
        ) : (
          <Grid2
            container
            spacing={4}
          >

            <SearchBar />
            {posts.map((post) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post.id} sx={{ mb: 2 }}>
                <PostCard post={post} />
              </Grid2>
            ))}
          </Grid2>
        )}



        <Pagination totalItems={totalPosts} currentPage={1} />
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const POSTS_PER_PAGE = 9;

  return {
    props: {
      posts: allPosts.slice(0, POSTS_PER_PAGE),
      totalPosts: allPosts.length,
    },
  };
}