import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SKU {
  id: string;
  name: string;
  price: number;
  cost: number;
}

const initialState: SKU[] = [];

const skuSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.push(action.payload);
    },
    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.findIndex(sku => sku.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeSKU: (state, action: PayloadAction<string>) => {
      return state.filter(sku => sku.id !== action.payload);
    },
  },
});

export const { addSKU, updateSKU, removeSKU } = skuSlice.actions;
export default skuSlice.reducer;
