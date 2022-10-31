import { ColumnHeader } from "../DataTable";
import { Order } from "../types/datatable.types";
import getComparator from "./getComparator";

export default function getFilteredRows(
  rows: any[],
  columns: ColumnHeader[],
  filter: string,
  page: number,
  rowsPerPage: number,
  order: Order,
  orderBy: string
): any[] {
  return rows
    .filter((row) =>
      columns.some((column) =>
        row[column.name].toString().toLowerCase().includes(filter.toLowerCase())
      )
    )
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
