import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { ArrowForward } from '@mui/icons-material';

export default function SearchBar({ keyword }) {
  const router = useRouter();
  const [query, setQuery] = useState(keyword || '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ mb: 4, width: '100%' }}>
      <TextField
        fullWidth
        placeholder="Input search keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <Stack direction="row" spacing={0.5}>
                <IconButton
                  aria-label="search"
                  onClick={handleSearch}
                  edge="end"
                  size="small"
                >
                  <ArrowForward color="action" />
                </IconButton>
                <IconButton
                  aria-label="clear search"
                  onClick={() => setQuery('')}
                  edge="end"
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            </InputAdornment>
          ),
          sx: {
            borderRadius: '100px',
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': {
              boxShadow: 2,
            },
          }
        }}
      />
    </Box>
  );
}