import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlanningData {
  storeId: string;
  skuId: string;
  week: string;
  salesUnits: number;
}

const initialState: PlanningData[] = [];

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    updateSalesUnits: (state, action: PayloadAction<PlanningData>) => {
      const index = state.findIndex(
        (entry) =>
          entry.storeId === action.payload.storeId &&
          entry.skuId === action.payload.skuId &&
          entry.week === action.payload.week
      );
      if (index !== -1) {
        state[index].salesUnits = action.payload.salesUnits;
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;
