import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme, useAppDispatch } from '@hooks/useRedux';
import { toggleMode } from '@store/themeSlice';
import { IconButton } from '@mui/material';

const ThemeModeSwitcher = () => {
  const { mode } = useTheme();
  const dispatch = useAppDispatch();

  const handleToggleMode = () => {
    dispatch(toggleMode());
  };

  return (
    <IconButton color="inherit" onClick={handleToggleMode}>
      {mode === 'dark' ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeModeSwitcher;
