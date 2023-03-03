import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import isNumber from "modules/utils/helpers/isNumber";

export type ComboboxItem = {
  value: string | number | boolean;
  description: string;
};

type TextInputProps = {
  items?: ComboboxItem[];
  forceSelect?: boolean;
} & TextFieldProps;

const ControlledTextInput: React.FC<TextInputProps> = ({ ...props }) => {
  const { control } = useFormContext();
  const { name, defaultValue, forceSelect } = props;

  const getDefaultValue = () => {
    if (isNumber(defaultValue)) {
      return defaultValue;
    } else {
      return "";
    }
  };

  return (
    <Controller
      name={name ?? ""}
      control={control}
      // defaultValue={defaultValue ? defaultValue : ""}
      // defaultValue={!!defaultValue ? defaultValue : ""}
      defaultValue={getDefaultValue()}
      render={({
        field: { name, onBlur, onChange, value },
        formState: { errors },
      }) => (
        <TextField
          variant="outlined"
          fullWidth
          error={!!errors[name ?? ""]?.message}
          helperText={errors[name ?? ""]?.message}
          {...props}
          select={!!props.items?.length || forceSelect}
          onChange={(e) => {
            onChange(e);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          value={value}
          onBlur={onBlur}
        >
          {props.items?.map((item, idx) => (
            <MenuItem key={idx} value={item.value as string}>
              {item.description}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default ControlledTextInput;
