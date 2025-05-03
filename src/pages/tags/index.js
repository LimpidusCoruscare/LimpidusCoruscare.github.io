import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Typography,
  Chip,
  Paper
} from '@mui/material';
import { getAllTags, getTagCounts } from '@/lib/tags';
import NotFound from '@/components/NotFound';

export default function TagsPage({ tags, counts }) {

  return (
    <>
      <Head>
        <title>All Tags | LimpidusCoruscans Tech Blog</title>

        {/* 기본 메타 태그 */}
        <meta name="description" content="Browse all tags from LimpidusCoruscans blog. Find articles by topics of interest." />
        <meta name="author" content="LimpidusCoruscans" />
        <meta name="keywords" content="tags, categories, web development, programming, computer science, tech blog" />

        {/* 오픈 그래프 태그 - Facebook, LinkedIn 등 소셜 미디어 공유용 */}
        <meta property="og:title" content="All Tags | LimpidusCoruscans Tech Blog" />
        <meta property="og:description" content="Browse all tags from LimpidusCoruscans blog. Find articles by topics of interest." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://limpcoru.github.io/tags" />
        <meta property="og:image" content="https://limpcoru.github.io/tags.svg" />
        <meta property="og:site_name" content="LimpidusCoruscans Tech Blog" />

        {/* Twitter 카드 태그 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="All Tags | LimpidusCoruscans Tech Blog" />
        <meta name="twitter:description" content="Browse all tags from LimpidusCoruscans blog. Find articles by topics of interest." />
        <meta name="twitter:image" content="https://limpcoru.github.io/tags.svg" />

        {/* 표준 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://limpcoru.github.io/tags" />
      </Head>
      <Box sx={{ mt: 2, mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          Tags
        </Typography>
        {tags.length === 0 ? (
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
            <NotFound message={"tags"} />
          </Box>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Click on a tag to explore related posts.
            </Typography>

            <Paper
              elevation={0}
              variant="outlined"
              sx={{
                p: 4,
                borderRadius: 2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`${tag} (${counts[tag]})`}
                  component={Link}
                  href={`/tags/${tag}`}
                  clickable
                  sx={(theme) => ({
                    bgcolor: theme.palette.mode === 'light'
                      ? 'primary.main'
                      : 'background.paper',
                    color: theme.palette.mode === 'light'
                      ? 'white'
                      : 'primary.main',
                    border: theme.palette.mode === 'dark' ? 1 : 0,
                    borderColor: 'primary.main',
                    p: 1,
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'light'
                        ? 'primary.dark'
                        : 'action.hover',
                    }
                  })}
                />
              ))}
            </Paper>
          </>
        )}
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const tags = await getAllTags();
  const counts = await getTagCounts();

  return {
    props: {
      tags,
      counts,
    },
  };
}