/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import {
  Grid,
  TextField,
  GridProps,
  IconButton,
  Autocomplete,
  InputAdornment,
  TextFieldProps,
} from '@mui/material';
import {
  Control,
  Path,
  Controller,
  FieldValues,
  ControllerFieldState,
  ControllerRenderProps,
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

export type InputSelectOption = {
  label: string;
  value: string;
};

interface FormInputProps<T extends FieldValues> extends GridProps {
  control: Control<T>;
  name: Path<T>;
  inputProps?: Omit<TextFieldProps, 'name'>;
  inputType?: FormInputType;
  isLoading?: boolean;
  options?: InputSelectOption[];
}

function BaseInput<T extends FieldValues>({
  field,
  fieldState,
  inputProps,
  defaultProps,
  isLoading,
  inputType,
  name,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  inputProps?: TextFieldProps;
  defaultProps?: DefaultProps;
  inputType?: FormInputType;
  isLoading?: boolean;
  name?: Path<T>;
}) {
  const { t } = useTranslation();

  return (
    <TextField
      sx={{
        m: 0,
        p: 0,
        ...inputProps?.sx,
      }}
      {...(defaultProps ? defaultProps[inputType || 'text'] : {})}
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
        ...(defaultProps ? defaultProps[inputType || 'text']?.slotProps : {}),
      }}
    />
  );
}

function AutoCompleteInput<T extends FieldValues>({
  field,
  fieldState,
  inputProps,
  options,
  defaultProps,
  name,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  inputProps?: TextFieldProps;
  options?: InputSelectOption[];
  defaultProps?: DefaultProps;
  name?: Path<T>;
}) {
  const { t } = useTranslation();

  return (
    <Autocomplete
      options={options || []}
      getOptionLabel={option => option.label}
      onChange={(_event, value) => {
        const selectedValue = value as InputSelectOption | null;
        field.onChange(selectedValue?.value ? String(selectedValue?.value) : '');
      }}
      renderInput={params => (
        <TextField
          {...params}
          {...defaultProps?.autoComplete}
          {...field}
          {...inputProps}
          label={inputProps?.label || t(`${name}`)}
          error={inputProps?.error || !!fieldState.error}
          helperText={inputProps?.helperText || (fieldState.error ? fieldState.error.message : ' ')}
        />
      )}
    />
  );
}

function FormInput<T extends FieldValues>({
  control,
  name,
  inputProps,
  isLoading,
  inputType,
  options,
  ...gridProps
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePasswordVisibility = () => setShowPassword(prev => !prev);

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
    },
  };

  return (
    <Grid {...gridProps} size={{ xs: 12, md: 6 }} sx={{ minHeight: '90px' }}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          if (inputType === 'autoComplete') {
            return (
              <AutoCompleteInput
                name={name}
                field={field}
                options={options}
                fieldState={fieldState}
                inputProps={inputProps}
                defaultProps={defaultProps}
              />
            );
          }

          return (
            <BaseInput<T>
              field={field}
              fieldState={fieldState}
              defaultProps={defaultProps}
              inputProps={inputProps}
              inputType={inputType}
              isLoading={isLoading}
              name={name}
            />
          );
        }}
      />
    </Grid>
  );
}

export default FormInput;
