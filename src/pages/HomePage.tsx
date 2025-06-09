import { Typography, Box, Paper, Button, Stack } from '@mui/material';
import { useAlert } from '@hooks/useRedux';

const HomePage = () => {
  const { openAlert } = useAlert();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Demonstração de Alertas
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              openAlert({
                message: 'Operação realizada com sucesso!',
                severity: 'success',
                autoHideDuration: 3000,
                position: { vertical: 'top', horizontal: 'right' },
              })
            }
          >
            Alerta de Sucesso
          </Button>
        </Stack>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Box>
            <Button variant="outlined" color="primary" href="/dashboard" sx={{ mr: 1 }}>
              View Dashboard
            </Button>
            <Button variant="contained" color="primary" href="/settings">
              Profile Settings
            </Button>
          </Box>
        </Box>
      </Paper>
      <Box sx={{ mb: 4, textAlign: 'center', p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Ready to explore more?
        </Typography>
        <Typography variant="body1" paragraph>
          Check out the documentation or start building your application.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          View Documentation
        </Button>
        <Button variant="outlined" color="secondary">
          Explore Features
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
