import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

// Mock products data
const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Apple',
    description: 'Crisp and sweet apples.',
    price: 2.5,
    image: '/images/apple.png',
    category: 'Fruit',
    rating: 4.5,
    stock: 120,
    weight: '100g Pack',
    tags: ['Fruits'],
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'p2',
    name: 'Banana Bunch',
    description: 'Ripe bananas full of energy.',
    price: 1.8,
    image: '/images/banana.png',
    category: 'Fruit',
    rating: 4.7,
    stock: 90,
    weight: '150g Pack',
    tags: ['Fruits'],
    createdAt: '2026-02-10T11:00:00Z',
  },
  {
    id: 'p3',
    name: 'Broccoli',
    description: 'Fresh green broccoli.',
    price: 3.2,
    image: '/images/broccoli.png',
    category: 'Vegetable',
    rating: 4.3,
    stock: 60,
    weight: '100g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p4',
    name: 'Carrot',
    description: 'Organic carrots for healthy eating.',
    price: 2.0,
    image: '/images/carrot.png',
    category: 'Vegetable',
    rating: 4.6,
    stock: 80,
    weight: '50g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p5',
    name: 'Chicken Breast',
    description: 'Fresh boneless chicken breast.',
    price: 7.5,
    image: '/images/chicken.png',
    category: 'Meat',
    rating: 4.8,
    stock: 40,
    weight: '150g Pack',
  },
  {
    id: 'p6',
    name: 'Beef Steak',
    description: 'Premium quality beef steak.',
    price: 12.0,
    image: '/images/beef.png',
    category: 'Meat',
    rating: 4.9,
    stock: 35,
    weight: '150g Pack',
  },
  {
    id: 'p7',
    name: 'Milk 1L',
    description: 'Fresh cow milk 1 liter.',
    price: 1.5,
    image: '/images/milk.png',
    category: 'Drink',
    rating: 4.4,
    stock: 100,
    weight: '100g Pack',
    tags: ['Tea Fruits'],
  },
  {
    id: 'p8',
    name: 'Orange Juice',
    description: '100% pure orange juice.',
    price: 3.0,
    image: '/images/orange-juice.png',
    category: 'Drink',
    rating: 4.2,
    stock: 70,
    weight: '150g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p9',
    name: 'Spinach',
    description: 'Fresh green spinach leaves.',
    price: 2.2,
    image: '/images/spinach.png',
    category: 'Vegetable',
    rating: 4.1,
    stock: 50,
    weight: '50g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p10',
    name: 'Tomato',
    description: 'Juicy red tomatoes.',
    price: 2.5,
    image: '/images/tomato.png',
    category: 'Vegetable',
    rating: 4.6,
    stock: 90,
    weight: '100g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p11',
    name: 'Green Tea',
    description: 'Refreshing green tea leaves.',
    price: 4.5,
    image: '/images/green-tea.png',
    category: 'Drink',
    rating: 4.8,
    stock: 120,
    weight: '50g Pack',
    tags: ['Tea Fruits'],
  },
  {
    id: 'p12',
    name: 'Strawberry Pack',
    description: 'Fresh strawberries.',
    price: 5.0,
    image: '/images/strawberry.png',
    category: 'Fruit',
    rating: 4.9,
    stock: 60,
    weight: '100g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p13',
    name: 'Almond Milk',
    description: 'Healthy almond milk.',
    price: 3.8,
    image: '/images/almond-milk.png',
    category: 'Drink',
    rating: 4.5,
    stock: 75,
    weight: '100g Pack',
    tags: ['Milk & Drinks'],
  },
  {
    id: 'p14',
    name: 'Cheddar Cheese',
    description: 'Rich and creamy cheddar cheese.',
    price: 6.0,
    image: '/images/cheese.png',
    category: 'Diary & Milk',
    rating: 4.7,
    stock: 50,
    weight: '150g Pack',
    tags: ['Milk & Drinks'],
  },
  {
    id: 'p15',
    name: 'Potato',
    description: 'Fresh farm potatoes.',
    price: 1.5,
    image: '/images/potato.png',
    category: 'Vegetable',
    rating: 4.2,
    stock: 200,
    weight: '100g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p16',
    name: 'Cucumber',
    description: 'Crisp green cucumber.',
    price: 1.8,
    image: '/images/cucumber.png',
    category: 'Vegetable',
    rating: 4.3,
    stock: 110,
    weight: '50g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p17',
    name: 'Pork Chop',
    description: 'Tender pork chop.',
    price: 10.5,
    image: '/images/pork.png',
    category: 'Meat',
    rating: 4.7,
    stock: 30,
    weight: '150g Pack',
  },
  {
    id: 'p18',
    name: 'Yogurt',
    description: 'Creamy yogurt for breakfast.',
    price: 2.2,
    image: '/images/yogurt.png',
    category: 'Diary & Milk',
    rating: 4.5,
    stock: 90,
    weight: '100g Pack',
    tags: ['Milk & Drinks'],
  },
  {
    id: 'p19',
    name: 'Lettuce',
    description: 'Fresh green lettuce.',
    price: 1.9,
    image: '/images/lettuce.png',
    category: 'Vegetable',
    rating: 4.4,
    stock: 70,
    weight: '50g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p20',
    name: 'Mango Pack',
    description: 'Sweet mangoes.',
    price: 4.5,
    image: '/images/mango.png',
    category: 'Fruit',
    rating: 4.8,
    stock: 50,
    weight: '150g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p21',
    name: 'Black Tea',
    description: 'Strong black tea.',
    price: 3.5,
    image: '/images/black-tea.png',
    category: 'Drink',
    rating: 4.6,
    stock: 100,
    weight: '50g Pack',
    tags: ['Tea Fruits'],
  },
  {
    id: 'p22',
    name: 'Watermelon Slice',
    description: 'Juicy watermelon.',
    price: 5.0,
    image: '/images/watermelon.png',
    category: 'Fruit',
    rating: 4.7,
    stock: 40,
    weight: '150g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p23',
    name: 'Pineapple',
    description: 'Fresh tropical pineapple.',
    price: 3.8,
    image: '/images/pineapple.png',
    category: 'Fruit',
    rating: 4.5,
    stock: 60,
    weight: '100g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p24',
    name: 'Red Pepper',
    description: 'Spicy red pepper.',
    price: 2.0,
    image: '/images/red-pepper.png',
    category: 'Vegetable',
    rating: 4.3,
    stock: 80,
    weight: '50g Pack',
    tags: ['Vegetables', 'Snack & Spice'],
  },
  {
    id: 'p25',
    name: 'Ginger',
    description: 'Fresh ginger root.',
    price: 3.0,
    image: '/images/ginger.png',
    category: 'Vegetable',
    rating: 4.6,
    stock: 50,
    weight: '50g Pack',
    tags: ['Vegetables', 'Snack & Spice'],
  },
  {
    id: 'p26',
    name: 'Orange',
    description: 'Juicy oranges for breakfast.',
    price: 2.5,
    image: '/images/orange.png',
    category: 'Fruit',
    rating: 4.7,
    stock: 90,
    weight: '100g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p27',
    name: 'Milk Chocolate',
    description: 'Sweet milk chocolate bars.',
    price: 1.8,
    image: '/images/chocolate.png',
    category: 'Snack & Spice',
    rating: 4.8,
    stock: 150,
    weight: '50g Pack',
    tags: ['Snack & Spice'],
  },
  {
    id: 'p28',
    name: 'Almonds',
    description: 'Crunchy almonds for snacks.',
    price: 5.0,
    image: '/images/almonds.png',
    category: 'Snack & Spice',
    rating: 4.9,
    stock: 80,
    weight: '100g Pack',
    tags: ['Snack & Spice'],
  },
  {
    id: 'p29',
    name: 'Cabbage',
    description: 'Fresh green cabbage.',
    price: 1.7,
    image: '/images/cabbage.png',
    category: 'Vegetable',
    rating: 4.2,
    stock: 70,
    weight: '100g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p30',
    name: 'Pasta',
    description: 'Italian pasta for cooking.',
    price: 2.5,
    image: '/images/pasta.png',
    category: 'Snack & Spice',
    rating: 4.5,
    stock: 120,
    weight: '150g Pack',
    tags: ['Snack & Spice'],
  },
];
// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockProducts;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const product = mockProducts.find((p) => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      return rejectWithValue('Failed to fetch product details');
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
