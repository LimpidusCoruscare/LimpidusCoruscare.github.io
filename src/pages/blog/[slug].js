import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { Box, Typography, Chip, Divider, Card, CardContent } from '@mui/material';
import { getPostData, getAllPosts, getAllPostIds } from '@/lib/posts';
import ShareButtons from '@/components/ShareButtons';
import TableOfContents from '@/components/TableOfContents';
import AuthorBio from '@/components/AuthorBio';
import RelatedPosts from '@/components/RelatedPosts';
import CodeBlock from '@/components/CodeBlock'; // 코드 블록 컴포넌트 추가
import GiscusComments from '@/components/GiscusComments';

export default function Post({ post, relatedPosts }) {
  const router = useRouter();

  const handleTagClick = (e, tag) => {
    e.preventDefault(); // 기본 동작 방지
    e.stopPropagation(); // 이벤트 버블링 방지(카드 클릭 이벤트가 발생하지 않도록)
    router.push(`/tags/${tag}`);
  };

  if (!router.isFallback && !post) {
    return (
      <Box maxWidth="sm">
        <ErrorPage statusCode={404} />
      </Box>
    );
  }

  return (
    <>
      {router.isFallback ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Head>
            <title>{post.title} | LimpidusCoruscans Tech Blog</title>

            {/* 기본 메타 태그 */}
            <meta name="description" content={post.excerpt || `Post: ${post.title}`} />
            <meta name="author" content={post.author?.name || 'LimpidusCoruscans'} />
            <meta name="keywords" content={post.tags?.join(', ') || 'blog, web development, programming, computer science'} />

            {/* 오픈 그래프 태그 - Facebook, LinkedIn 등 소셜 미디어 공유용 */}
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt || `Post: ${post.title}`} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`https://LimpidusCoruscare.github.io/blog/${post.id}`} />
            {post.coverImage && <meta property="og:image" content={post.coverImage || 'https://LimpidusCoruscare.github.io/images/blog-cover.png'} />}
            <meta property="og:site_name" content="Blog of LimpidusCoruscans" />
            {post.date && <meta property="article:published_time" content={new Date(post.date).toISOString()} />}
            {post.tags?.map((tag, index) => (
              <meta property="article:tag" content={tag} key={index} />
            ))}

            {/* Twitter 카드 태그 */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={post.excerpt || `Post: ${post.title}`} />
            {post.coverImage && <meta name="twitter:image" content={post.coverImage || 'https://LimpidusCoruscare.github.io/images/blog-cover.png'} />}

            {/* 표준 메타 태그 */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="canonical" href={`https://LimpidusCoruscare.github.io/blog/${post.id}`} />
          </Head>

          {/* CodeBlock 컴포넌트 추가 - 이것이 코드 블록에 복사 버튼을 추가합니다 */}
          <CodeBlock />

          <Box sx={{ mt: 2, mb: 4 }}>
            {/* 헤더 섹션 */}
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 'bold', mb: 2 }}
            >
              {post.title}
            </Typography>

            {/* 날짜 표시 */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {post.date}
            </Typography>

            {/* 태그 */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              {post.tags?.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  clickable
                  onClick={(e) => handleTagClick(e, tag)}
                  sx={(theme) => ({
                    bgcolor: 'primary.main',
                    color: theme.palette.mode === 'light'
                      ? 'white'
                      : 'black'
                  })}
                />
              ))}
            </Box>

            {/* 표지 이미지 */}
            {post.coverImage && (
              <Box
                component="img"
                src={post.coverImage}
                alt={post.title}
                sx={{
                  width: '100%',
                  borderRadius: '16px',
                  height: 'auto',
                  mb: 4,
                }}
              />
            )}

            {/* 목차 - 포스트에 h2 태그가 있는 경우에만 표시 */}
            {post.contentHtml && (post.contentHtml.includes('<h2') || post.contentHtml.includes('## ')) && (
              <Card variant="outlined" sx={{ mb: 4, borderRadius: '16px' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>목차</Typography>
                  <TableOfContents content={post.contentHtml} />
                </CardContent>
              </Card>
            )}

            <Divider sx={{ mb: 4 }} />

            {/* 컨텐츠 */}
            <Box
              className="markdown-content"
              sx={{
                '& a': {
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                },
                '& h2': {
                  mt: 4,
                  mb: 2,
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                },
                // pre와 code 스타일링은 Prism.js에서 처리하므로 여기서는 최소화
                '& blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  pl: 2,
                  ml: 0,
                  fontStyle: 'italic',
                },
              }}
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <Divider sx={{ my: 4 }} />

            {/* 공유 버튼 */}
            <ShareButtons title={post.title} slug={post.id} />

            {/* 저자 정보 */}
            <AuthorBio author={post.author} />

            {/* 관련 게시물 */}
            {relatedPosts.length > 0 && (
              <RelatedPosts posts={relatedPosts} />
            )}

            {/* 댓글 섹션 */}
            <GiscusComments slug={post.id} />
          </Box>
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.slug);

  // 관련 게시물 가져오기 (태그 기반)
  const allPosts = getAllPosts();

  // 같은 태그를 가진 다른 게시물 찾기
  const relatedPosts = allPosts
    .filter(p =>
      p.id !== params.slug && // 현재 게시물 제외
      p.tags?.some(tag => post.tags?.includes(tag)) // 태그 일치 확인
    )
    .slice(0, 3); // 최대 3개만 표시

  return {
    props: {
      post,
      relatedPosts,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}