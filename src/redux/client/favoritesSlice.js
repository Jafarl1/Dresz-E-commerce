import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    setFavoritesListRED: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
    addToFavoritesRED: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setFavoritesListRED, addToFavoritesRED } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
