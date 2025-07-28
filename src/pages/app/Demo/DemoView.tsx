import React from 'react';
import PageContainer from '@components/PageContainer';
import Table from '@components/Table';
import { Divider, Typography } from '@mui/material';
import { ITableHeadCell, ITableRow } from '@components/Table/types';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TableDataProps } from '@data/models/demo';
import DemoForm, { FormValues } from '@components/Forms/DemoForm';
import { ITabCells } from '@hooks/useTableFeatures';

interface TableSectionProps extends ITabCells<TableDataProps> {
  rows: ITableRow<TableDataProps>[];
  headCells: ITableHeadCell<TableDataProps>[];
  isLoading: boolean;
  t: (key: string) => string;
}

interface FormSectionProps {
  formMethods: UseFormReturn<FormValues>;
  t: (key: string) => string;
}

interface DemoViewProps extends TableSectionProps, FormSectionProps {
  onFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const TableSection = React.memo(({ rows, headCells, isLoading, t }: TableSectionProps) => (
  <PageContainer
    header={<Typography variant="h4">{t('table')}</Typography>}
    content={<Table head={{ headCells }} rows={rows} isLoading={isLoading} />}
  />
));

const FormSection = React.memo(({ formMethods, t }: FormSectionProps) => (
  <PageContainer
    header={<Typography variant="h4">{t('inputs')}</Typography>}
    content={<DemoForm formMethods={formMethods} />}
  />
));

function DemoView({
  rows,
  isLoading,
  headCells,
  formMethods,
  onFormSubmit,
}: Omit<DemoViewProps, 't'>) {
  const { t } = useTranslation();

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <FormSection formMethods={formMethods} t={t} />
      </form>
      <Divider
        sx={{
          mt: 2,
          mb: 2,
        }}
      />
      <TableSection headCells={headCells} isLoading={isLoading} rows={rows} t={t} />
      <Divider
        sx={{
          mt: 2,
          mb: 2,
        }}
      />
    </>
  );
}

TableSection.displayName = 'TableSection';
FormSection.displayName = 'FormSection';
export default DemoView;
