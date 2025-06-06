import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import { useTheme as useAppTheme } from '@contexts/ThemeContext';

const ThemeModeSwitcher = () => {
  const { mode, toggleMode } = useAppTheme();

  return (
    <button onClick={toggleMode} style={{ padding: '8px', cursor: 'pointer' }}>
      {mode === 'dark' ? (
        <Brightness7Icon style={{ color: 'white' }} />
      ) : (
        <Brightness4Icon style={{ color: 'black' }} />
      )}
      <span style={{ marginLeft: '8px' }}>{mode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default ThemeModeSwitcher;
