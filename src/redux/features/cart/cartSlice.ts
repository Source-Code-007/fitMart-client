import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../../types/index.type";

const initialState = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExistProducts = state.products.find(
        (product: TProduct) => product._id === action.payload._id
      );

      if (isExistProducts) {
        isExistProducts.stock = isExistProducts.stock + 1;
      } else {
        state.products.push({ ...action.payload, stock: 1 });
      }

      state.total += action.payload.price;
      localStorage.setItem("total", state.total.toString());
    },
    removeOne: (state, action) => {
      const isExistProducts = state.products.find(
        (product: TProduct) => product._id === action.payload._id
      );

      if (isExistProducts && isExistProducts.stock > 1) {
        isExistProducts.stock = isExistProducts.stock - 1;
      } else {
        state.products = state.products.filter(
          (product: TProduct) => product._id !== action.payload._id
        );
      }
      state.total -= action.payload.price;
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product: TProduct) => product._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.stock;
    },

    clearCart(state) {
      state.products = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, removeOne, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
