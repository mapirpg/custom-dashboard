import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Link, Box, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth, useAppDispatch } from '@hooks/useRedux';
import { login, clearError } from '@store/authSlice';
import { useTranslation } from 'react-i18next';
import FormInput from '@/components/FormInput';

const LoginPage = () => {
  const { error, isLoading } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = z.object({
    email: z.string().email(t('errors.invalidEmail')),
    password: z.string(),
  });

  type LoginFormValues = z.infer<typeof schema>;

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const resultAction = await dispatch(login({ email: data.email, password: data.password }));

      if (login.fulfilled.match(resultAction)) {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {error && (
        <Alert severity="error" onClose={() => dispatch(clearError())} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography component="h2" variant="h6" align="center" gutterBottom>
        {t('auth.signIn')}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <FormInput control={control} name="email" />
        <FormInput control={control} name="password" inputType="password" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? t('auth.login') + '...' : t('auth.signIn')}
        </Button>{' '}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Box>
            <Link component={RouterLink} to="/auth/forgot-password" variant="body2">
              {t('auth.forgotPassword')}
            </Link>
          </Box>
          <Box>
            <Link component={RouterLink} to="/auth/register" variant="body2">
              {t('auth.noAccount')} {t('auth.signUp')}
            </Link>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Demo Accounts:
          </Typography>
          <Typography
            variant="caption"
            display="block"
            color="text.secondary"
            align="center"
            sx={{ mt: 1 }}
          >
            User: user@example.com / password
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary" align="center">
            Admin: admin@example.com / admin
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
