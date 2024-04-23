import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCartListRED: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
    addToCartRED: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setCartListRED, addToCartRED } = cartSlice.actions;
export default cartSlice.reducer;
