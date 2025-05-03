import { Button, styled } from '@mui/material';

// Material You 스타일 버튼 변형
export const MaterialFilledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  textTransform: 'none',
  padding: '8px 24px',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  fontWeight: 500,
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
}));

export const MaterialTonalButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  textTransform: 'none',
  padding: '8px 24px',
  backgroundColor: theme.palette.primaryContainer?.main || 'rgba(0, 109, 53, 0.1)',
  color: theme.palette.primaryContainer?.contrastText || theme.palette.primary.main,
  fontWeight: 500,
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    opacity: 0.8,
  },
}));

export const MaterialOutlinedButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  textTransform: 'none',
  padding: '8px 24px',
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  fontWeight: 500,

  '&:hover': {
    backgroundColor: 'rgba(0, 109, 53, 0.04)',
    borderColor: theme.palette.primary.dark,
  },
}));