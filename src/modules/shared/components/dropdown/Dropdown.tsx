import TextField, { TextFieldProps } from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

type DropdownProps = { items: MenuItems } & TextFieldProps;

type MenuItems = {
  value: number;
  description: string;
}[];

const Dropdown: React.FC<DropdownProps> = ({ items, ...props }) => {
  return (
    <TextField variant="outlined" defaultValue="" {...props} select>
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.description}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Dropdown;
