import React, { useState, useEffect, memo } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/DoneRounded";
import CancelIcon from "@mui/icons-material/DoDisturbRounded";
import { visuallyHidden } from "@mui/utils";
import NoDataText from "../NoDataText";
import ConditionalRender from "../ConditionalRender";
import Visible from "../Visible";
import DeleteButton from "../DeleteButton";
import Row from "../Row";
import Column from "../Column";
import {
  DataTableOptions,
  EnhancedTableProps,
  EnhancedTableToolbarProps,
  ManualMode,
  Order,
} from "./types/datatable.types";
import getFilteredRows from "./utils/getFilteredRows";
import SearchInput from "./components/SearchInput";

interface DataTableProps {
  columns: ColumnHeader[];
  rows: any[];
  title: string;
  options?: DataTableOptions;
}

export interface ColumnHeader {
  name: string;
  label: string;
  renderComponent?: (row: any) => JSX.Element;
  customFunction?: (row: any) => any;
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
    showDelete,
    showEdit,
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
        {(showEdit || showDelete) && <TableCell align="right">Ações</TableCell>}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    numSelected,
    title,
    filter,
    openSearch,
    hideSearch,
    editMode,
    setFilter,
    onDelete,
    onAdd,
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
          <Visible show={editMode}>
            <Tooltip title="Adicionar linha">
              <IconButton onClick={onAdd}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Visible>
        </Row>
      )}
    </Toolbar>
  );
};

