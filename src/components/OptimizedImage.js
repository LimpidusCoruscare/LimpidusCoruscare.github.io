import Image from 'next/image';
import { Box, Skeleton } from '@mui/material';
import { useState } from 'react';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  fill = false,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);

  if (!src) return null;

  return (
    <Box
      sx={{
        position: fill ? 'relative' : 'static',
        width: fill ? '100%' : 'auto',
        height: fill ? props.height || '100%' : 'auto',
        overflow: 'hidden',
        borderRadius: props.borderRadius || '16px',
      }}
    >
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            borderRadius: 'inherit',
          }}
        />
      )}

      <Image
        src={src}
        alt={alt || 'Image'}
        width={fill ? undefined : width || 1200}
        height={fill ? undefined : height || 630}
        priority={priority}
        fill={fill}
        sizes={
          fill
            ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            : undefined
        }
        onLoadingComplete={() => setIsLoading(false)}
        style={{
          objectFit: props.objectFit || 'cover',
          borderRadius: 'inherit',
        }}
        {...props}
      />
    </Box>
  );
}