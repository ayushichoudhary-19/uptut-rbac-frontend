import { configureStore } from "@reduxjs/toolkit";
import { featureReducer } from "..";
import allFeaturesReducer from "./allFeaturesSlice";

export const store = configureStore({
  reducer: {
    features: featureReducer,
    allFeatures: allFeaturesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
