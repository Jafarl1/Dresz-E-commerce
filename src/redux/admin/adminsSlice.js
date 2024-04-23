import { createSlice } from "@reduxjs/toolkit";

const adminsSlice = createSlice({
  name: "admins",
  initialState: [],
  reducers: {
    getAdminsListRED: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
    removeAdminRED: (state, action) => {
      return state.filter((admin) => admin._id !== action.payload);
    },
  },
});

export const { getAdminsListRED, removeAdminRED } = adminsSlice.actions;
export default adminsSlice.reducer;
