import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box,
  Drawer, List, useMediaQuery,
  ListItemIcon, Slide,
  ListItemButton, ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Tag } from '@mui/icons-material';
import { useScroll } from '../lib/useScroll';

// 헤더용 커스텀 훅 - useScroll을 기반으로 헤더 특화 로직 추가
function useHeaderVisibility() {
  // 스크롤 방향 추적을 활성화한 useScroll 훅 사용
  const { direction, isScrolled } = useScroll({
    threshold: 100,
    trackDirection: true
  });

  // 헤더 가시성을 결정하는 로직
  // - 상단(100px 미만)에서는 항상 보임
  // - 위로 스크롤 중일 때 보임
  // - 아래로 스크롤 중일 때 숨김
  const visible = !isScrolled || direction === 'up';

  return visible;
}

export default function Header({ toggleColorMode, mode }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 커스텀 훅을 통해 헤더 가시성 상태 가져오기
  const visible = useHeaderVisibility();

  const menuItems = [
    { text: 'Blog', href: '/blog', icon: <ArticleIcon /> },
    { text: 'Tags', href: '/tags', icon: <Tag /> },
    { text: 'About', href: '/about', icon: <InfoIcon /> },
  ];

  return (
    <Slide appear={false} direction="down" in={visible}>
      <AppBar position="fixed" elevation={0} color="inherit" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Blog of LimpidusCoruscans
            </Link>
          </Typography>

          {isMobile ? (
            <>
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={() => setDrawerOpen(false)}
                >
                  <List>
                    {menuItems.map((item) => (
                      <ListItemButton
                        button
                        key={item.text}
                        onClick={() => router.push(item.href)}
                        selected={router.pathname.includes(item.href)}
                      >
                        <ListItemIcon style={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color={router.pathname.includes(item.href) ? 'primary' : 'inherit'}
                  variant="outlined"
                  component={Link}
                  href={item.href}
                  sx={{
                    fontWeight: router.pathname.includes(item.href) ? 'bold' : 'normal',
                    textDecoration: 'none',
                  }}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Slide>
  );
}