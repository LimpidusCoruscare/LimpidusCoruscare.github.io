import { useTheme } from '@mui/material/styles';
import { Box, Typography, Paper } from '@mui/material';
import Giscus from '@giscus/react';

export default function GiscusComments({ slug }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        mt: 6,
        p: 3,
        borderRadius: 2
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 3, fontWeight: 600 }}
      >
        댓글
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Giscus
          repo={process.env.NEXT_PUBLIC_GISCUS_REPO}
          repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID}
          category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY}
          categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID}
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
          lang="en"
          loading="lazy"
        />
      </Box>
    </Paper>
  );
}