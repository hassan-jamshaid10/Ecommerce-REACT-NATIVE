import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductsApi, Product } from '../services/api';

export type ProductsState = {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  categories: string[];
};

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  categories: [],
};

export const fetchProducts = createAsyncThunk<Product[]>('products/fetch', async () => {
  return await fetchProductsApi(100);
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.categories = Array.from(new Set(action.payload.map(p => p.category))).sort();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.categories = Array.from(new Set(action.payload.map(p => p.category))).sort();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;