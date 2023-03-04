import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarReducer";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
export default store;
