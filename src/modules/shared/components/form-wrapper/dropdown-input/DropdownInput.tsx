import TextField, { TextFieldProps } from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useField, useFormikContext } from "formik";

type DropdownInputProps = {
  items: ItemProps[];
} & TextFieldProps;

type ItemProps = {
  label: string;
  value: string | number;
};

const DropdownInput: React.FC<DropdownInputProps> = ({ items, ...props }) => {
  const [field, meta] = useField(props.name!);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e: any) => setFieldValue(e.target.name, e.target.value);

  if (meta && meta.touched && meta.error) {
    props.error = true;
    props.helperText = meta.error;
  }

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      variant="outlined"
      color="primary"
      select
      defaultValue=""
      onChange={handleChange}
    >
      {items.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DropdownInput;
