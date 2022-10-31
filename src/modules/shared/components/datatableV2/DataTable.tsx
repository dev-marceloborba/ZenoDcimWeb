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
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import NoDataText from "../NoDataText";
import DeleteButton from "../DeleteButton";
import { DataTableOptions } from "./types/datatable.types";
import getFilteredRows from "./utils/getFilteredRows";
import EnhancedTableHead from "./components/EnhancedTableHead";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";
import useDatatableSelectors from "./selectors";
import { useAppDispatch } from "app/hooks";
import {
  changeOrder,
  changeOrderBy,
  setPages,
  setRows,
  setRowsPerPage,
  toggleSearch,
  setSelectedItems,
} from "./datatable-slice";

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

const CustomTableCell = (row: any, columName: string) => {
  return <>{row[columName]}</>;
};

const DataTableV2: React.FC<DataTableProps> = ({
  rows,
  columns,
  title,
  ...props
}) => {
  const options = props.options ?? ({} as DataTableOptions);
  const {
    previousItems = [],
    rowsPerPageOptions = [5, 10, 25],
    selectionMode = "show",
    onRowClick,
    onDeleteSelection,
    onSelectedItems,
    onEditRow,
    onDeleteRow,
    hideSearch = false,
    hidePagination = false,
    showDelete = false,
    showEdit = false,
    showDetails = false,
  } = options;

  const dispatch = useAppDispatch();
  const {
    filter,
    order,
    orderBy,
    page,
    currentRows,
    rowsPerPage,
    selectedItems,
    isSelected,
  } = useDatatableSelectors();

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: string) => {
      const isAsc = orderBy === property && order === "asc";
      dispatch(changeOrder(isAsc ? "desc" : "asc"));
      dispatch(changeOrderBy(property));
    },
    [dispatch, order, orderBy]
  );

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        dispatch(setSelectedItems(rows));
        return;
      }
      dispatch(setSelectedItems([]));
    },
    [dispatch, rows]
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

      dispatch(setSelectedItems(newSelected));
      if (onSelectedItems) onSelectedItems(newSelected);
    },
    [dispatch, onSelectedItems, selectedItems]
  );

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      dispatch(setPages(newPage));
    },
    [dispatch]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
      dispatch(setPages(0));
    },
    [dispatch]
  );

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
    dispatch(toggleSearch());
  }, [dispatch]);

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
    if (rows.length > 0) dispatch(setSelectedItems([]));
  }, [dispatch, rows.length]);

  useEffect(() => {
    dispatch(
      setRows(
        getFilteredRows(
          rows,
          columns,
          filter,
          page,
          rowsPerPage,
          order,
          orderBy
        )
      )
    );
  }, [columns, dispatch, filter, order, orderBy, page, rows, rowsPerPage]);

  useEffect(() => {
    if (previousItems) {
      dispatch(setSelectedItems(previousItems));
    }
  }, [dispatch, previousItems]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selectedItems.length}
          title={title}
          hideSearch={hideSearch}
          onDelete={handleDeleteSelection}
          toggleTitleAndSearch={handleToggleSearchAndTitle}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"medium"}>
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

// export default DataTableV2;
export default memo(DataTableV2);
