import { Box, CircularProgress } from '@mui/material';

export const LoadingScreen = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};
