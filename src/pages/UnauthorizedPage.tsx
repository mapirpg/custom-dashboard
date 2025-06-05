import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 500,
        }}
      >
        <Typography variant="h1" color="error" fontWeight="bold">
          403
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          You don't have permission to access this page. Please contact your administrator if you
          believe this is a mistake.
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button variant="contained" onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UnauthorizedPage;
