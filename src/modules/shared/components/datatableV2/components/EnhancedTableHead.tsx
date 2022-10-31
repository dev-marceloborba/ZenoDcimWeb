import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { EnhancedTableProps } from "../types/datatable.types";

export default function EnhancedTableHead(props: EnhancedTableProps) {
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
