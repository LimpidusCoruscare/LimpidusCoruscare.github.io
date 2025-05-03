import { Box, Typography, Grid2, Card, CardContent, CardActionArea, Chip } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2, mb: 6 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
        관련 게시물
      </Typography>

      <Grid2 container spacing={4}>
        {posts.map((post) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
            <Card
              variant="outlined"
              sx={{
                // height: '100%',
                height: 320,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[2],
                },
              }}
            >
              <CardActionArea
                component={Link}
                href={`/blog/${post.id}`}
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  height: '100%',
                }}
              >
                {post.coverImage && (
                  <Box sx={{ position: 'relative', height: 140, width: '100%' }}>
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {new Date(post.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </Typography>

                  {post.excerpt && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {post.excerpt}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
                    {post.tags?.slice(0, 3).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          fontSize: '0.7rem',
                          height: 24,
                        }}
                      />
                    ))}
                    {post.tags?.length > 3 && (
                      <Chip
                        label={`+${post.tags.length - 3}`}
                        size="small"
                        sx={{
                          bgcolor: 'background.dim',
                          color: 'text.secondary',
                          fontSize: '0.7rem',
                          height: 24,
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}