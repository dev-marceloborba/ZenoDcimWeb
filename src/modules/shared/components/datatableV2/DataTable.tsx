import React, { useState, useCallback, useMemo, useEffect, memo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import NoDataText from "../NoDataText";
import DeleteButton from "../DeleteButton";
import { DataTableOptions, Order } from "./types/datatable.types";
import getFilteredRows from "./utils/getFilteredRows";
import EnhancedTableHead from "./components/EnhancedTableHead";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";
import { useAppDispatch } from "app/hooks";
import { setPreferences } from "modules/user/stores/slices/AuthenticationSlice";
import { useAuth } from "app/hooks/useAuth";
import { useUpdateUserPreferenciesMutation } from "modules/user/services/user-preferencies.service";
import EditButton from "../edit-button/EditButton";
import { SxProps, Theme } from "@mui/material";
interface DataTableProps {
  columns: ColumnHeader[];
  rows: any[];
  title: string;
  options?: DataTableOptions;
  sx?: SxProps<Theme>;
}

export interface ColumnHeader {
  name: string;
  label: string;
  renderComponent?: (row: any) => JSX.Element;
  customFunction?: (row: any) => any;
}

const CustomTableCell = (row: any, columName: string) => {
  return <>{row[columName]}</>;
};

const DataTableV2: React.FC<DataTableProps> = ({
  rows,
  columns,
  title,
  sx,
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
    onEditRow,
    onDeleteRow,
    onCopyItem,
    hideSearch = false,
    hidePagination = false,
    showDelete = false,
    showEdit = false,
    showDetails = false,
    userPreferenceTable,
  } = options;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState(columns[0].name);
  const [selectedItems, setSelectedItems] = useState<any[]>([...previousItems]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsInPage);
  const [filter, setFilter] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  /*
    TODO: avaliar qual melhor forma de iniciar o array do estado currentRows,
    pois iniciando vazio, aparece a mensagem de sem resultados disponi3veis durante um tempo
    // const [currentRows, setCurrentRows] = useState<any[]>([]);
  */
  const [currentRows, setCurrentRows] = useState<any[]>(
    hidePagination
      ? rows
      : getFilteredRows(rows, columns, filter, page, rowsInPage, order, orderBy)
  );
  const dispatch = useAppDispatch();
  const { userState } = useAuth();
  const [updatePreferences] = useUpdateUserPreferenciesMutation();

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: string) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let items: any[] = [];
      if (event.target.checked) {
        items = [...rows];
      }
      setSelectedItems(items);
      if (onSelectedItems) onSelectedItems(items);
    },
    [onSelectedItems, rows]
  );

  const handleClick = useCallback(
    (isSelected: boolean, row: any) => {
      let newSelected = [...selectedItems];
      if (!isSelected) {
        const result = selectedItems.find((x) => x.id === row.id);
        if (result === undefined) newSelected.push(row);
      } else {
        newSelected = selectedItems.filter((x) => x.id !== row.id);
      }

      setSelectedItems(newSelected);
      if (onSelectedItems) onSelectedItems(newSelected);
    },
    [onSelectedItems, selectedItems]
  );

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      setRowsPerPage(value);
      setPage(0);
      if (userState.userPreferencies && userPreferenceTable !== undefined) {
        const { userPreferencies } = userState;
        const newPreferences: typeof userPreferencies = {
          ...userPreferencies,
          [userPreferenceTable]: value,
        };
        dispatch(setPreferences(newPreferences));
        const options = {
          ...newPreferences,
          id: userState.user?.id ?? "",
        };
        await updatePreferences(options).unwrap();
      }
    },
    [dispatch, updatePreferences, userPreferenceTable, userState]
  );

  const isSelected = (row: any) => {
    return selectedItems.find((x) => x.id === row.id) !== undefined;
  };

  const emptyRows = useMemo(() => {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  }, [page, rows.length, rowsPerPage]);

  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleDeleteSelection = () => {
    if (onDeleteSelection) {
      onDeleteSelection(selectedItems);
    }
  };

  const handleToggleSearchAndTitle = useCallback(() => {
    setOpenSearch(!openSearch);
  }, [openSearch]);

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

  const handleCopyItems = () => {
    if (onCopyItem) onCopyItem(selectedItems[0]);
  };

  // reset selection state on new rows
  useEffect(() => {
    if (rows.length > 0) setSelectedItems([]);
  }, [rows.length]);

  useEffect(() => {
    setCurrentRows(
      getFilteredRows(rows, columns, filter, page, rowsPerPage, order, orderBy)
    );
  }, [columns, filter, order, orderBy, page, rows, rowsPerPage]);

  useEffect(() => {
    if (previousItems.length > 0) {
      setSelectedItems(previousItems);
    }
  }, [previousItems.length]);

  useEffect(() => {
    if (userState.userPreferencies && userPreferenceTable !== undefined) {
      const { userPreferencies } = userState;
      const value = userPreferencies[userPreferenceTable] as number;
      if (value === undefined) {
        console.warn(
          `Atenção! Propriedade ${userPreferenceTable} de tabela não encontrada no localStorage`
        );
        setRowsPerPage(5);
      } else {
        setRowsPerPage(value);
      }
    }
  }, [userPreferenceTable, userState]);

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selectedItems.length}
          title={title}
          hideSearch={hideSearch}
          onDelete={handleDeleteSelection}
          toggleTitleAndSearch={handleToggleSearchAndTitle}
          filter={filter}
          setFilter={setFilter}
          openSearch={openSearch}
          handleCopyItems={handleCopyItems}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            sx={{
              "& .MuiTableCell-root": {
                padding: "4px 8px",
              },
            }}
          >
            <EnhancedTableHead
              numSelected={selectedItems.length}
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
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(_) => handleClick(isItemSelected, row)}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                    )}
                    {columns.map((column, index) => {
                      if (Array.isArray(row[column.name])) {
                        return (
                          <TableCell
                            align="right"
                            {...(!editMode && {
                              onClick: () => handleRowClick(row),
                            })}
                          >
                            {row[column.name].map((r: any, idx: number) => (
                              <div key={idx}>{r.name}</div>
                              // <TableRow key={idx}>
                              //   <TableCell>{r.name}</TableCell>
                              // </TableRow>
                            ))}
                          </TableCell>
                        );
                      } else
                        return (
                          <TableCell
                            key={index}
                            align={index === 0 ? "left" : "right"}
                            {...(!editMode && {
                              onClick: () => handleRowClick(row),
                            })}
                          >
                            {column.renderComponent
                              ? column.renderComponent(row[column.name])
                              : column.customFunction
                              ? column.customFunction(row[column.name])
                              : CustomTableCell(row, column.name)}
                          </TableCell>
                        );
                    })}
                    {(showEdit || showDelete) && (
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end">
                          {showEdit && (
                            <EditButton
                              mode="icon"
                              onClick={() => handleEditOnClick(row)}
                            />
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
          {currentRows.length === 0 ? <NoDataText /> : null}
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

// export default DataTableV2;
export default memo(DataTableV2);
