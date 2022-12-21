import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SaveState {
	isSave: boolean | string;
}

const initialState: SaveState = {
	isSave: true,
};

export const equipmentSaveSlice = createSlice({
	name: 'EQUIPMENT_SAVE',
	initialState,
	reducers: {
	    equipmentOnSave: (state) => {
				state.isSave = true;
				if(state.isSave === undefined) return
			//    localStorage.setItem("equipmentIsSave", state.isSave.toString());
		  },
		  equipmentOffSave: (state) => {
				state.isSave=false;	
				if(state.isSave === undefined) return;
			//   localStorage.setItem("equipmentIsSave", state.isSave.toString());
		  },
		}
});


export const { equipmentOnSave, equipmentOffSave } = equipmentSaveSlice.actions;

export default equipmentSaveSlice;
