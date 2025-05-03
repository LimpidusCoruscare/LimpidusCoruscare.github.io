import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>LimpidusCoruscans | Web Development and Programming Tech Blog</title>

        {/* 기본 메타 태그 */}
        <meta name="description" content="A blog about web development, programming, and technology trends." />
        <meta name="author" content="LimpidusCoruscans" />
        <meta name="keywords" content="blog, web development, programming, computer science, java, spring boot, javascript, react, Next.js" />

        {/* 오픈 그래프 태그 - Facebook, LinkedIn 등 소셜 미디어 공유용 */}
        <meta property="og:title" content="LimpidusCoruscans | Web Development and Programming Tech Blog" />
        <meta property="og:description" content="A blog about web development, programming, and technology trends." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://limpcoru.github.io" />
        <meta property="og:image" content="https://limpcoru.github.io/images/blog-cover.png" />
        <meta property="og:site_name" content="LimpidusCoruscans Tech Blog" />

        {/* Twitter 카드 태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LimpidusCoruscans | Web Development and Programming Tech Blog" />
        <meta name="twitter:description" content="A blog about web development, programming, and technology trends." />
        <meta name="twitter:image" content="https://limpcoru.github.io/images/blog-cover.png" />

        {/* 표준 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://limpcoru.github.io" />
      </Head>
      <Box sx={{ mt: 2, mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          Hi, nice to meet you 👋
          <br></br>My name is <span>Kim CheolHwan.</span>
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ mb: 2 }}
        >
          I am a software engineer with a passion for building web applications
          and exploring new technologies. <br></br>I anticipate that documenting my
          technical journey through blog posts will not only reinforce my own
          learning <br></br>but also assist others in their endeavors.
        </Typography>
        <Divider sx={{ mb: 4, mt: 4 }} />
        <Grid2 container spacing={2} sx={{ mb: 4 }}>
          <Grid2 size={8}>
            <Typography
              variant="h4"
              component="p"
              sx={{ mb: 2 }}
              style={{ fontWeight: 'bold' }}
            >
              Recent posts
            </Typography>
          </Grid2>
          <Grid2 size={4} sx={{ textAlign: 'right' }}>
            <Link href="/blog">
              <Button
                color="primary"
                variant="outlined"
                sx={{
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                View all posts
              </Button>
            </Link>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2}>
          {posts?.length === 0 ? (
            <Typography variant="body1" component="p">
              No posts available.
            </Typography>
          )
            : (
              posts.map((post) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post.id} sx={{ mb: 2 }}>
                  <PostCard post={post} />
                </Grid2>
              )))}
        </Grid2>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const POSTS_PER_PAGE = 3;

  return {
    props: {
      posts: allPosts.slice(0, POSTS_PER_PAGE),
    },
  };
}