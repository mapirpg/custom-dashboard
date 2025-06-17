import { createSlice } from '@reduxjs/toolkit';

export interface DraweState {
  open: boolean;
}

const initialState: DraweState = {
  open: true,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer: state => {
      state.open = !state.open;
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
