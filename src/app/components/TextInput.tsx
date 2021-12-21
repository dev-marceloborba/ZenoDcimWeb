import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

type ComboboxItem = {
  value: string | number;
  description: string;
};

type TextInputProps = {
  items?: ComboboxItem[];
} & TextFieldProps;

// const TextInput: React.FC<TextInputProps> = ({ ...props }) => {
const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>((props, ref) => {
  return (
    <TextField
      {...props}
      ref={ref}
      margin="normal"
      fullWidth
      id={props.name}
      variant="outlined"
      error={!!props.helperText}
      helperText={props.helperText ? props.helperText : null}
      select={!!props.items?.length}
    >
      {props.items?.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.description}
        </MenuItem>
      ))}
    </TextField>
  );
});

export default TextInput;
