import Button, { ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PrintIcon from "@mui/icons-material/Print";

type DownloadButtonProps = {
  mode?: "icon" | "button";
} & ButtonProps;

export default function DownloadButton(props: DownloadButtonProps) {
  const { mode = "button" } = props;

  if (mode === "button") {
    return (
      <Button variant="contained" color="primary" {...props}>
        Download
      </Button>
    );
  }

  return (
    <Tooltip title="Baixar dados">
      <IconButton {...props}>
        <PrintIcon />
      </IconButton>
    </Tooltip>
  );
}
