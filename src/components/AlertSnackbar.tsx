import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppSelector, useAlert } from '@hooks';

const AlertSnackbar: React.FC = () => {
  const { hideAlert } = useAlert();
  const { open, message, severity, autoHideDuration, position } = useAppSelector(
    state => state.alert,
  );

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    hideAlert();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration || 3000}
      onClose={handleClose}
      anchorOrigin={position || { vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
        variant="filled"
        elevation={6}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
