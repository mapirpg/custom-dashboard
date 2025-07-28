import FormInput from '@components/FormInput';
import { Button, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface FormValues {
  text: string;
  email: string;
  password: string;
  error: string;
  number: number;
  date: Date;
  autoComplete: string;
  confirmPassword: string;
}

function DemoForm({ formMethods }: { formMethods: UseFormReturn<FormValues> }) {
  const { t } = useTranslation();
  const { control } = formMethods;

  return (
    <Grid container size={{ xs: 12, md: 6 }} columnSpacing={2} sx={{ padding: 2 }}>
      <FormInput control={control} name="email" inputType="email" />

      <FormInput control={control} name="password" inputType="password" />
      <FormInput control={control} name="confirmPassword" inputType="password" />

      {/*
      <FormInput
        control={control}
        name="error"
        inputProps={{
          error: true,
          helperText: t('inputWithError'),
        }}
      />

      <FormInput control={control} name="number" inputType="number" />

      <FormInput control={control} name="autoComplete" inputType="autoComplete" /> */}

      <Grid size={12}>
        <Button variant="contained" type="submit">
          {t('submit')}
        </Button>
      </Grid>
    </Grid>
  );
}

export default DemoForm;
