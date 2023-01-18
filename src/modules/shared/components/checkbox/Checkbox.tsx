import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";

type CheckboxProps = {
  label: string;
} & MuiCheckboxProps;

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <FormGroup>
      <FormControlLabel control={<MuiCheckbox {...props} />} label={label} />
    </FormGroup>
  );
};

export default Checkbox;
