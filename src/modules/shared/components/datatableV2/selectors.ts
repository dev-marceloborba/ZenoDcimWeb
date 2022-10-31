import { useAppSelector } from "app/hooks";

export default function useDatatableSelectors() {
  const order = useAppSelector((state) => state.datatable.order);
  const orderBy = useAppSelector((state) => state.datatable.orderBy);
  const filter = useAppSelector((state) => state.datatable.filter);
  const currentRows = useAppSelector((state) => state.datatable.currentRows);
  const page = useAppSelector((state) => state.datatable.page);
  const rowsPerPage = useAppSelector((state) => state.datatable.rowsPerPage);
  const openSearch = useAppSelector((state) => state.datatable.openSearch);
  const selectedItems = useAppSelector(
    (state) => state.datatable.selectedItems
  );

  const isSelected = (row: any) =>
    selectedItems.find((x: any) => x.id === row.id) !== undefined;

  return {
    order,
    orderBy,
    filter,
    currentRows,
    page,
    rowsPerPage,
    selectedItems,
    openSearch,
    isSelected,
  };
}
