import React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@store';
import { AlertState, showAlert, hideAlert } from '@/store/alertSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    dispatch,
  };
};

export const useLanguage = () => {
  const { currentLanguage, languages } = useAppSelector(state => state.language);
  const dispatch = useAppDispatch();

  return {
    currentLanguage,
    languages,
    dispatch,
  };
};

export const useThemeMode = () => {
  const { mode } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  return {
    mode,
    dispatch,
  };
};

export const useDialog = () => {
  const { isOpen, content, title } = useAppSelector(state => state.dialog);
  const dispatch = useAppDispatch();

  const openDialog = (content: React.ReactNode, title: string) => {
    dispatch({ type: 'dialog/open', payload: { content, title } });
  };

  const closeDialog = () => {
    dispatch({ type: 'dialog/close' });
  };

  return {
    isOpen,
    content,
    title,
    openDialog,
    closeDialog,
  };
};

export const useAlert = () => {
  const { open, message, severity } = useAppSelector(state => state.alert);
  const dispatch = useAppDispatch();

  const openAlert = (payload: Omit<AlertState, 'open'>) => {
    dispatch(showAlert(payload));
  };

  const closeAlert = () => {
    dispatch(hideAlert());
  };

  return {
    isOpen: open,
    message,
    severity,
    openAlert,
    closeAlert,
  };
};
