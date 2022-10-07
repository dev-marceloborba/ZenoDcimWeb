import Checkbox from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";

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
      render={({ field }) => <Checkbox {...field} />}
    />
  );
};

export default ControlledCheckbox;
