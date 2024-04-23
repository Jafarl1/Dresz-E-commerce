import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    getProductsListRED: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
    removeProductRED: (state, action) => {
      return state.filter((product) => product._id !== action.payload);
    },
  },
});

export const { getProductsListRED, removeProductRED } = productsSlice.actions;
export default productsSlice.reducer;
