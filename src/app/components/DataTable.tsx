import React, { useState, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { visuallyHidden } from "@mui/utils";
import NoDataText from "./NoDataText";
import ConditionalRender from "./ConditionalRender";

interface DataTableProps {
  columns: ColumnHeader[];
  rows: any[];
  title: string;
  options?: DataTableOptions;
}

interface DataTableOptions {
  previousItems?: any[];
  rowsInPage?: number;
  rowsPerPageOptions?: number[];
  selectionMode?: SelectionMode;
  onSelectedItems?: (items: any[]) => void;
  onRowClick?: (row: any) => void;
  onDeleteSelection?: (row: any[]) => void;
}

export interface ColumnHeader {
  name: string;
  label: string;
  renderComponent?: (row: any) => JSX.Element;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";
type SelectionMode = "show" | "hide";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns: ColumnHeader[];
  selectionMode: SelectionMode;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
    selectionMode,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
        })}
      >
        {selectionMode === "show" && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {columns.map((column, index) => (
          <TableCell
            key={column.name}
            align={index === 0 ? "left" : "right"}
            padding={"normal"}
            sortDirection={orderBy === column.name ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.name}
              direction={orderBy === column.name ? order : "asc"}
              onClick={createSortHandler(column.name)}
            >
              {column.label}
              {orderBy === column.name ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
  filter: string;
  openSearch: boolean;
  setFilter: (fillter: string) => void;
  onDelete: () => void;
  toggleTitleAndSearch: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    numSelected,
    title,
    filter,
    openSearch,
    setFilter,
    onDelete,
    toggleTitleAndSearch,
  } = props;

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
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={toggleTitleAndSearch}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

type SearchInputProps = {
  value: string;
  setValue: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, setValue }) => {
  return (
    <TextField
      name="searchTable"
      variant="standard"
      label="Procurar..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      sx={{ flex: "1 1 100%" }}
    />
  );
};

const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  title,
  ...props
}) => {
  const options = props.options ?? ({} as DataTableOptions);
  const {
    previousItems,
    rowsPerPageOptions = [5, 10, 25],
    rowsInPage = 5,
    selectionMode = "show",
    onRowClick,
    onDeleteSelection,
    onSelectedItems,
  } = options;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState(columns[0].name);
  const [selected, setSelected] = useState<any[]>(previousItems || []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsInPage);
  const [filter, setFilter] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (row: any) => selected.indexOf(row) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const filteredRows = rows
    .filter((row) =>
      columns.some((column) =>
        row[column.name].toString().toLowerCase().includes(filter.toLowerCase())
      )
    )
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .sort(getComparator(order, orderBy));

  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleDeleteSelection = () => {
    if (onDeleteSelection) {
      onDeleteSelection(selected);
    }
  };

  const handleToggleSearchAndTitle = () => {
    setOpenSearch(!openSearch);
  };

  useEffect(() => {
    if (onSelectedItems) onSelectedItems(selected);
  }, [selected, onSelectedItems]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          filter={filter}
          openSearch={openSearch}
          setFilter={setFilter}
          onDelete={handleDeleteSelection}
          toggleTitleAndSearch={handleToggleSearchAndTitle}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              selectionMode={selectionMode}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
            />
            <TableBody>
              {filteredRows.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {selectionMode === "show" && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row)}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                    )}
                    {columns.map((column, index) => {
                      return (
                        <TableCell
                          key={index}
                          align={index === 0 ? "left" : "right"}
                          onClick={() => handleRowClick(row)}
                        >
                          {column.renderComponent
                            ? column.renderComponent(row[column.name])
                            : row[column.name]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          {filteredRows.length === 0 && <NoDataText />}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página"
        />
      </Paper>
    </Box>
  );
};

export default DataTable;
