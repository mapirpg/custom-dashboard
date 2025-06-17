import { useMemo } from 'react';
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
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector, useAuth, useRouter } from '@hooks';
import { useTranslation } from 'react-i18next';
import ThemeModeSwitcher from '../ThemeModeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher';
import Icon from '@components/Icon';
import { drawer as drawerSlice } from '@store';
import { Outlet } from 'react-router-dom';

const DRAWER_WIDTH = 240;

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
  const theme = useTheme();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { routes, navigateTo } = useRouter();
  const dispatch = useAppDispatch();
  const drawerOpen = useAppSelector(state => state.drawer.open);

  const handleDrawerToggle = () => {
    dispatch(drawerSlice.toggleDrawer());
  };

  const handleNavItemClick = (path: string) => {
    navigateTo(path);

    if (isSmallScreen) {
      dispatch(drawerSlice.toggleDrawer());
    }
  };

  const nvItems = useMemo(() => {
    const items = routes.find(i => i?.id === 'main-layout');

    if (items?.children) {
      return items.children?.filter(item => !item?.hide);
    }

    return [];
  }, [routes]);

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
        {nvItems?.map(item => {
          return (
            <ListItem key={item?.id} disablePadding>
              <ListItemButton onClick={() => handleNavItemClick(item?.path)}>
                <ListItemIcon>
                  <Icon name={item.icon} />
                </ListItemIcon>
                <ListItemText primary={item?.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />

      <List sx={{ mt: 'auto' }}>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('common.logout')} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <StyledAppBar position="fixed" open={drawerOpen}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '100vw' }}>
          {!drawerOpen ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box />
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 1,
            }}
          >
            <LanguageSwitcher />
            <ThemeModeSwitcher />
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        variant={isSmallScreen ? 'temporary' : 'persistent'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerOpen ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main">
        <Toolbar />
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: isSmallScreen ? '90vh' : '80vh',
            width: isSmallScreen ? '95vw' : drawerOpen ? '75vw' : `calc(75vw + ${DRAWER_WIDTH}px)`,
            flexGrow: 1,
            boxShadow: theme.shadows[9],
            borderRadius: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
