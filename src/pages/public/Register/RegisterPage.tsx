import { Link as RouterLink } from 'react-router-dom';
import { Link, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: { xs: 2, lg: 4 },
        bgcolor: 'background.paper',
      }}
    >
      <Box>
        <Link component={RouterLink} to="/" variant="body2" replace>
          {t('haveAccount')} {t('signIn')}
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterPage;
