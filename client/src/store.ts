import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import StatusFeature from "./features/status";
import PreferencesFeature from "./features/preferences";

export const store = configureStore({
  reducer: {
    status: StatusFeature.slice.reducer,
    preferences: PreferencesFeature.slice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
