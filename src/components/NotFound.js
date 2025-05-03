import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { MaterialFilledButton } from "./MaterialButton";
import { useRouter } from "next/router";
import { MaterialCard } from "./MaterialCard";

export default function NotFound({ message }) {
  const router = useRouter();

  return (
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
            src={message === 'posts' ? '/file.svg' : '/tags.svg'}
            alt="Not Found"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>

        <Typography variant="h5" component="h2" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
          {message ? (message[0].toUpperCase() + message.slice(1)) : ''} Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 450 }}>
          No {message} found yet. <br /> Stay tuned for more updates.
        </Typography>

        <MaterialFilledButton
          onClick={() => router.push('/')}
          size="large"
        >
          Go to Home
        </MaterialFilledButton>
      </Box>
    </MaterialCard>
  );
}