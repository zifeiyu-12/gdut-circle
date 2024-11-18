import { createSlice } from "@reduxjs/toolkit";
export interface CircleType {
  id?: string;
  name?: string;
  cover?: string;
  description?: string;
}
const initalValue: CircleType[] = [
  {
    id: "1",
    name: "公共圈",
    cover: "",
    description: "公共圈",
  },
];

export const circleSlice = createSlice({
  name: "circle",
  initialState: initalValue,
  reducers: {
    setCircleList: (state, action) => {
      state = action.payload;
      return state;
    },
    refreshCircleList: (state) => {
      state = [
        ...initalValue,
        ...JSON.parse(localStorage.getItem("circleList") ?? "[]"),
      ];
      return state;
    },
  },
});
// 导出action creators
export const { setCircleList, refreshCircleList } = circleSlice.actions;
// 导出reducer
export default circleSlice.reducer;
