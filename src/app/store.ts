import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/auth/authSlice';
import cartReducer from '../feature/cart/cartSlice';
import wishlistReducer from '../feature/wishlist/wishlistSlice';
import productsReducer from '../feature/product/productsSlice'; // 👈 add this

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer, // 👈 add this
  },
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
