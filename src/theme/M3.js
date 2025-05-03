import { createTheme } from '@mui/material/styles';

// Material You 스타일 테마 생성
export const createMaterialYouTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#006D35',
        ...(mode === 'dark' ? {
          main: '#00E476',
        } : {})
      },
      background: {
        default: mode === 'light' ? '#EDEEE9' : '#1D201D', // Surface 색상
        paper: mode === 'light' ? '#F9FAF4' : '#111411',   // SurfaceBright 색상
        dim: mode === 'light' ? '#EDEEE9' : '#1D201D',     // SurfaceDim 색상
      },
      // Material You 스타일의 추가 색상들
      secondary: {
        main: mode === 'light' ? '#506352' : '#B7CCB7',
      },
      tertiary: {
        main: mode === 'light' ? '#3A656E' : '#A2CED8',
      },
    },
    // Material You 스타일의 컴포넌트 오버라이드
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            textTransform: 'none',
            padding: '6px 16px',
          },
        },
        variants: [
          {
            props: { variant: 'elevated' },
            style: {
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              backgroundColor: mode === 'light' ? '#F9FAF4' : '#252525',
              color: mode === 'light' ? '#006D35' : '#4CAF82',
              '&:hover': {
                backgroundColor: mode === 'light' ? '#EAECE6' : '#333333',
              },
            },
          },
          {
            props: { variant: 'filled' },
            style: {
              backgroundColor: '#006D35',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#00592C',
              },
            },
          },
          {
            props: { variant: 'tonal' },
            style: {
              backgroundColor: mode === 'light' ? '#E0EAE5' : '#1F3429',
              color: mode === 'light' ? '#006D35' : '#7ECA97',
              '&:hover': {
                backgroundColor: mode === 'light' ? '#CEDBD4' : '#2A4638',
              },
            },
          },
        ],
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            border: mode === 'light' ? '1px solid #E0E0E0' : '1px solid #333333',
            backgroundColor: mode === 'light' ? '#F9FAF4' : '#252525',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#EDEEE9' : '#1D201D',
            color: mode === 'light' ? '#191C19' : '#E2E3DE',
          },
        },
      },
    },
    typography: {
      fontFamily: '"Pretendard", "Roboto", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 16,
    },
  });
};