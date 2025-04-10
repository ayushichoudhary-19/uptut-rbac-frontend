import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AllFeaturesState {
  allFeatures: { id: string; name: string; category?: string }[];
}

const initialState: AllFeaturesState = {
  allFeatures: [],
};

export const allFeaturesSlice = createSlice({
  name: "allFeatures",
  initialState,
  reducers: {
    setAllFeatures: (state, action: PayloadAction<AllFeaturesState["allFeatures"]>) => {
      state.allFeatures = action.payload;
    },
  },
});

export const { setAllFeatures } = allFeaturesSlice.actions;
export default allFeaturesSlice.reducer;
