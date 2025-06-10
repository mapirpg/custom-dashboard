/* eslint-disable no-console */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { auth, theme, alert, dialog, language, RootState, AlertState, AppDispatch } from '@store';
import { useNavigate } from 'react-router-dom';
import { DialogPayloadProps } from '@/store/dialogSlice';
import { normalizeLanguageCode } from '@/utils/normalizeLanguageCode';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = (credentials: { email: string; password: string }) => {
    dispatch(auth.login(credentials));
  };

  const logout = () => {
    dispatch(auth.logout());
    navigate('/auth/login');
  };

  const register = (userData: { name: string; email: string; password: string }) => {
    dispatch(auth.signup(userData));
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
  };
};

export const useLanguage = () => {
  const { currentLanguage, languages } = useAppSelector(state => state.language);
  const dispatch = useAppDispatch();

  const changeLanguage = (languageCode: string) => {
    const normalizedCode = normalizeLanguageCode(languageCode);
    dispatch(language.changeLanguage(normalizedCode));
  };

  return {
    // Garantir que o currentLanguage está no formato correto
    currentLanguage: normalizeLanguageCode(currentLanguage),
    languages,
    changeLanguage,
  };
};

export const useThemeMode = () => {
  const { mode } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const toggleMode = () => {
    dispatch(theme.toggleMode());
  };

  return {
    mode,
    toggleMode,
  };
};

export const useDialog = () => {
  const state = useAppSelector(state => state.dialog);
  const dispatch = useAppDispatch();
  const languageDispatch = useAppDispatch();

  const handleConfirm = () => {
    if (!state.actionType) return;

    switch (state.actionType) {
      case 'CHANGE_LANGUAGE':
        if (state?.actionPayload?.lang) {
          languageDispatch(language.changeLanguage(state?.actionPayload.lang));
        }

        break;
      default:
        console.warn(`Action type not implemented: ${state.actionType}`);
    }

    dispatch(dialog.closeDialog());
  };

  return {
    isOpen: state.open,
    title: state.title,
    content: state?.content,
    onConfirm: handleConfirm,
    actionType: state.actionType,
    actionPayload: state.actionPayload,
    closeDialog: () => dispatch(dialog.closeDialog()),
    openDialog: (props: {
      title?: string;
      content?: string;
      actionType?: string;
      actionPayload?: DialogPayloadProps;
    }) => dispatch(dialog.openDialog(props)),
  };
};

export const useAlert = () => {
  const { open, message, severity } = useAppSelector(state => state.alert);

  const dispatch = useAppDispatch();

  const showAlert = (payload: Omit<AlertState, 'open'>) => dispatch(alert.showAlert(payload));

  const hideAlert = () => dispatch(alert.hideAlert());

  return {
    message,
    severity,
    showAlert,
    hideAlert,
    isOpen: open,
  };
};
