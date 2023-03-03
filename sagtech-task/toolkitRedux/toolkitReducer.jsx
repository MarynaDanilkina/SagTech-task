/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  error: null,
};

export const reduserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export default reduserSlice.reducer;
