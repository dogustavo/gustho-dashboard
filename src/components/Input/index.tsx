import { useFormContext, Controller } from 'react-hook-form';
import { TextField, BaseTextFieldProps, InputProps } from '@mui/material';

interface IInput extends BaseTextFieldProps {
  name: string;
  required?: boolean;
  label: string;
  textFieldProps?: InputProps;
}

export default function Input({
  name,
  required,
  label,
  textFieldProps,
}: IInput) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => {
        return (
          <TextField
            {...field}
            onChange={field.onChange}
            value={field.value || ''}
            label={label}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            margin="normal"
            fullWidth
            InputProps={{ ...textFieldProps }}
          />
        );
      }}
    />
  );
}
