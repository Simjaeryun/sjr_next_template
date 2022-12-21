import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SaveState {
	isSave: boolean | string;
}

const initialState: SaveState = {
	isSave: false,
};

export const bomSaveSlice = createSlice({
	name: "BOM_SAVE",
	initialState,
	reducers: {
		onSave: (state) => {
			state.isSave = true;
		},
		offSave: (state) => {
			state.isSave = false;
		},
	},
});

export const { onSave, offSave } = bomSaveSlice.actions;

export default bomSaveSlice;
