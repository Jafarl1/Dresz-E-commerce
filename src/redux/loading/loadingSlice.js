import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    setLoadingRED: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLoadingRED } = loadingSlice.actions;
export default loadingSlice.reducer;
