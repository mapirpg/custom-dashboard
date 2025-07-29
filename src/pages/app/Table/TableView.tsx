import PageContainer from '@components/PageContainer';
import Table from '@components/Table';
import { ITableHeadCell, ITableRow } from '@components/Table/types';
import { TableDataProps } from '@data/models/demo';
import { ITabCells } from '@hooks/useTableFeatures';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TableSectionProps extends ITabCells<TableDataProps> {
  rows: ITableRow<TableDataProps>[];
  headCells: ITableHeadCell<TableDataProps>[];
  isLoading: boolean;
}

export default function TableView({ rows, isLoading, headCells }: TableSectionProps) {
  const { t } = useTranslation();

  return (
    <PageContainer
      header={<Typography variant="h4">{t('table')}</Typography>}
      content={<Table head={{ headCells }} rows={rows} isLoading={isLoading} />}
    />
  );
}
