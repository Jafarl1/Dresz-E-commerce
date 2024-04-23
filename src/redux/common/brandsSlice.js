import { createSlice } from "@reduxjs/toolkit";

const brandsSlice = createSlice({
  name: "brands",
  initialState: [],
  reducers: {
    getBrandsListRED: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
    removeBrandRED: (state, action) => {
      return state.filter((brand) => brand._id !== action.payload);
    },
  },
});

export const { getBrandsListRED, removeBrandRED } = brandsSlice.actions;
export default brandsSlice.reducer;
