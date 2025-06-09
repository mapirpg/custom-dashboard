/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps, Box } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

type FormInputType = 'text' | 'password' | 'email';

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

interface FormInputProps<T extends FieldValues> {
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
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePasswordVisibility = () => setShowPassword(prev => !prev);
  const { t } = useTranslation();

  const defaultProps: DefaultProps = {
    password: {
      type: showPassword ? 'text' : 'password',
      slotProps: {
        input: {
          endAdornment: (
            <InputAdornment position="end">
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
    email: undefined,
    text: undefined,
  };

  return (
    <Box sx={{ minHeight: '80px' }}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <TextField
            {...defaultProps[inputType || 'text']}
            {...field}
            {...inputProps}
            label={inputProps?.label || t(name)}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ' '}
            variant="outlined"
            fullWidth
            autoComplete="current-password"
            disabled={isLoading}
          />
        )}
      />
    </Box>
  );
}

export default FormInput;
