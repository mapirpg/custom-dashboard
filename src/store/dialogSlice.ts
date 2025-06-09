import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LanguagePayload = {
  lang: string;
};

export type DialogPayloadProps = LanguagePayload | null;

interface DialogState {
  open: boolean;
  title: string;
  content?: string | null;
  actionType: string | null;
  actionPayload?: DialogPayloadProps;
}

const initialState: DialogState = {
  open: false,
  title: '',
  content: null,
  actionType: null,
  actionPayload: null,
};

const dialogSlice = createSlice({
  initialState,
  name: 'dialog',
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<{
        title?: string;
        content?: string;
        actionType?: string;
        actionPayload?: unknown;
      }>,
    ) => {
      state.open = true;
      state.title = action.payload.title || '';
      state.content = action.payload.content || null;
      state.actionType = action.payload.actionType || null;
      state.actionPayload = (action?.payload?.actionPayload as DialogPayloadProps) || null;
    },
    closeDialog: state => {
      state.open = false;
      state.title = '';
      state.content = null;
      state.actionType = null;
      state.actionPayload = null;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
