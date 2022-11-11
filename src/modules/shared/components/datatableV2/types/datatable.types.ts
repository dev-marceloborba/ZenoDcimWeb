import { UserPreferenciesModel } from "modules/user/models/user-preferencies.model";
import { ColumnHeader } from "../DataTable";

export type Order = "asc" | "desc";
export type SelectionMode = "show" | "hide";
export type ManualMode = "edit" | "insert" | "none";

export interface DataTableOptions {
  previousItems?: any[];
  rowsInPage?: number;
  rowsPerPageOptions?: number[];
  selectionMode?: SelectionMode;
  hideSearch?: boolean;
  hidePagination?: boolean;
  isEditMode?: boolean;
  onSelectedItems?: (items: any[]) => void;
  onRowClick?: (row: any) => void;
  onDeleteSelection?: (row: any[]) => void;
  onEditOrInsertNewData?: (data: any, mode: ManualMode) => void;
  onEditRow?(row: any): void;
  onDeleteRow?(row: any): void;
  onDetailsRow?(row: any): void;
  showEdit?: boolean;
  showDelete?: boolean;
  showDetails?: boolean;
  onCopyItem?(selectedItem: any): void;
  userPreferenceTable?: keyof UserPreferenciesModel;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  columns: ColumnHeader[];
  selectionMode: SelectionMode;
  showEdit: boolean;
  showDelete: boolean;
  showDetails: boolean;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
  hideSearch: boolean;
  onDelete: () => void;
  toggleTitleAndSearch: () => void;
  filter: string;
  openSearch: boolean;
  setFilter: (fillter: string) => void;
  handleCopyItems(): void;
}
