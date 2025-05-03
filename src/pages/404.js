import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { MaterialFilledButton } from '@/components/MaterialButton';
import { MaterialCard } from '@/components/MaterialCard';
import Image from 'next/image';

export default function Custom404() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center',
        py: 6,
      }}
    >
      <MaterialCard elevation={2} sx={{ maxWidth: 600, width: '100%', py: 3, px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '5rem', md: '8rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 2
            }}
          >
            404
          </Typography>

          <Box sx={{ position: 'relative', height: 180, width: 180, my: 2 }}>
            <Image
              src="/window.svg"
              alt="Page Not Found"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>

          <Typography variant="h5" component="h2" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
            Page Not Found
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 450 }}>
            Couldn&lsquo;t find the page you were looking for. <br />Please check the URL or return to the homepage.
          </Typography>

          <MaterialFilledButton
            onClick={() => router.push('/')}
            size="large"
          >
            Go to Home
          </MaterialFilledButton>
        </Box>
      </MaterialCard>
    </Box>
  );
}