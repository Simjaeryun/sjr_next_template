import saveSlice from './Save/saveSlice';
import counterSlice from '@features/Count/counterSlice';
import optionSlice from '@features/Option/optionSlice';
import { configureStore } from '@reduxjs/toolkit';

export function makeStore() {
	return configureStore({
		reducer: {
			[counterSlice.name]: counterSlice.reducer,
			[optionSlice.name]: optionSlice.reducer,
			[saveSlice.name]: saveSlice.reducer,
		},
	});
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
