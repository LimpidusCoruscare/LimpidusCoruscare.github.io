import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Typography,
  Grid2,
  CircularProgress,
  Divider,
  IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import { getAllPosts } from '../lib/posts';

export default function SearchPage({ posts }) {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const query = q.toLowerCase();

    // 검색 로직
    const results = posts.filter((post) => {
      const titleMatch = post.title?.toLowerCase().includes(query);
      const excerptMatch = post.excerpt?.toLowerCase().includes(query);
      const contentMatch = post.content?.toLowerCase().includes(query);
      const tagMatch = post.tags?.some(tag =>
        tag.toLowerCase().includes(query)
      );

      return titleMatch || excerptMatch || contentMatch || tagMatch;
    });

    setSearchResults(results);
    setLoading(false);
  }, [q, posts]);

  return (
    <>
      <Head>
        <title>{q ? `"${q}" Search Results` : 'Search'} | LimpidusCoruscans Tech Blog</title>

        {/* 기본 메타 태그 */}
        <meta name="description" content={q ? `Search results for "${q}" in the LimpidusCoruscans blog.` : 'Search page for LimpidusCoruscans blog.'} />
        <meta name="author" content="LimpidusCoruscans" />
        <meta name="keywords" content={`search, ${q || ''}, blog, web development, programming`} />

        {/* 오픈 그래프 태그 - Facebook, LinkedIn 등 소셜 미디어 공유용 */}
        <meta property="og:title" content={q ? `"${q}" Search Results | LimpidusCoruscans Tech Blog` : 'Search | LimpidusCoruscans Tech Blog'} />
        <meta property="og:description" content={q ? `Search results for "${q}" in the LimpidusCoruscans blog.` : 'Search page for LimpidusCoruscans blog.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://LimpidusCoruscare.github.io/search${q ? `?q=${q}` : ''}`} />
        <meta property="og:image" content="https://LimpidusCoruscare.github.io/images/blog-cover.png" />
        <meta property="og:site_name" content="LimpidusCoruscans Tech Blog" />

        {/* Twitter 카드 태그 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={q ? `"${q}" Search Results | LimpidusCoruscans Tech Blog` : 'Search | LimpidusCoruscans Tech Blog'} />
        <meta name="twitter:description" content={q ? `Search results for "${q}" in the LimpidusCoruscans blog.` : 'Search page for LimpidusCoruscans blog.'} />
        <meta name="twitter:image" content="https://LimpidusCoruscare.github.io/images/blog-cover.png" />

        {/* 표준 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://LimpidusCoruscare.github.io/search${q ? `?q=${q}` : ''}`} />

        {/* 검색 엔진 제어 메타 태그 - 검색 결과 페이지는 인덱싱하지 않도록 설정 */}
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Box sx={{ mt: 2, mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          <IconButton aria-label="back" color="inherit" onClick={() => router.back()} sx={{ mb: 1 }}>
            <ArrowBack fontSize="large" />
          </IconButton>
          Search
        </Typography>

        <SearchBar keyword={q} />

        <Divider sx={{ mb: 4 }} />

        {q && (
          <Typography variant="h5" sx={{ mb: 4 }}>
            Search Result about &quot;{q}&quot;
            {!loading && (
              <Typography component="span" color="text.secondary">
                ({searchResults.length})
              </Typography>
            )}
          </Typography>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {q && searchResults.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', p: 4 }}>
                No search results found. Try another keyword.
              </Typography>
            ) : (
              <Grid2 container spacing={4}>
                {searchResults.map((post) => (
                  <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={post.id} sx={{ mb: 2 }}>
                    <PostCard post={post} />
                  </Grid2>
                ))}
              </Grid2>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  // 검색을 위해 내용 처리
  const searchablePosts = posts.map(post => ({
    ...post,
    content: post.content || '', // 콘텐츠가 있으면 사용, 없으면 빈 문자열
  }));

  return {
    props: {
      posts: searchablePosts,
    },
  };
}