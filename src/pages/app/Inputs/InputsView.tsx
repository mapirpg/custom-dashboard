import React from 'react';
import PageContainer from '@components/PageContainer';
import { Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DemoForm, { FormValues } from '@components/Forms/DemoForm';
import { InputSelectOption } from '@components/FormInput';

interface FormSectionProps {
  loadingOptions?: boolean;
  selectOptions?: Array<InputSelectOption>;
  formMethods: UseFormReturn<FormValues>;
  t: (key: string) => string;
}

interface InputsViewProps extends FormSectionProps {
  onFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

function InputsView({ formMethods, onFormSubmit, selectOptions, loadingOptions }: InputsViewProps) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onFormSubmit}>
      <PageContainer
        header={<Typography variant="h4">{t('inputs')}</Typography>}
        content={
          <DemoForm
            formMethods={formMethods}
            selectOptions={selectOptions}
            loadingOptions={loadingOptions}
          />
        }
      />
    </form>
  );
}

export default InputsView;
