// components/ShareButtons.jsx
import { Box, IconButton, Typography } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import copy from 'copy-to-clipboard';

export default function ShareButtons({ title, slug }) {
  const baseUrl = 'https://limpcoru.github.io';
  const url = `${baseUrl}/blog/${slug}`;

  const copyToClipboard = () => {
    try {
      const success = copy(url);
      if (success) {
        alert('Link copied to clipboard!');
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard!');
        });
      } else {
        alert('Failed to copy the link.');
      }
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert('Failed to copy the link. Please try again. If the problem persists, please inform site owner.');
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Share this post
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton color="primary" onClick={copyToClipboard}>
          <LinkIcon />
        </IconButton>
      </Box>
    </Box>
  );
}