/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const initialState = {
  calendar: [],
  tasks: [],
  selectedDay: null,
  dayTaskSelected: [],
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
    getSelectedDay: (state, action) => {
      state.selectedDay = action.payload.today;
      const startSelectedDay = moment
        .unix(action.payload.today)
        .startOf("day")
        .format("X");
      const endSelectedDay = moment
        .unix(action.payload.today)
        .endOf("day")
        .format("X");
      const dayTaskSelected = action.payload.tasks.filter(
        (task) =>
          task.data.date >= startSelectedDay && task.data.date <= endSelectedDay
      );
      state.dayTaskSelected = dayTaskSelected;
    },
    getDayTaskSelected: (state, action) => {
      state.dayTaskSelected = action.payload;
    },
  },
});
export default reduserSlice.reducer;
