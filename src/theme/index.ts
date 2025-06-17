import Instance from '@data/models/instance';
import { createTheme, PaletteMode } from '@mui/material';
import { alpha } from '@mui/material/styles';

const defaultTheme = Instance.defaultInstance?.theme;

const generateLightThemeColors = (brandPalette = defaultTheme) => {
  return {
    primary: {
      light: brandPalette.primary[100],
      main: brandPalette.primary[300],
      dark: brandPalette.primary[400],
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#fff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
      disabled: '#888888',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  };
};

const generateDarkPalette = (brandPalette = defaultTheme) => {
  return {
    primary: {
      main: alpha(brandPalette.primary[100], 0.9),
      light: alpha(brandPalette.primary[100], 0.7),
      dark: brandPalette.primary[200],
      contrastText: '#000',
    },
    secondary: {
      main: '#ce93d8',
      light: '#e1bee7',
      dark: '#ab47bc',
      contrastText: '#000',
    },
    error: {
      main: '#f44336',
      light: '#ef5350',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
      disabled: '#777777',
    },
  };
};

export const createAppTheme = (mode: PaletteMode, customBrandColors = defaultTheme) => {
  const themeLightColors = generateLightThemeColors(customBrandColors);
  const darkThemeColors = generateDarkPalette(customBrandColors);

  return createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? themeLightColors : darkThemeColors),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.2,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.2,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.2,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            textTransform: 'none',
            padding: '8px 16px',
            '&:focus': {
              outline: 'none',
              boxShadow: 'none',
            },
            '&.Mui-focusVisible': {
              boxShadow: `0 0 0 0.2rem ${alpha(customBrandColors.primary[200], 0.25)}`,
            },
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            height: '50px',
            padding: '0px 14px',
            '&:focus': {
              outline: 'none',
              boxShadow: 'none',
            },
            '&.Mui-focusVisible': {
              boxShadow: `0 0 0 0.2rem ${alpha(customBrandColors.primary[200], 0.25)}`,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: 16,
            '& .MuiInputBase-root': {
              borderRadius: 8,
            },
            '& input:-webkit-autofill': {
              transition: 'background-color 5000s ease-in-out 0s',
              WebkitBoxShadow: 'none !important',
              WebkitTextFillColor: mode === 'light' ? '#333333' : '#ffffff',
              caretColor: mode === 'light' ? '#333333' : '#ffffff',
              backgroundColor: 'transparent !important',
              borderRadius: 8,
            },
            '& input:-webkit-autofill:hover': {
              WebkitBoxShadow: 'none !important',
              backgroundColor: 'transparent !important',
            },
            '& input:-webkit-autofill:focus': {
              WebkitBoxShadow: 'none !important',
              backgroundColor: 'transparent !important',
            },
            '& input:-webkit-autofill:active': {
              WebkitBoxShadow: 'none !important',
              backgroundColor: 'transparent !important',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#f3f5f8' : '#2c2c2c',
            color: mode === 'light' ? '#333333' : '#ffffff',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
            '&.Mui-focused': {
              color:
                mode === 'light'
                  ? customBrandColors.primary[200]
                  : alpha(customBrandColors.primary[100], 0.9),
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#f3f5f8' : '#2c2c2c',
            '&:hover': {
              backgroundColor: mode === 'light' ? '#e9ecf2' : '#3a3a3a',
            },
            '&.Mui-focused': {
              backgroundColor: mode === 'light' ? '#f8fafc' : '#3a3a3a',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor:
                mode === 'light'
                  ? customBrandColors.primary[200]
                  : alpha(customBrandColors.primary[100], 0.9),
              borderWidth: 2,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
            '&.Mui-error': {
              color:
                mode === 'light' ? themeLightColors?.error?.main : darkThemeColors?.error?.main,
            },
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1720,
      },
    },
  });
};

export default createAppTheme;
