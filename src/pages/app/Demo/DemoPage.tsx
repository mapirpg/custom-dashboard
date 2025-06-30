import { useMemo } from 'react';
import PageContainer from '@components/PageContainer';
import Table from '@components/Table';
import Demo, { TableDataProps } from '@data/models/demo';
import { useTableFeatures } from '@hooks/useTableFeatures';
import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

const ComponentsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['demo-table-data'],
    queryFn: () => Demo.getTableData(),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    select: data => data.map(({ address, schedule, weekDays, ...item }) => item),
  });

  const { getHeaderCells, getRowsCells } = useTableFeatures<TableDataProps>();

  const tableData = useMemo(() => {
    const headCells = getHeaderCells(data);

    return {
      head: { headCells },
      rows: getRowsCells(data, headCells).update([
        {
          field: 'address.street',
          transform: v => `${v} kcal`,
        },
        {
          field: 'avatar',
          transform: v => <img src={v} style={{ height: 50, borderRadius: '50%' }} alt="Avatar" />,
        },
        {
          field: 'address',
          transform: addr =>
            typeof addr === 'object'
              ? `${addr?.street || ''}, ${addr?.city || ''}, ${addr?.state || ''} ${addr?.zip || ''}`
              : String(addr || '-'),
        },
      ]).rows,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <PageContainer
      header={
        <Typography variant="h4" sx={{ mb: 2 }}>
          Demo
        </Typography>
      }
      content={<Table {...tableData} isLoading={isLoading} />}
    />
  );
};

export default ComponentsPage;
