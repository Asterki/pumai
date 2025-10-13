import { configureStore } from "@reduxjs/toolkit";

// Import reducers
// import StatsFeature from "./features/stats";

export const store = configureStore({
  reducer: {
    // stats: StatsFeature.slice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
