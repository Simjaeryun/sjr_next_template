import projectAuthSlice from "./Auth/projectAuth";
import bomDeleteLoad from "./BomDataToggle/bomDeleteLoad";
import bomSpecInput from "./BomDataToggle/bomSpecInput";
import bomWbsDetail from "./BomDataToggle/bomWbsDetail";
import calculationDeleteLoad from "./CalculationDataToggle/CalculationDeleteLoad";
import calculationFoamDeleteLoad from "./CalculationDataToggle/CalculationFoamDeleteLoad";
import equipmentDeleteLoad from "./EquipmentDataToggle/EquipmentDeleteLoad";
import dataLoading from "./Loading/Loading";
import bomSaveSlice from "./Save/bomSaveSlice";
import { calculationSaveSlice } from "./Save/calculationSaveSlice";
import { equipmentSaveSlice } from "./Save/equipmentSaveSlice";
import saveSlice from "./Save/saveSlice";
import eventMessage from "./Sse/EventMessage";
import isNotice from "./Sse/IsNotice";
import messageOpen from "./Sse/MessageOpen";
//새로추가
import equipmentDataSlice from "@features//Equipment/equipmentData";
import equipmentHeaderSlice from "@features//Equipment/equipmentHeader";
import equipmentMaridSlice from "@features//Equipment/equipmentMarid";
import equipmentPidSlice from "@features//Equipment/equipmentPid";
import equipmentRevisionSlice from "@features//Equipment/equipmentRevision";
import equipmentRevisionNameSlice from "@features//Equipment/equipmentRevisionName";
import counterSlice from "@features/Count/counterSlice";
import optionSlice from "@features/Option/optionSlice";
import userSlice from "@features/User/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: [
		"equipmentMarid",
		"equipmentData",
		"equipmentHeader",
		"equipmentPid",
		"equipmentRevision",
		"equipmentRevisionName",
	],
};

const rootReducer = combineReducers({
	[counterSlice.name]: counterSlice.reducer,
	[optionSlice.name]: optionSlice.reducer,
	[saveSlice.name]: saveSlice.reducer,
	[equipmentSaveSlice.name]: equipmentSaveSlice.reducer,
	[calculationSaveSlice.name]: calculationSaveSlice.reducer,
	[userSlice.name]: userSlice.reducer,
	[equipmentHeaderSlice.name]: equipmentHeaderSlice.reducer,
	[equipmentDataSlice.name]: equipmentDataSlice.reducer,
	[equipmentPidSlice.name]: equipmentPidSlice.reducer,
	[equipmentMaridSlice.name]: equipmentMaridSlice.reducer,
	[equipmentRevisionSlice.name]: equipmentRevisionSlice.reducer,
	[equipmentRevisionNameSlice.name]: equipmentRevisionNameSlice.reducer,
	[projectAuthSlice.name]: projectAuthSlice.reducer,
	[dataLoading.name]: dataLoading.reducer,
	[isNotice.name]: isNotice.reducer,
	[messageOpen.name]: messageOpen.reducer,
	[eventMessage.name]: eventMessage.reducer,
	[bomDeleteLoad.name]: bomDeleteLoad.reducer,
	[bomSpecInput.name]: bomSpecInput.reducer,
	[bomWbsDetail.name]: bomWbsDetail.reducer,
	[calculationDeleteLoad.name]: calculationDeleteLoad.reducer,
	[calculationFoamDeleteLoad.name]: calculationFoamDeleteLoad.reducer,
	[equipmentDeleteLoad.name]: equipmentDeleteLoad.reducer,
	[bomSaveSlice.name]: bomSaveSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
