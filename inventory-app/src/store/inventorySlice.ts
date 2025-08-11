import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InventoryState = {
  productIdToStock: Record<number, number>;
};

const initialState: InventoryState = {
  productIdToStock: {},
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    initializeStockFromProducts(state, action: PayloadAction<{ id: number; stock?: number }[]>) {
      for (const p of action.payload) {
        if (state.productIdToStock[p.id] === undefined) {
          state.productIdToStock[p.id] = p.stock ?? 0;
        }
      }
    },
    setStock(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      state.productIdToStock[action.payload.productId] = Math.max(0, action.payload.quantity);
    },
    incrementStock(state, action: PayloadAction<{ productId: number; by?: number }>) {
      const by = action.payload.by ?? 1;
      const current = state.productIdToStock[action.payload.productId] ?? 0;
      state.productIdToStock[action.payload.productId] = current + by;
    },
    decrementStock(state, action: PayloadAction<{ productId: number; by?: number }>) {
      const by = action.payload.by ?? 1;
      const current = state.productIdToStock[action.payload.productId] ?? 0;
      state.productIdToStock[action.payload.productId] = Math.max(0, current - by);
    },
    resetInventory(state) {
      state.productIdToStock = {};
    },
  },
});

export const { initializeStockFromProducts, setStock, incrementStock, decrementStock, resetInventory } = inventorySlice.actions;
export default inventorySlice.reducer;