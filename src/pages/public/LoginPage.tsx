import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Link, Box, Typography } from '@mui/material';
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
  const { isLoading, login } = useAuth();
  const navigate = useNavigate();
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
    mutationFn: async (data: LoginFormValuesProps) => {
      const res = await login({ email: data.email, password: data.password });

      if (res?.meta?.requestStatus !== 'fulfilled') {
        throw new Error((res?.payload as string) || t('error.loginFailed'));
      }

      return res;
    },
    onSuccess: () => navigate('/dashboard'),
    onError: (error: ApiError) =>
      showAlert({
        message: error?.message || t('error.loginFailed'),
        severity: 'error',
      }),
  });

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Logo />

      <Typography component="h2" variant="h6" align="center" sx={{ my: 2 }}>
        {t('common.signIn')}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(v => onSubmit(v))} sx={{ mt: 1 }}>
        <FormInput control={control} name="email" />
        <FormInput control={control} name="password" inputType="password" />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading || isSubmitting}
        >
          {isLoading || isSubmitting ? t('common.login') + '...' : t('common.signIn')}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Link component={RouterLink} to="/auth/forgot-password" variant="body2">
            {t('common.forgotPassword')}
          </Link>
        </Box>
        <Box>
          <Link component={RouterLink} to="/auth/register" variant="body2">
            {t('common.noAccount')} {t('common.signUp')}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
