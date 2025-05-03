import { useMemo, useEffect, useState } from 'react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { createMaterialYouTheme } from '@/theme/M3';
import { useTheme } from 'next-themes';
import Header from './Header';
import Footer from './Footer';
import ScrollTopButton from './ScrollTopButton';

export default function Layout({ children }) {
  // next-themes에서 테마 상태 가져오기
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트되면 상태 업데이트
  useEffect(() => {
    setMounted(true);
  }, []);

  // MUI 테마 모드 설정 (resolvedTheme은 클라이언트 측에서만 사용 가능)
  // SSR 중에는 'light'를 기본값으로 사용
  const mode = mounted && resolvedTheme ? resolvedTheme : 'light';

  // Material UI theme
  const muiTheme = useMemo(
    () => createMaterialYouTheme(mode),
    [mode]
  );

  // 테마 토글 함수
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  // 테마가 마운트되기 전에는 기본 스타일만 표시 (깜빡임 방지)
  if (!mounted) {
    return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <div style={{ visibility: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header toggleColorMode={toggleColorMode} mode={mode} />
            <Container
              component="main"
              sx={{
                mt: 8,
                mb: 4,
                py: 4,
                flex: '1 0 auto',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                width: { xs: '95%', sm: '90%' }
              }}
            >
              {children}
            </Container>
            <Footer />
          </Box>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header toggleColorMode={toggleColorMode} mode={mode} />
        <Container
          component="main"
          sx={{
            mt: 8,
            mb: 4,
            py: 4,
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            width: { xs: '95%', sm: '90%' }
          }}
        >
          {children}
        </Container>
        <Footer />
        <ScrollTopButton />
      </Box>
    </ThemeProvider>
  );
}