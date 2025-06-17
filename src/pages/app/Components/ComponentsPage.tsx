import { Box, Typography } from '@mui/material';

const ComponentsPage = () => {
  return (
    <Box
      sx={{
        border: '1px solid black',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Components
      </Typography>
    </Box>
  );
};

export default ComponentsPage;
