import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RouteProps } from '@/router/navigationConfig';

interface RouterState {
  routes: RouteProps[];
  current: {
    path: string;
    params: Record<string, string>;
  };
  previous: {
    path: string;
    params: Record<string, string>;
  } | null;
}

const initialState: RouterState = {
  routes: [],
  current: {
    path: '/',
    params: {},
  },
  previous: null,
};

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setRoutes: (state, action: PayloadAction<RouteProps[]>) => {
      state.routes = action.payload;
    },
    setCurrentRoute: (
      state,
      action: PayloadAction<{ path: string; params: Record<string, string> }>,
    ) => {
      state.previous = { ...state.current };
      state.current = action.payload;
    },
    resetRouter: () => initialState,
  },
});

export const { setRoutes, setCurrentRoute, resetRouter } = routerSlice.actions;
export default routerSlice.reducer;