const CustomTableCell = (row: any, columName: string, onChange: any) => {
  const { editMode } = row;
  return (
    <>
      {editMode ? (
        <Input
          value={row[columName]}
          onChange={(e) => onChange(e, row)}
          name={columName}
        />
      ) : (
        row[columName]
      )}
    </>
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
    previousItems = [],
    rowsPerPageOptions = [5, 10, 25],
    rowsInPage = 5,
    selectionMode = "show",
    onRowClick,
    onDeleteSelection,
    onSelectedItems,
    onEditOrInsertNewData,
    onEditRow,
    onDeleteRow,
    hideSearch = false,
    hidePagination = false,
    isEditMode = false,
    showDelete = false,
    showEdit = false,
    showDetails = false,
  } = options;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState(columns[0].name);
  const [selected, setSelected] = useState<any[]>([...previousItems]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsInPage);
  const [filter, setFilter] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [currentRows, setCurrentRows] = useState<any[]>(
    hidePagination
      ? rows.map((row) => ({ ...row, editMode: false }))
      : getFilteredRows(
          rows,
          columns,
          filter,
          page,
          rowsInPage,
          order,
          orderBy
        ).map((row) => ({ ...row, editMode: false }))
  );
  const [dataBeforeSelection, setDataBeforeSelection] = useState<any>();
  const [manualMode, setManualMode] = useState<ManualMode>("none");

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
      setSelected(rows);
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
    if (onSelectedItems) onSelectedItems(newSelected);
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

  const isSelected = (row: any) =>
    selected.find((x) => x.id === row.id) !== undefined;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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

  const handleEditMode = (row: any) => {
    setCurrentRows((_) => {
      return currentRows.map((r) => {
        if (row.id === r.id) {
          return { ...row, editMode: !row.editMode };
        }
        return r;
      });
    });
    if (manualMode === "edit" || manualMode === "insert") {
      setManualMode("none");
      setDataBeforeSelection(null);
    } else {
      setManualMode("edit");
      setDataBeforeSelection(row);
    }
  };

  const onChange = (e: any, row: any) => {
    const value = e.target.value;
    const name = e.target.name;

    const { id } = row;

    setCurrentRows((oldState) => {
      return oldState.map((r) => {
        if (r.id === id) {
          return { ...r, [name]: value };
        }
        return r;
      });
    });
  };

  const handleAddRow = () => {
    if (manualMode === "edit" || manualMode === "insert") return;
    const properties = columns.map((c) => c.name);
    const newRow = {} as any;
    properties.forEach((p) => {
      newRow[p] = "";
    });
    newRow.editMode = true;
    setManualMode("insert");
    setCurrentRows([...currentRows, newRow]);
  };

  const handleRestoreDataOnEditing = (row: any) => {
    if (dataBeforeSelection) {
      handleEditMode(row);
      setCurrentRows((oldState) => {
        return oldState.map((r) => {
          if (r.id === row.id) {
            return { ...r, ...dataBeforeSelection };
          }
          return r;
        });
      });
    }
  };

  const handleConfirmChange = (row: any) => {
    if (onEditOrInsertNewData) {
      const { editMode, ...data } = row;
      onEditOrInsertNewData(data, manualMode);
    }
    handleEditMode(row);
  };

  const handleEditOnClick = (row: any) => {
    if (onEditRow) {
      onEditRow(row);
    }
  };

  const handleDeleteOnClick = (row: any) => {
    if (onDeleteRow) {
      onDeleteRow(row);
    }
  };

  // reset selection state on new rows
  useEffect(() => {
    if (rows.length > 0) setSelected([]);
  }, [rows]);

  useEffect(() => {
    setCurrentRows(
      getFilteredRows(rows, columns, filter, page, rowsPerPage, order, orderBy)
    );
  }, [columns, filter, order, orderBy, page, rows, rowsPerPage]);

  // useEffect(() => {
  //   if (previousItems) {
  //     setSelected(previousItems);
  //   }
  // }, [previousItems]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          filter={filter}
          openSearch={openSearch}
          hideSearch={hideSearch}
          editMode={isEditMode}
          setFilter={setFilter}
          onAdd={handleAddRow}
          onDelete={handleDeleteSelection}
          toggleTitleAndSearch={handleToggleSearchAndTitle}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              selectionMode={selectionMode}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
              showDelete={showDelete}
              showEdit={showEdit}
              showDetails={showDetails}
            />
            <TableBody>
              {currentRows.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;
                const { editMode } = row;

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
                        {editMode ? (
                          <Column>
                            <Tooltip title="Confirmar">
                              <IconButton
                                onClick={() => handleConfirmChange(row)}
                              >
                                <DoneIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Cancelar">
                              <IconButton
                                onClick={() => handleRestoreDataOnEditing(row)}
                              >
                                <CancelIcon />
                              </IconButton>
                            </Tooltip>
                          </Column>
                        ) : (
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, row)}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        )}
                      </TableCell>
                    )}
                    {columns.map((column, index) => {
                      return (
                        <TableCell
                          key={index}
                          align={index === 0 ? "left" : "right"}
                          {...(!editMode && {
                            onClick: () => handleRowClick(row),
                          })}
                        >
                          {/* {column.renderComponent
                            ? column.renderComponent(row[column.name])
                            : CustomTableCell(row, column.name, onChange)}
                          {column.customFunction
                            ? column.customFunction(row[column.name])
                            : CustomTableCell(row, column.name, onChange)} */}
                          {column.renderComponent
                            ? column.renderComponent(row[column.name])
                            : // <column.renderComponent {...props} />
                            column.customFunction
                            ? column.customFunction(row[column.name])
                            : CustomTableCell(row, column.name, onChange)}
                        </TableCell>
                      );
                    })}
                    {isEditMode && (
                      <TableCell>
                        {!isItemSelected && (
                          <IconButton onClick={() => handleEditMode(row)}>
                            <EditIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    )}
                    {(showEdit || showDelete) && (
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end">
                          {showEdit && (
                            <IconButton onClick={() => handleEditOnClick(row)}>
                              <EditIcon />
                            </IconButton>
                          )}
                          {showDelete && (
                            <DeleteButton
                              mode="icon"
                              onDeleteConfirmation={() =>
                                handleDeleteOnClick(row)
                              }
                            />
                          )}
                        </Stack>
                      </TableCell>
                    )}
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
          {currentRows.length === 0 && <NoDataText />}
        </TableContainer>
        {!hidePagination && (
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
        )}
      </Paper>
    </Box>
  );
};

export default memo(DataTable);
