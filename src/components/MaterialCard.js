import { Card, CardContent, styled } from '@mui/material';

// 기존 MUI Card에 Material You 스타일 적용
export const MaterialCard = styled(Card)(({ theme, elevation = 1 }) => ({
  borderRadius: '20px',
  border: theme.palette.mode === 'light'
    ? '1px solid rgba(0, 0, 0, 0.05)'
    : '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: theme.shadows[elevation],
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  overflow: 'hidden',

  // Material You 느낌의 hover 효과
  '&:hover': {
    boxShadow: theme.shadows[elevation + 1],
    transform: 'translateY(-4px)',
  },
}));

// 콘텐츠 섹션에 여백 추가
export const MaterialCardContent = styled(CardContent)({
  padding: '24px',
});