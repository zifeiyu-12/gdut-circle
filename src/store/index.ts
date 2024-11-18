import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "./slice/topic";
import circleReducer from "./slice/circle";
const store = configureStore({
  reducer: {
    topic: topicReducer,
    circle: circleReducer,
  },
});
export default store;
