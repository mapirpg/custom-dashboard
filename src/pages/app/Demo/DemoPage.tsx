import PageContainer from '@components/PageContainer';
import Table from '@components/Table';
import Demo from '@data/models/demo';
import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

const ComponentsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['demo-table-data'],
    queryFn: () => Demo.getTableData(),
  });

  return (
    <PageContainer
      header={
        <Typography variant="h4" sx={{ mb: 2 }}>
          Demo
        </Typography>
      }
      content={
        <Table
          data={data}
          isLoading={isLoading}
          initialValues={{
            perPage: 25,
          }}
        />
      }
    ></PageContainer>
  );
};

export default ComponentsPage;
