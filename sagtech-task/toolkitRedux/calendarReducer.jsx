/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  calendar: [],
  tasks: [],
};

export const reduserSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendar: (state, action) => {
      state.calendar = action.payload;
    },
    setTask: (state, action) => {
      state.tasks = action.payload;
    },
  },
});
export default reduserSlice.reducer;
