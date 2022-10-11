import Checkbox from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

type ControlledCheckboxProps = {
  name: string;
  label: string;
};

const ControlledCheckbox: React.FC<ControlledCheckboxProps> = ({
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      {...props}
      render={({ field }) => (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value ?? false}
                onChange={field.onChange}
              />
            }
            label={props.label}
          />
        </FormGroup>
      )}
    />
  );
};

export default ControlledCheckbox;
