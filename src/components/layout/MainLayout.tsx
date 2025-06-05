import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useAppTheme } from '../../contexts/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Constants
const DRAWER_WIDTH = 240;

// Styled components
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const { mode, toggleMode } = useAppTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavItemClick = (path: string) => {
    navigate(path);

    if (isSmallScreen) {
      setDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  // Navigation items
  const navItems = [
    { text: t('navigation.home'), icon: <HomeIcon />, path: '/' },
    { text: t('navigation.dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
    { text: t('navigation.settings'), icon: <SettingsIcon />, path: '/settings' },
  ];

  // Admin navigation items
  const adminNavItems = [
    ...(user?.role === 'admin'
      ? [{ text: t('navigation.admin'), icon: <DashboardIcon />, path: '/admin' }]
      : []),
  ];

  const drawer = (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          App Name
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavItemClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {adminNavItems.length > 0 && (
        <>
          <List>
            {adminNavItems.map(item => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleNavItemClick(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      )}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleMode}>
            <ListItemIcon>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText primary={t('settings.darkMode')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('auth.logout')} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <StyledAppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            React Application
          </Typography>
          <IconButton color="inherit" onClick={toggleMode}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'persistent'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : 0}px)` },
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Toolbar /> {/* this provides spacing from appbar */}
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
