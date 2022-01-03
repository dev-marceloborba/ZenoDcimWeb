import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export type ItemProps = {
  value: any;
  label: string;
};

type DropdownProps = TextFieldProps & {
  items: ItemProps[];
  value: string;
  callback(value: string): void;
};

const Dropdown: React.FC<DropdownProps> = ({ ...props }) => {
  const { items, value, callback } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    callback(event.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      select
      {...props}
      value={value}
      onChange={handleOnChange}
    >
      {items.map((item, index) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Dropdown;
