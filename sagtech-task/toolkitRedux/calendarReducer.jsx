/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const initialState = {
  calendar: [],
  tasks: [],
  selectedDay: moment().clone().format("X"),
  dayTaskSelected: [],
  selectedTask: {},
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
      const startSelectedDay = moment
        .unix(state.selectedDay)
        .startOf("day")
        .format("X");
      const endSelectedDay = moment
        .unix(state.selectedDay)
        .endOf("day")
        .format("X");
      const dayTaskSelected = state.tasks.filter(
        (task) =>
          task.data.date >= startSelectedDay && task.data.date <= endSelectedDay
      );
      state.dayTaskSelected = dayTaskSelected;
    },
    getSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
      const startSelectedDay = moment
        .unix(state.selectedDay)
        .startOf("day")
        .format("X");
      const endSelectedDay = moment
        .unix(state.selectedDay)
        .endOf("day")
        .format("X");
      const dayTaskSelected = state.tasks.filter(
        (task) =>
          task.data.date >= startSelectedDay && task.data.date <= endSelectedDay
      );
      state.dayTaskSelected = dayTaskSelected;
    },
    getSelectedTask: (state, action) => {
      const newTask = state.tasks.filter(
        (event) => event.id === action.payload
      );
      state.selectedTask = newTask;
    },
  },
});
export default reduserSlice.reducer;
