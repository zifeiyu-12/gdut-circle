import { createSlice } from "@reduxjs/toolkit";
export interface TopicType {
  id: string;
  content: string;
  audio?: string;
  createTime: number;
  imageList?: string[];
}

export const topicSlice = createSlice({
  name: "topic",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});
// 导出action creators
export const { increment, decrement } = topicSlice.actions;
// 导出reducer
export default topicSlice.reducer;
