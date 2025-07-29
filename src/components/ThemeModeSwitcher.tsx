import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme, useAppDispatch } from '@hooks/useRedux';
import { toggleMode } from '@store/themeSlice';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ThemeModeSwitcher = () => {
  const { mode } = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleToggleMode = () => {
    dispatch(toggleMode());
  };

  return (
    <Tooltip title={t(mode === 'dark' ? 'activeLightMode' : 'activeDarkMode')}>
      <IconButton color="inherit" onClick={handleToggleMode}>
        {mode === 'dark' ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeModeSwitcher;
