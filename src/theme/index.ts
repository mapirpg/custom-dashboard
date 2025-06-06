import { createTheme, PaletteMode } from '@mui/material';

const customColors = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
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

export const createAppTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: customColors.primary,
            secondary: customColors.secondary,
            error: customColors.error,
            warning: customColors.warning,
            info: customColors.info,
            success: customColors.success,
            text: customColors.text,
            background: customColors.background,
          }
        : {
            primary: {
              main: '#90caf9',
              light: '#bbdefb',
              dark: '#42a5f5',
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
          }),
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
              boxShadow: '0 0 0 0.2rem rgba(25, 118, 210, 0.25)',
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
              boxShadow: '0 0 0 0.2rem rgba(25, 118, 210, 0.25)',
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
            // Override browser autocomplete styles
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 30px #d9e0ea inset !important',
              WebkitTextFillColor: mode === 'light' ? '#333333' : '#000000',
            },
            '& input:-webkit-autofill:hover': {
              WebkitBoxShadow: '0 0 0 30px #d9e0ea inset !important',
            },
            '& input:-webkit-autofill:focus': {
              WebkitBoxShadow: '0 0 0 30px #d9e0ea inset !important',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#f3f5f8' : '#eee',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#f3f5f8' : '#eee',
            '&:hover': {
              backgroundColor: mode === 'light' ? '#e9ecf2' : '#eee',
            },
            '&.Mui-focused': {
              backgroundColor: mode === 'light' ? '#f8fafc' : '#eee',
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
    },
  });
};

export default createAppTheme;
