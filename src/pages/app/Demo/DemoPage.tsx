import PageContainer from '@components/PageContainer';
import Table from '@components/Table';
import Demo from '@data/models/demo';
import { useTableFeatures } from '@hooks';
import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const ComponentsPage = () => {
  const { getHeaderCells } = useTableFeatures();

  const { data, isLoading } = useQuery({
    queryKey: ['demo-table-data'],
    queryFn: () => Demo.getTableData(),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headCells = useMemo(() => getHeaderCells(data), [data]);

  return (
    <PageContainer
      header={
        <Typography variant="h4" sx={{ mb: 2 }}>
          Demo
        </Typography>
      }
      content={
        <Table
          rows={data}
          head={{
            headCells,
            checkable: false,
          }}
          isLoading={isLoading}
          checkable
        />
      }
    ></PageContainer>
  );
};

export default ComponentsPage;
