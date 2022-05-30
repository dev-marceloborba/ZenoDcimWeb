import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";

type ComboboxItem = {
  value: string | number;
  description: string;
};

type TextInputProps = {
  items?: ComboboxItem[];
  forceSelect?: boolean;
} & TextFieldProps;

const ControlledTextInput: React.FC<TextInputProps> = ({ ...props }) => {
  const { control } = useFormContext();
  const { name, defaultValue, forceSelect } = props;
  return (
    <Controller
      name={name ?? ""}
      control={control}
      defaultValue={defaultValue ? defaultValue : ""}
      render={({ field, formState: { errors } }) => (
        <TextField
          variant="outlined"
          fullWidth
          error={!!errors[name ?? ""]?.message}
          helperText={errors[name ?? ""]?.message}
          {...props}
          {...field}
          select={!!props.items?.length || forceSelect}
        >
          {props.items?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.description}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default ControlledTextInput;
