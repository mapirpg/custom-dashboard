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
import {
  MAIN_LAYOUT_DRAWER_WIDTH,
  MAIN_LAYOUT_HEADER_HEIGHT,
  MAIN_LAYOUT_HEIGHT,
} from '@data/constants';

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
    marginLeft: MAIN_LAYOUT_DRAWER_WIDTH,
    width: `calc(100% - ${MAIN_LAYOUT_DRAWER_WIDTH}px)`,
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
          {t('common.brandName')}
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
      <StyledAppBar
        position="fixed"
        sx={{
          height: `${MAIN_LAYOUT_HEADER_HEIGHT}svh`,
        }}
        open={drawerOpen}
      >
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
          width: drawerOpen ? MAIN_LAYOUT_DRAWER_WIDTH : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: MAIN_LAYOUT_DRAWER_WIDTH,
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
            p: 0,
            m: 0,
            height: `${MAIN_LAYOUT_HEIGHT}svh`,
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
