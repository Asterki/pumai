import { WritableDraft } from "immer";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import statsApi from "./api";

export interface StatsState {
	status: "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: StatsState = {
	status: "loading",
	error: null,
};

// Define thunks
export const getConnectionStatus = createAsyncThunk(
	"stats/getConnectionStatus",
	async (_, thunkAPI) => {
		const result = await statsApi.ping({});

		if (result.status == "success") {
			return "succeeded";
		} else {
			return thunkAPI.rejectWithValue(result.status);
		}
	},
);

export const statsSlice = createSlice({
	name: "stats",
	initialState,
	reducers: {
		getConnectionToServer: (state) => {
			return state;
		},
		setConnectionToServer: (
			state,
			action: PayloadAction<StatsState["status"]>,
		) => {
			state.status = action.payload as WritableDraft<StatsState["status"]>;
		},
	},
	extraReducers: (builder) => {
		builder
			// Get cases
			.addCase(getConnectionStatus.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(getConnectionStatus.fulfilled, (state, action) => {
				state.status = action.payload as WritableDraft<StatsState["status"]>;
				state.error = null;
			})
			.addCase(getConnectionStatus.rejected, (state, action) => {
				state.status = "failed" as WritableDraft<StatsState["status"]>;
				state.error = action.payload as string;
			});
	},
});

export default statsSlice;
