import Link from 'next/link';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Box, Card, CardContent, CardActionArea, Typography, Chip, Stack } from '@mui/material';
import OptimizedImage from './OptimizedImage';

export default function PostCard({ post }) {
  const router = useRouter();

  // 태그 클릭 이벤트 핸들러
  const handleTagClick = (e, tag) => {
    e.preventDefault(); // 기본 동작 방지
    e.stopPropagation(); // 이벤트 버블링 방지(카드 클릭 이벤트가 발생하지 않도록)
    router.push(`/tags/${tag}`);
  };

  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        height: 420, // 고정 높이 설정
        width: '100%', // 너비는 100%로 유지
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => theme.shadows[4],
        }
      }}
    >
      <CardActionArea
        component={Link}
        href={`/blog/${post.id}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}
      >
        {post.coverImage && (
          <Box sx={{ height: 200, position: 'relative', width: '100%' }}>
            <OptimizedImage
              src={post.coverImage}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        )}

        <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', height: 220 }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 1,
              color: 'primary.main',
              fontWeight: 500
            }}
          >
            {format(new Date(post.date), 'yyyy-MM-dd')}
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {post.excerpt}
          </Typography>

          {post.tags && post.tags.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 'auto', gap: 0.5 }}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`${tag}`}
                  size="small"
                  clickable
                  onClick={(e) => handleTagClick(e, tag)}
                  sx={(theme) => ({
                    bgcolor: 'primary.main',
                    color: theme.palette.mode === 'light'
                      ? 'white'
                      : 'black',
                    fontSize: '0.7rem',
                    height: 24,
                    fontWeight: 500,
                    cursor: 'pointer',
                  })}
                />
              ))}
            </Stack>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}