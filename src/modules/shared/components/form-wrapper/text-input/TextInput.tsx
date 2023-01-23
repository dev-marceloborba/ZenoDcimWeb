import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

const TextInput: React.FC<TextFieldProps> = ({ ...props }) => {
  const [field, meta] = useField(props.name!);

  if (meta && meta.touched && meta.error) {
    props.error = true;
    props.helperText = meta.error;
  }

  return (
    <TextField
      fullWidth
      variant="outlined"
      color="primary"
      {...field}
      {...props}
    />
  );
};

export default TextInput;
