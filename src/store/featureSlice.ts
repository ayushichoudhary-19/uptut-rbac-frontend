import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FeatureState {
  featureIds: string[];
}

const initialState: FeatureState = {
  featureIds: [],
};

export const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    setFeatures: (state, action: PayloadAction<string[]>) => {
      state.featureIds = action.payload;
    },
  },
});

export const { setFeatures } = featureSlice.actions;
export default featureSlice.reducer;
