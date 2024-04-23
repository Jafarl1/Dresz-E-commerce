import { combineReducers } from "@reduxjs/toolkit";
import adminsReducer from "../admin/adminsSlice";
import brandsReducer from "../common/brandsSlice";
import productsReducer from "../common/productsSlice";
import loadingReducer from "../loading/loadingSlice";
import favoritesReducer from "../client/favoritesSlice";
import cartReducer from "../client/cartSlice";

const rootReducer = combineReducers({
  admins: adminsReducer,
  brands: brandsReducer,
  products: productsReducer,
  loading: loadingReducer,
  favorites: favoritesReducer,
  cart: cartReducer,
});

export default rootReducer;
