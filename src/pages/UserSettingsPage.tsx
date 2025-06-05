/* eslint-disable no-console */
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Switch,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../contexts/LanguageContext';

// Form validation schema
const userSettingsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  notificationsEnabled: z.boolean(),
  language: z.string(),
  timezone: z.string(),
});

type UserSettingsFormValues = z.infer<typeof userSettingsSchema>;

const UserSettingsPage = () => {
  const { user } = useAuth();
  const { mode, toggleMode } = useTheme();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguageContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Default values for the form
  const defaultValues: UserSettingsFormValues = {
    name: user?.name || '',
    email: user?.email || '',
    notificationsEnabled: true,
    language: currentLanguage,
    timezone: 'UTC',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSettingsFormValues>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserSettingsFormValues) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setErrorMessage(null);

    try {
      // Handle language change
      if (data.language !== currentLanguage) {
        changeLanguage(data.language);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings updated:', data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error updating settings:', error);
      setErrorMessage(t('settings.error'));
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom>
          {t('settings.title')}
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {submitSuccess === true && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {t('settings.saved')}
          </Alert>
        )}

        {submitSuccess === false && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage || t('errors.generalError')}
          </Alert>
        )}

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('settings.name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('settings.email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t('settings.language')}
                    error={!!errors.language}
                    helperText={errors.language?.message}
                  >
                    {languages.map(lang => (
                      <MenuItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid>
              <Controller
                name="timezone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label={t('settings.timezone')}
                    error={!!errors.timezone}
                    helperText={errors.timezone?.message}
                  >
                    <MenuItem value="UTC">{t('timezones.UTC')}</MenuItem>
                    <MenuItem value="EST">{t('timezones.EST')}</MenuItem>
                    <MenuItem value="CST">{t('timezones.CST')}</MenuItem>
                    <MenuItem value="MST">{t('timezones.MST')}</MenuItem>
                    <MenuItem value="PST">{t('timezones.PST')}</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid>
              <Controller
                name="notificationsEnabled"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch checked={field.value} onChange={field.onChange} />}
                    label={t('settings.notifications')}
                  />
                )}
              />
            </Grid>

            <Grid>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={<Switch checked={mode === 'dark'} onChange={toggleMode} />}
                label={t('settings.darkMode')}
              />
            </Grid>

            <Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                sx={{ mt: 2 }}
              >
                {isSubmitting ? t('settings.saving') : t('common.save')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserSettingsPage;
