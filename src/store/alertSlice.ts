import { SnackbarOrigin } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

export interface AlertState {
  open: boolean;
  message: string;
  severity: AlertSeverity;
  autoHideDuration?: number | null;
  position?: SnackbarOrigin | null;
}

const initialState: AlertState = {
  open: false,
  message: '',
  severity: 'info',
  autoHideDuration: 5000,
  position: { vertical: 'top', horizontal: 'center' },
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Omit<AlertState, 'open'>>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.autoHideDuration = action.payload.autoHideDuration;
      state.position = action.payload.position || { vertical: 'top', horizontal: 'center' };
    },
    hideAlert: state => {
      state.open = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
