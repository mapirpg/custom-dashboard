import { Outlet } from 'react-router-dom';
import { Box, Container, Paper, Typography, useTheme } from '@mui/material';

import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@components/LanguageSwitcher';
import ThemeModeSwitcher from '@components/ThemeModeSwitcher';

const AuthLayout = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            position: 'absolute',
            gap: 2,
            top: 16,
            right: 16,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <ThemeModeSwitcher />

          <LanguageSwitcher />
        </Box>

        <Paper
          elevation={4}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            {t('auth.login')}
          </Typography>
          <Outlet />
        </Paper>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            &copy;
            {` ${new Date().getFullYear()} ${t('common.brandName')}. ${t('common.allRightsReserved')} `}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
