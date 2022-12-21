// historyStore.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// state 타입 지정
const initialState: any = {
	bomSpecInput: true,
};

const bomSpecInput = createSlice({
	name: "bomSpecInput", // 액션타입의 이름이 중복되는것을 막기위한 네임값
	initialState, // 리듀서에서 사용되는 initialState
	reducers: {
		// 리듀서
		setBomSpecInput(state, action: any) {
			state.bomSpecInput = action.payload; // immer가 내장 되어있어 알아서 불변성을 지켜준다.
		},
	},
});

export default bomSpecInput;
export const { setBomSpecInput } = bomSpecInput.actions;
