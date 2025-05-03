import { Box, Avatar, Typography, Card, CardContent } from '@mui/material';

export default function AuthorBio({ author, vari = "outlined" }) {
  const authorInfo = {
    name: author,
    bio: "Chronicling my web development journey and growing as a developer through shared learning experiences.",
    avatar: "/images/authors/default.jpg",
  };

  return (
    <Card variant={vari} sx={{ mb: 4, borderRadius: '16px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={authorInfo.avatar}
            alt={authorInfo.name}
            sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}
          >
            {authorInfo.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6">{authorInfo.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {authorInfo.bio}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}