import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Typography,
  Grid2,
  IconButton,
  useTheme
} from '@mui/material';
import PostCard from '@/components/PostCard';
import { getAllTags, getPostsByTag } from '@/lib/tags';
import { ArrowBack } from '@mui/icons-material';
import { generateMaterialYouPalette } from '@/theme/colorUtils';

export default function TagPage({ tag, posts }) {
  const router = useRouter();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const materialYouPalette = generateMaterialYouPalette(primaryColor);

  return (
    <>
      <Head>
        <title>{tag} Related Posts | LimpidusCoruscans Tech Blog</title>

        {/* 기본 메타 태그 */}
        <meta name="description" content={`A collection of blog posts related to the ${tag} tag. Explore posts about ${tag} from LimpidusCoruscans.`} />
        <meta name="author" content="LimpidusCoruscans" />
        <meta name="keywords" content={`${tag}, blog, web development, programming, computer science, java, spring boot, javascript, react, Next.js`} />

        {/* 오픈 그래프 태그 - Facebook, LinkedIn 등 소셜 미디어 공유용 */}
        <meta property="og:title" content={`${tag} Related Posts | LimpidusCoruscans Tech Blog`} />
        <meta property="og:description" content={`A collection of blog posts related to the ${tag} tag. Explore posts about ${tag} from LimpidusCoruscans.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://LimpidusCoruscare.github.io/tags/${tag}`} />
        <meta property="og:image" content="https://LimpidusCoruscare.github.io/tags.svg" />
        <meta property="og:site_name" content="LimpidusCoruscans Tech Blog" />

        {/* Twitter 카드 태그 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${tag} Related Posts | LimpidusCoruscans Tech Blog`} />
        <meta name="twitter:description" content={`A collection of blog posts related to the ${tag} tag. Explore posts about ${tag} from LimpidusCoruscans.`} />
        <meta name="twitter:image" content="https://LimpidusCoruscare.github.io/tags.svg" />

        {/* 표준 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://LimpidusCoruscare.github.io/tags/${tag}`} />
      </Head>

      <Box sx={{ mt: 2, mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 1, fontWeight: 'bold' }}
        >
          <IconButton aria-label="back" color="inherit" onClick={() => router.back()} sx={{ mb: 1 }}>
            <ArrowBack fontSize="large" />
          </IconButton>
          Tag: <i style={{ color: materialYouPalette.main }}>{tag}</i>
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          {posts.length} post(s) found
        </Typography>

        <Grid2
          container
          spacing={4}
        >
          {posts.map((post) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post.id} sx={{ mb: 2 }}>
              <PostCard post={post} />
            </Grid2>
          ))}
        </Grid2>

        {posts.length === 0 && (
          <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
            No posts found for this tag. Try another one.
          </Typography>
        )}
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const tags = await getAllTags();

  return {
    paths: tags.map((tag) => ({
      params: { tags: tag },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tag = params.tags;
  const posts = await getPostsByTag(tag);

  return {
    props: {
      tag,
      posts,
    },
  };
}