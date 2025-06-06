import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme as useAppTheme } from '@contexts/ThemeContext';
import { IconButton } from '@mui/material';

const ThemeModeSwitcher = () => {
  const { mode, toggleMode } = useAppTheme();

  return (
    <IconButton color="inherit" onClick={toggleMode}>
      {mode === 'dark' ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeModeSwitcher;
