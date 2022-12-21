import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SaveState {
	isSave: boolean | string;
}

const initialState: SaveState = {
	isSave: false,
};

export const calculationSaveSlice = createSlice({
	name: 'CALCULATION_SAVE',
	initialState,
	reducers: {
		onSave: state => {
			state.isSave = true;
		},
		offSave: state => {
			state.isSave = false;
		},

	},
});

export const { onSave, offSave } = calculationSaveSlice.actions;

export default calculationSaveSlice;
