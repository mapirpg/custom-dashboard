import { Box, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Box
      sx={{
        border: '1px solid black',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
    </Box>
  );
};

export default HomePage;
