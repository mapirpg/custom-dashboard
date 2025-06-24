import PageContainer from '@components/PageContainer';
import Table from '@components/Table';
import { Typography } from '@mui/material';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
];

const getRows = () => {
  return Array.from({ length: 500 }, (_, index) => ({
    id: `dessert-${index + 1}`,
    name: `Dessert ${index + 1}`,
    calories: Math.floor(Math.random() * 500),
    fat: Math.random() * 20,
    carbs: Math.random() * 50,
    protein: Math.random() * 10,
  }));
};

const ComponentsPage = () => {
  return (
    <PageContainer
      header={
        <Typography variant="h4" sx={{ mb: 2 }}>
          Components
        </Typography>
      }
      content={
        <Table
          rows={getRows()}
          head={{
            headCells,
          }}
        />
      }
    ></PageContainer>
  );
};

export default ComponentsPage;
