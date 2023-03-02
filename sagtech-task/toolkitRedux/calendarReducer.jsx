import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  calendar: []
};

export const reduserSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendar: (state, action) => {
      state.calendar = action.payload;
    },
  }
});
export default reduserSlice.reducer;
