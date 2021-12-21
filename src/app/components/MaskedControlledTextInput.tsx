import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import MaskedInput from "react-input-mask";

const MaskedControlledTextInput: React.FC<TextFieldProps> = ({ ...props }) => {
  const { control } = useFormContext();
  const { name, defaultValue } = props;
  return (
    <Controller
      name={name ?? ""}
      control={control}
      defaultValue={defaultValue ? defaultValue : ""}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <MaskedInput mask="9999-9999" onChange={onChange} value={value}>
          {({ ...innerProps }) => (
            <TextField
              variant="outlined"
              fullWidth
              error={!!errors[name ?? ""]?.message}
              helperText={errors[name ?? ""]?.message}
              {...props}
              {...innerProps}
            />
          )}
        </MaskedInput>
      )}
    />
  );
};

export default MaskedControlledTextInput;
