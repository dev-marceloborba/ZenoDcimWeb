import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import { useField, useFormikContext } from "formik";
import React from "react";

type CheckboxProps = { label: string; legend?: string } & MuiCheckboxProps;

const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name!);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => setFieldValue(e.target.name, checked);

  const configFormControl: any = {};
  if (meta && meta.touched && meta.error) configFormControl.error = true;

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{props.legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <MuiCheckbox
              {...field}
              checked={field.value ?? false}
              onChange={handleChange}
              sx={{ paddingY: 0 }}
            />
          }
          label={props.label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default Checkbox;
