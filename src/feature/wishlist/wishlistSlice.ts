import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const API_URL = `${API_BASE_URL}/api/wishlist`;

interface WishlistItemResponse {
  _id: string;
  productId: Product & { _id?: string; title?: string };
}

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch wishlist';
      return rejectWithValue(message);
    }
  }
);

export const addToWishlistDB = createAsyncThunk(
  'wishlist/addToWishlistDB',
  async ({ product, token }: { product: Product; token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_URL,
        { productId: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { ...response.data, productId: product };
    } catch (error: unknown) {
      console.error("Add to wishlist DB error:", error);
      const message = error instanceof Error ? error.message : 'Failed to add to wishlist';
      return rejectWithValue(message);
    }
  }
);

export const removeFromWishlistDB = createAsyncThunk(
  'wishlist/removeFromWishlistDB',
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to remove from wishlist';
      return rejectWithValue(message);
    }
  }
);

interface WishlistState {
  items: Product[];
  loading: boolean;
  error: string | null;
  userId: string | null;
}

const getStorageKey = (userId: string | null) => `wishlist_${userId || 'guest'}`;

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
  userId: null,
};

// Initialize from localStorage for guest on startup
const savedGuestWishlist = localStorage.getItem(getStorageKey(null));
if (savedGuestWishlist) {
  const parsed = JSON.parse(savedGuestWishlist);
  initialState.items = parsed.items || [];
}

const saveWishlistToLocalStorage = (state: WishlistState) => {
  const key = getStorageKey(state.userId);
  const { items } = state;
  localStorage.setItem(key, JSON.stringify({ items }));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    switchIdentity: (state, action: PayloadAction<string | null>) => {
      // 1. Save current state before switching
      saveWishlistToLocalStorage(state);

      // 2. Switch identity
      state.userId = action.payload;

      // 3. Load state for new identity
      const saved = localStorage.getItem(getStorageKey(action.payload));
      if (saved) {
        const parsed = JSON.parse(saved);
        state.items = parsed.items || [];
      } else {
        state.items = [];
      }
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToLocalStorage(state);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToLocalStorage(state);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToLocalStorage(state);
    },
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
      saveWishlistToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map((item: WishlistItemResponse) => ({
          ...item.productId,
          id: item.productId._id || item.productId.id,
          name: item.productId.title || item.productId.name,
          _dbId: item._id,
        }));
        saveWishlistToLocalStorage(state);
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToWishlistDB.fulfilled, (state, action) => {
        const product = action.payload.productId;
        const newItem = {
          ...product,
          id: product._id || product.id,
          name: product.title || product.name,
          _dbId: action.payload._id,
        };
        if (!state.items.find(i => i.id === newItem.id)) {
          state.items.push(newItem);
        }
        saveWishlistToLocalStorage(state);
      })
      .addCase(removeFromWishlistDB.fulfilled, (state, action) => {
        state.items = state.items.filter(i => (i as { _dbId?: string })._dbId !== action.payload);
        saveWishlistToLocalStorage(state);
      });
  }
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
  switchIdentity,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
