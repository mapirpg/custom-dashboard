/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import {
  BaseTextFieldProps,
  IconButton,
  InputAdornment,
  InputProps,
  SlotProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type FormInputType = 'text' | 'password' | 'email';

type DefaultProps = Record<
  FormInputType,
  | SlotProps<
      React.ElementType<InputProps, keyof React.JSX.IntrinsicElements>,
      {},
      BaseTextFieldProps
    >
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

  const defaultProps: DefaultProps = {
    password: {
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
    email: undefined,
    text: undefined,
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...inputProps}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ''}
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          disabled={isLoading}
          slotProps={{
            input: defaultProps[inputType || 'text'],
          }}
        />
      )}
    />
  );
}

export default FormInput;
