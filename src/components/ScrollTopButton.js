import { Zoom, Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useScroll } from '../lib/useScroll';

// 맨 위로 스크롤하는 버튼 컴포넌트
export default function ScrollTopButton() {
  const theme = useTheme();

  // useScroll 훅을 사용하여 스크롤 상태 관리
  // ScrollTopButton은 방향 감지가 필요 없고, 단순히 위치만 필요함
  const { isScrolled } = useScroll({ threshold: 300 });

  // 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 효과
    });
  };

  return (
    <Zoom in={isScrolled}>
      <Fab
        color="primary"
        size="medium"
        aria-label="맨 위로 스크롤"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: theme.zIndex.appBar - 1,
          boxShadow: theme.shadows[4],
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          }
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
}