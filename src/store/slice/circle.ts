import { createSlice } from "@reduxjs/toolkit";
import { Circles } from "../../types/circle";
const initalValue: CircleModelType = {
  circleList: [],
  page: 0,
  size: 6,
  total: 0,
};
export interface CircleModelType {
  circleList: Circles[];
  page: number;
  size: number;
  total: number;
}

export const circleSlice = createSlice({
  name: "circle",
  initialState: initalValue,
  reducers: {
    setCircleList: (state, action) => {
      state.circleList = action.payload;
    },
    addCircleList: (state, action) => {
      state.circleList = [...state.circleList, ...action.payload];
      return state;
    },
    setPagination: (state, action) => {
      state.page = action.payload.page;
      state.size = action.payload.size;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});
// 导出action creators
export const { setCircleList, setPagination, setTotal, addCircleList } =
  circleSlice.actions;
// 导出reducer
export default circleSlice.reducer;
