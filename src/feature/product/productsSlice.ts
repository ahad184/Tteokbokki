import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  weight?: string; // optional if some products don't have it
  tags?: string[]; // optional
  createdAt?: string; // optional, e.g., ISO date string
}

interface BackendProduct extends Omit<Product, 'id' | 'name'> {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    priceRange: [number, number];
    searchQuery: string;
  };
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    searchQuery: '',
  },
};


const API_URL = `${API_BASE_URL}/api/products`;

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data.map((p: BackendProduct) => ({
        ...p,
        id: (p._id || p.id) as string,
        name: (p.name || p.title) as string,
      } as Product));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch products';
      return rejectWithValue(message);
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      const p: BackendProduct = response.data;
      return {
        ...p,
        id: (p._id || p.id) as string,
        name: (p.name || p.title) as string,
      } as Product;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch product details';
      return rejectWithValue(message);
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        category: 'all',
        priceRange: [0, 1000],
        searchQuery: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.selectedProduct = action.payload;
        },
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategory, setPriceRange, setSearchQuery, clearFilters } =
  productSlice.actions;
export default productSlice.reducer;
