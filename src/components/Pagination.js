import { Pagination as MuiPagination, Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function Pagination({
  totalItems,
  itemsPerPage = 9,
  currentPage = 1,
  path = '/blog'
}) {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event, page) => {
    let url = path;

    if (page > 1) {
      url += `/page/${page}`;
    }

    router.push(url);
  };

  if (totalPages <= 1) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 6,
        mb: 2
      }}
    >
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: '16px',
          }
        }}
      />
    </Box>
  );
}