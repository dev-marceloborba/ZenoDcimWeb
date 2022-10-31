import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import ConditionalRender from "../../ConditionalRender";
import Visible from "../../Visible";
import Row from "../../Row";
import SearchInput from "../components/SearchInput";
import { EnhancedTableToolbarProps } from "../types/datatable.types";
import DeleteButton from "../../DeleteButton";
import IconButton from "@mui/material/IconButton";
import useDatatableSelectors from "../selectors";
import { useAppDispatch } from "app/hooks";
import { changeFilter } from "../datatable-slice";

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, title, hideSearch, onDelete, toggleTitleAndSearch } =
    props;

  const { filter, openSearch } = useDatatableSelectors();
  const dispatch = useAppDispatch();

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
          trueCondition={
            <SearchInput
              value={filter}
              setValue={(value) => dispatch(changeFilter(value))}
            />
          }
        />
      )}
      {numSelected > 0 ? (
        <DeleteButton mode="icon" onDeleteConfirmation={onDelete} />
      ) : (
        <Row>
          <Visible show={!hideSearch}>
            <Tooltip title="Filter list">
              <IconButton onClick={toggleTitleAndSearch}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Visible>
        </Row>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
