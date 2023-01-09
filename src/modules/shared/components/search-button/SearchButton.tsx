import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";

type SearchButtonProps = {} & IconButtonProps;

export default function SearchButton(props: SearchButtonProps) {
  return (
    <Tooltip title="Procurar">
      <IconButton {...props}>
        <SearchIcon />
      </IconButton>
    </Tooltip>
  );
}
