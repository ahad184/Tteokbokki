import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from './cartTypes';
import type { Product, CartItem } from '../../types/product';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const API_URL = `${API_BASE_URL}/api/cart`;

interface CartItemResponse {
  _id: string;
  productId: Product & { _id?: string; title?: string };
  quantity: number;
}

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch cart';
      return rejectWithValue(message);
    }
  }
);

export const addToCartDB = createAsyncThunk(
  'cart/addToCartDB',
  async ({ product, token }: { product: Product; token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_URL,
        { productId: product._id || product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { ...response.data, productId: product }; // Populating product manually for UI
    } catch (error: unknown) {
      console.error("Add to cart DB error:", error);
      const message = error instanceof Error ? error.message : 'Failed to add to cart';
      return rejectWithValue(message);
    }
  }
);

export const updateQuantityDB = createAsyncThunk(
  'cart/updateQuantityDB',
  async ({ id, quantity, token }: { id: string; quantity: number; token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update quantity';
      return rejectWithValue(message);
    }
  }
);

export const removeFromCartDB = createAsyncThunk(
  'cart/removeFromCartDB',
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to remove from cart';
      return rejectWithValue(message);
    }
  }
);

export const clearCartDB = createAsyncThunk(
  'cart/clearCartDB',
  async (token: string, { rejectWithValue }) => {
    try {
      await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to clear cart';
      return rejectWithValue(message);
    }
  }
);

const getStorageKey = (userId: string | null) => `cart_${userId || 'guest'}`;

const initialState: CartState = {
  items: [],
  total: 0,
  userId: null,
};

// Initialize from localStorage for guest on startup
const savedGuestCart = localStorage.getItem(getStorageKey(null));
if (savedGuestCart) {
  const parsed = JSON.parse(savedGuestCart);
  initialState.items = parsed.items || [];
  initialState.total = parsed.total || 0;
}

const saveCartToLocalStorage = (state: CartState) => {
  const key = getStorageKey(state.userId);
  const { items, total } = state;
  localStorage.setItem(key, JSON.stringify({ items, total }));
};

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    switchIdentity: (state, action: PayloadAction<string | null>) => {
      // 1. Save current state before switching
      saveCartToLocalStorage(state);

      // 2. Switch identity
      state.userId = action.payload;

      // 3. Load state for new identity
      const saved = localStorage.getItem(getStorageKey(action.payload));
      if (saved) {
        const parsed = JSON.parse(saved);
        state.items = parsed.items || [];
        state.total = parsed.total || 0;
      } else {
        state.items = [];
        state.total = 0;
      }
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }

      state.total = calculateTotal(state.items);
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCartToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.map((item: CartItemResponse) => ({
          ...item.productId,
          id: item.productId._id || item.productId.id,
          name: item.productId.title || item.productId.name,
          _id: item.productId._id, // Add Mongoose ID explicitly
          _dbId: item._id, // Cart item ID
          quantity: item.quantity,
        }));
        state.total = calculateTotal(state.items);
        saveCartToLocalStorage(state);
      })
      .addCase(addToCartDB.fulfilled, (state, action) => {
        const product = action.payload.productId;
        const newItem = {
          ...product,
          id: product._id || product.id,
          name: product.title || product.name,
          _id: product._id,
          _dbId: action.payload._id,
          quantity: action.payload.quantity,
        };
        const existingIndex = state.items.findIndex(i => i.id === newItem.id);
        if (existingIndex > -1) {
          state.items[existingIndex] = newItem;
        } else {
          state.items.push(newItem);
        }
        state.total = calculateTotal(state.items);
        saveCartToLocalStorage(state);
      })
      .addCase(updateQuantityDB.fulfilled, (state, action) => {
        const item = state.items.find(i => (i as { _dbId?: string })._dbId === action.payload._id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
        state.total = calculateTotal(state.items);
        saveCartToLocalStorage(state);
      })
      .addCase(removeFromCartDB.fulfilled, (state, action) => {
        state.items = state.items.filter(i => (i as { _dbId?: string })._dbId !== action.payload);
        state.total = calculateTotal(state.items);
        saveCartToLocalStorage(state);
      })
      .addCase(clearCartDB.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
        saveCartToLocalStorage(state);
      });
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, switchIdentity } =
  cartSlice.actions;
export default cartSlice.reducer;
