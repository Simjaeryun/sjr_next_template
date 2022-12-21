// historyStore.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// state 타입 지정
const initialState: any = {
	isNotice: false,
};

const isNotice = createSlice({
	name: "isNotice", // 액션타입의 이름이 중복되는것을 막기위한 네임값
	initialState, // 리듀서에서 사용되는 initialState
	reducers: {
		// 리듀서
		setIsNotice(state, action: any) {
			state.isNotice = action.payload; // immer가 내장 되어있어 알아서 불변성을 지켜준다.
		},
	},
});

export default isNotice;
export const { setIsNotice } = isNotice.actions;
