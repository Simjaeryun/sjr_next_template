import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserSlice {
	pid: string;
	pid_name: string;
	project_no: string;
	uid: string;
	email: string;
	name: string;
	role: string;
	project_list: any;
	cd_usr_group: string;
}

const initialState: UserSlice = {
	pid: "",
	pid_name: "",
	project_no: "",
	uid: "",
	email: "",
	name: "",
	role: "",
	project_list: [],
	cd_usr_group: "",
};

export const userSlice = createSlice({
	name: "USER",
	initialState,
	reducers: {
		setUserInfo: (
			state,
			action: PayloadAction<{
				uid: string;
				email: string;
				name: string;
				role: string;
				project_list: any;
				cd_usr_group: string;
			}>
		) => {
			state.uid = action.payload.uid;
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.role = action.payload.role;
			state.project_list = action.payload.project_list;
			state.cd_usr_group = action.payload.cd_usr_group;
		},

		setProjectData: (
			state,
			action: PayloadAction<{ pid: string; pid_name: string; project_no: string }>
		) => {
			if (action.payload.pid) {
				localStorage.setItem("pid", action.payload.pid);
				state.pid = action.payload.pid;
			}
			if (action.payload.pid_name) {
				state.pid_name = action.payload.pid_name;
			}
			if (action.payload.project_no) {
				state.project_no = action.payload.project_no;
			}
		},
		setSelectProject: (state, action: PayloadAction<string>) => {
			localStorage.setItem("pid", action.payload);
			state.pid = action.payload;
		},
		setTempUserUid: (state, action: PayloadAction<string>) => {
			//localStorage.setItem("uid", action.payload);
			state.uid = action.payload;
		},
		getUserInfo: (state) => {
			return {
				pid: state.pid,
				pid_name: state.pid_name,
				project_no: state.project_no,
				uid: state.pid,
				email: state.email,
				name: state.name,
				role: state.role,
				project_list: state.project_list,
				cd_usr_group: state.cd_usr_group,
			};
		},
	},
});

export const {
	setUserInfo,
	setProjectData,
	getUserInfo,
	setSelectProject,
	setTempUserUid,
} = userSlice.actions;

export default userSlice;
