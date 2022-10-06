import Button, { ButtonProps } from "@mui/material/Button";

type CancelButtonProps = {} & ButtonProps;

const CancelButton: React.FC<CancelButtonProps> = ({ ...props }) => {
  return (
    <Button variant="outlined" {...props}>
      Cancelar
    </Button>
  );
};

export default CancelButton;
