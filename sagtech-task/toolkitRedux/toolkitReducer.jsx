import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  error: null,
  user: null,
};


export const reduserSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  }
});
export default reduserSlice.reducer;
