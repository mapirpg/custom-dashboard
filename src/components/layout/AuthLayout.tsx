import { AppBar, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@components/LanguageSwitcher';
import ThemeModeSwitcher from '@components/ThemeModeSwitcher';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <AppBar
        sx={{
          width: '100%',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          top: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <ThemeModeSwitcher />
        <LanguageSwitcher />
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <Outlet />
      </Box>

      <Box
        sx={{
          bottom: 0,
          left: 10,
          display: 'flex',
          width: '100%',
          paddingBottom: 2,
          position: 'fixed',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy;
          {` ${new Date().getFullYear()} ${t('brandName')}. ${t('allRightsReserved')} `}
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthLayout;
