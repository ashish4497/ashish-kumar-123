import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Store {
  id: string;
  name: string;
}

const initialState: Store[] = [];

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.push(action.payload);
    },
    removeStore: (state, action: PayloadAction<string>) => {
      return state.filter(store => store.id !== action.payload);
    },
  },
});

export const { addStore, removeStore } = storeSlice.actions;
export default storeSlice.reducer;
