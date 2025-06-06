import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
  open?: boolean;
  title?: string;
  content?: React.ReactNode;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const initialState: DialogState = {
  open: false,
  title: '',
  content: null,
  onClose: undefined,
  onCancel: undefined,
  onConfirm: undefined,
};

const dialogSlice = createSlice({
  initialState,
  name: 'dialog',
  reducers: {
    openDialog: (state, action: PayloadAction<Partial<DialogState>>) => {
      state.open = true;
      state.title = action.payload.title || '';
      state.content = action.payload.content || null;
      state.onClose = action.payload.onClose;
      state.onCancel = action.payload.onCancel;
      state.onConfirm = action.payload.onConfirm;
    },
    closeDialog: state => {
      state.open = false;
      state.title = '';
      state.content = null;
      state.onClose = undefined;
      state.onCancel = undefined;
      state.onConfirm = undefined;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
