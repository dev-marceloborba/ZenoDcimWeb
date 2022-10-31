import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Order } from "./types/datatable.types";

type DataTableInitialState = {
  order: Order;
  orderBy: string;
  selectedItems: any[];
  filter: string;
  currentRows: any[];
  openSearch: boolean;
  page: number;
  rowsPerPage: number;
};

const initialState: DataTableInitialState = {
  order: "asc",
  orderBy: "name",
  selectedItems: [],
  filter: "",
  currentRows: [],
  openSearch: false,
  page: 0,
  rowsPerPage: 5,
};

const datatableSlice = createSlice({
  name: "datatable",
  initialState,
  reducers: {
    changeOrder(state, action: PayloadAction<Order>) {
      state.order = action.payload;
    },
    changeOrderBy(state, action: PayloadAction<string>) {
      state.orderBy = action.payload;
    },
    changeFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    setSelectedItems(state, action: PayloadAction<any[]>) {
      state.selectedItems = [...action.payload];
    },
    setRows(state, action: PayloadAction<any[]>) {
      state.currentRows = [...action.payload];
    },
    toggleSearch(state) {
      state.openSearch = !state.openSearch;
    },
    setPages(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
  },
});

export const {
  changeOrder,
  changeFilter,
  changeOrderBy,
  setRows,
  toggleSearch,
  setPages,
  setRowsPerPage,
  setSelectedItems,
} = datatableSlice.actions;
export default datatableSlice.reducer;
