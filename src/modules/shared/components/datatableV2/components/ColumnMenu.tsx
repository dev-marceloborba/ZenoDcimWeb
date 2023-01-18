import Tooltip from "@mui/material/Tooltip";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

type ColumnMenuProps = {} & IconButtonProps;

const ColumnMenu: React.FC<ColumnMenuProps> = ({ ...props }) => {
  return (
    <Tooltip title="Colunas">
      <IconButton {...props}>
        <ViewColumnIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ColumnMenu;
