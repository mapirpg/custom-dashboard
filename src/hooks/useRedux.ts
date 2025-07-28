/* eslint-disable no-console */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  auth,
  theme,
  alert,
  router,
  dialog,
  language,
  RootState,
  AlertState,
  AppDispatch,
  DialogPayloadProps,
} from '@store';
import { normalizeLanguageCode } from '@utils/normalizeLanguageCode';
import { useCallback } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { RouteProps } from '@router/navigationConfig';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { navigateTo } = useRouter();

  const login = async (credentials: { email: string; password: string }) => {
    const res = await dispatch(auth.login(credentials));

    if (!auth.login.fulfilled.match(res)) {
      throw new Error(res?.payload as string);
    }
  };

  const logout = () => {
    dispatch(auth.logout());
    navigateTo('/');
  };

  const register = (userData: { name: string; email: string; password: string }) => {
    dispatch(auth.signup(userData));
  };

  const hasRole = (role: string | string[]) => {
    if (!user || !user.role) return false;

    if (Array.isArray(role)) {
      return role.some(r => user.role.includes(r));
    }

    return user.role.includes(role);
  };

  const revalidate = async () => {
    const res = await dispatch(auth.checkAuth());

    if (!auth.checkAuth.fulfilled.match(res)) {
      throw new Error(res?.payload as string);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    hasRole,
    revalidate,
  };
};

export const useLanguage = () => {
  const { currentLanguage, languages } = useAppSelector(state => state.language);
  const dispatch = useAppDispatch();

  const changeLanguage = (languageCode: string) => {
    const normalizedCode = normalizeLanguageCode(languageCode);

    dispatch(language.changeLanguage(normalizedCode));
  };

  const initialize = () => {
    dispatch(language.initializeLanguage());
  };

  const validCurrentLanguage = languages.some(lang => lang.code === currentLanguage)
    ? currentLanguage
    : languages.find(lang => lang.default)?.code || languages[0]?.code || 'pt_BR';

  return {
    currentLanguage: normalizeLanguageCode(validCurrentLanguage),
    languages,
    initialize,
    changeLanguage,
  };
};

export const useTheme = () => {
  const { mode } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const toggleMode = () => {
    dispatch(theme.toggleMode());
  };

  const initialize = () => {
    dispatch(theme.initializeTheme());
  };

  return {
    mode,
    toggleMode,
    initialize,
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

export const useRouter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const state = useAppSelector(state => state.router);

  const navigateTo = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (path: string, options?: { replace?: boolean; state?: any }) => {
      const fullPath = path.startsWith('/') ? path : `/${path}`;

      dispatch(
        router.setCurrentRoute({
          path: fullPath,
          params: params as Record<string, string>,
        }),
      );

      navigate(fullPath, { replace: true, ...(options || {}) });
    },
    [dispatch, navigate, params],
  );

  const setRoutes = (routes: RouteProps[]) => {
    dispatch(router.setRoutes(routes));
  };

  return {
    location,
    params,
    navigateTo,
    setRoutes,
    routes: state.routes,
    routeState: location.state,
    currentPath: location.pathname,
    previousPath: state.previous?.path,
  };
};
