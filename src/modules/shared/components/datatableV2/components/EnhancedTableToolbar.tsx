import { memo } from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ConditionalRender from "../../ConditionalRender";
import Visible from "../../Visible";
import Row from "../../Row";
import SearchInput from "../components/SearchInput";
import { EnhancedTableToolbarProps } from "../types/datatable.types";
import DeleteButton from "../../DeleteButton";
import IconButton from "@mui/material/IconButton";
import Menu from "modules/shared/components/menu/Menu";
// icons
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ColumnMenu from "./ColumnMenu";
import DownloadButton from "../../download-button/DownloadButton";

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = ({
  numSelected,
  title,
  hideSearch,
  onDelete,
  onDownload,
  toggleTitleAndSearch,
  filter,
  setFilter,
  openSearch,
  handleCopyItems,
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionados
        </Typography>
      ) : (
        <ConditionalRender
          condition={openSearch}
          falseCondition={
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {title}
            </Typography>
          }
          trueCondition={<SearchInput value={filter} setValue={setFilter} />}
        />
      )}
      {numSelected > 0 ? (
        <>
          <Tooltip title="Duplicar">
            <IconButton disabled={numSelected > 1} onClick={handleCopyItems}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <DeleteButton mode="icon" onDeleteConfirmation={onDelete} />
        </>
      ) : (
        <Row>
          <Visible show={!hideSearch}>
            <Tooltip title="Buscar">
              <IconButton onClick={toggleTitleAndSearch}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Visible>
          <DownloadButton mode="icon" onClick={onDownload} />
          {/* <ColumnMenu /> */}
        </Row>
      )}
    </Toolbar>
  );
};

export default memo(EnhancedTableToolbar);
