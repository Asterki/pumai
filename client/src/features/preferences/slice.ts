import { WritableDraft } from "immer";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import PreferencesFeature from ".";
import { IPreferences } from "./types";

export interface PreferencesState {
  status: "loading" | "succeeded" | "failed";
  preferences?: IPreferences;
}

const initialState: PreferencesState = {
  status: "loading",
};

// Define thunks
export const fetchPreferences = createAsyncThunk(
  "preferences/fetchPreferences",
  async (_, thunkAPI) => {
    const result: IPreferences =
      await PreferencesFeature.storage.getPreferences();

    return {
      status: "succeeded",
      preferences: result,
    };
  },
);

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    getPreferences: (state) => {
      return state;
    },
    setPreferences: (
      state: WritableDraft<PreferencesState>,
      action: PayloadAction<IPreferences>,
    ) => {
      state.preferences = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get cases
      .addCase(fetchPreferences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.status = action.payload.status as PreferencesState["status"];
        state.preferences = action.payload.preferences;
      })
      .addCase(fetchPreferences.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default preferencesSlice;
