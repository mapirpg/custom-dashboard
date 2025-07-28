import { Link as RouterLink } from 'react-router-dom';
import { Button, Link, Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth, useAlert } from '@hooks';
import { useTranslation } from 'react-i18next';
import FormInput from '@components/FormInput';
import { Logo } from '@components/Logo';
import { useLoginForm, LoginFormValuesProps } from '@hooks/forms/useLoginForm';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@types';

const LoginPage = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const { schema } = useLoginForm();
  const { showAlert } = useAlert();

  const { control, handleSubmit } = useForm<LoginFormValuesProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'admin',
    },
  });

  const { mutate: onSubmit, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: LoginFormValuesProps) =>
      login({ email: data.email, password: data.password }),
    onError: (error: ApiError) => {
      showAlert({
        message: error?.message || t('error.loginFailed'),
        severity: 'error',
      });
    },
  });

  return (
    <Grid
      sx={{
        width: '100vw',
        height: '100vh',
      }}
      container
    >
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: { xs: 2, lg: 4 },
          bgcolor: 'background.paper',
        }}
      >
        <Box>
          <Logo />
        </Box>

        <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
          {t('login')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(v => onSubmit(v))} sx={{ mt: 1 }}>
          <Grid container spacing={2} sx={{ mb: 2 }} columns={1}>
            <FormInput control={control} name="email" />
            <FormInput control={control} name="password" inputType="password" />

            <Button variant="contained" type="submit" fullWidth loading={isSubmitting}>
              {isSubmitting ? t('login') + '...' : t('signIn')}
            </Button>
          </Grid>

          <Box
            sx={{
              mt: 4,
              gap: 2,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              {t('forgotPassword')}
            </Link>
            <Link component={RouterLink} to="/register" variant="body2">
              {t('noAccount')} {t('signUp')}
            </Link>
          </Box>
        </Box>
      </Grid>

      <Grid
        size={{ xs: 0, lg: 6 }}
        sx={{
          backgroundImage: `url(https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148874050.jpg?semt=ais_hybrid&w=740)`,
          backgroundSize: 'cover',
          backgroundPosition: 'left',
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: theme =>
              theme?.palette?.mode === 'dark'
                ? `${theme.palette.background.default}aa`
                : `${theme.palette.primary.main}a1`,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
