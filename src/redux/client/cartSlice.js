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
    decreaseProductCountRED: (state, action) => {
      const index = state.indexOf(
        state.find((el) => el._id === action.payload)
      );
      if (state[index].productCount > 1) {
        state[index].productCount--;
      }
    },
    increaseProductCountRED: (state, action) => {
      const index = state.indexOf(
        state.find((el) => el._id === action.payload)
      );
      state[index].productCount++;
    },
  },
});

export const {
  setCartListRED,
  addToCartRED,
  decreaseProductCountRED,
  increaseProductCountRED,
} = cartSlice.actions;
export default cartSlice.reducer;
