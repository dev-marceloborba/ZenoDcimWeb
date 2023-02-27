import { ColumnHeader } from "../DataTable";
import { Order } from "../types/datatable.types";
import getComparator from "./getComparator";
import getNestedProperty from "./getNestedProperty";

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
      columns.some((column) => {
        const property = getNestedProperty(row, column.name.split("."));
        return property.toString().toLowerCase().includes(filter.toLowerCase());
      })
    )
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
