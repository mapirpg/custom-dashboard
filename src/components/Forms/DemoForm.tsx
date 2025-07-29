import FormInput, { InputSelectOption } from '@components/FormInput';
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
  select: string;
}

function DemoForm({
  formMethods,
  selectOptions,
  loadingOptions,
}: {
  formMethods: UseFormReturn<FormValues>;
  selectOptions?: Array<InputSelectOption>;
  loadingOptions?: boolean;
}) {
  const { t } = useTranslation();
  const { control } = formMethods;

  return (
    <Grid container size={{ xs: 12, md: 6 }} columnSpacing={2} sx={{ padding: 2 }}>
      <FormInput control={control} name="email" inputType="email" />

      <FormInput control={control} name="text" />

      <FormInput control={control} name="password" inputType="password" />
      <FormInput control={control} name="confirmPassword" inputType="password" />

      <FormInput
        control={control}
        name="select"
        inputType="autoComplete"
        options={selectOptions}
        inputProps={{
          disabled: loadingOptions,
        }}
      />

      <Grid size={12}>
        <Button variant="contained" type="submit">
          {t('submit')}
        </Button>
      </Grid>
    </Grid>
  );
}

export default DemoForm;
