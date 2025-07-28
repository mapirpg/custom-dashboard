/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Grid,
  GridProps,
  Autocomplete,
} from '@mui/material';
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn,
} from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

type FormInputType = 'text' | 'password' | 'email' | 'number' | 'autoComplete';

type DefaultProps = Record<
  FormInputType,
  | {
      type?: string;
      slotProps?: {
        input?: {
          endAdornment?: React.ReactNode;
        };
      };
    }
  | undefined
>;

interface FormInputProps<T extends FieldValues> extends GridProps {
  control: Control<T>;
  name: Path<T>;
  inputProps?: Omit<TextFieldProps, 'name'>;
  inputType?: FormInputType;
  isLoading?: boolean;
}

function FormInput<T extends FieldValues>({
  control,
  name,
  inputProps,
  isLoading,
  inputType,
  ...gridProps
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePasswordVisibility = () => setShowPassword(prev => !prev);
  const { t } = useTranslation();

  const defaultProps: DefaultProps = {
    text: undefined,
    password: {
      type: showPassword ? 'text' : 'password',
      slotProps: {
        input: {
          endAdornment: (
            <InputAdornment position="end" color="#000">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      },
    },
    email: {
      type: 'email',
    },
    number: {
      type: 'number',
    },
    autoComplete: {
      type: 'text',
      slotProps: {
        input: {
          endAdornment: (
            <InputAdornment position="end" color="#000">
              <IconButton aria-label="toggle auto-complete" onClick={() => {}} edge="end">
                {/* Placeholder for any icon if needed */}
              </IconButton>
            </InputAdornment>
          ),
        },
      },
    },
  };

  function BaseInput<T extends FieldValues>({
    field,
    fieldState,
  }: {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: ControllerFieldState;
    formState?: UseFormStateReturn<T>;
  }) {
    return (
      <TextField
        sx={{
          m: 0,
          p: 0,
          ...inputProps?.sx,
        }}
        {...defaultProps[inputType || 'text']}
        {...field}
        {...inputProps}
        label={inputProps?.label || t(`${name}`)}
        error={inputProps?.error || !!fieldState.error}
        helperText={inputProps?.helperText || (fieldState.error ? fieldState.error.message : ' ')}
        variant="outlined"
        fullWidth
        autoComplete="current-password"
        autoCorrect="off"
        disabled={isLoading}
        slotProps={{
          input: {
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false',
          },
          htmlInput: {
            autoComplete: 'new-password',
            form: 'noform',
            'data-lpignore': 'true',
          },
          ...defaultProps[inputType || 'text']?.slotProps,
        }}
      />
    );
  }

  return (
    <Grid {...gridProps} size={{ xs: 12, md: 6 }} sx={{ minHeight: '80px' }}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          if (inputType === 'autoComplete') {
            return (
              <Autocomplete
                options={[]}
                renderInput={params => (
                  <BaseInput<T> field={field} fieldState={fieldState} {...params} />
                )}
              />
            );
          }

          return <BaseInput<T> field={field} fieldState={fieldState} />;
        }}
      />
    </Grid>
  );
}

export default FormInput;
