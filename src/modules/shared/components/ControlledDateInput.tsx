import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";

type ControlledDateInputProps = {
  name: string;
  defaultValue?: string;
  label: string;
};

const ControlledDateInput: React.FC<ControlledDateInputProps> = ({
  ...props
}) => {
  const { control } = useFormContext();
  const { name, label } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      render={({ field, formState: { errors } }) => (
        <DatePicker
          label={label}
          {...field}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              fullWidth
              helperText={errors[name ?? ""]?.message}
              {...params}
              error={!!errors[name ?? ""]?.message}
            />
          )}
        />
      )}
    />
  );
};

export default ControlledDateInput;
