import { ApiUrl } from "./ApiUrl";
import instance from "@apis/_axios/instance";
import { AxiosInstance } from "axios";
import { useRouter } from "next/router";

export class ProjectApi {
	axios: AxiosInstance = instance;
	constructor(axios?: AxiosInstance) {
		if (axios) this.axios = axios;
	}

	async getAllList(uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url: ApiUrl.baseUrl + ApiUrl.PROJECT_GET_LIST.replace("{uid}", uid),
		}).catch((e) => {
			//로그인이 없다고 생각하고 페이지 이동
			//alert("Empty Login info!")
			localStorage.setItem("token-error", "");
			location.href = ApiUrl.getPath("/login");
			return { data: [] };
		});

		return data.data;
	}

	async getAllListPositionYn(param: any, uid: string): Promise<any[]> {
		console.log("@@@@issue = ", param);
		const { data } = await this.axios({
			method: "GET",
			url: ApiUrl.baseUrl + ApiUrl.PROJECT_GET_LIST.replace("{uid}", uid),
			params: {
				positionCheck: param.positionCheck,
			},
			timeout: 700000,
		});
		return data.data;
	}

	async getList(pid: string, uid: string, marid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.PROJECT_GET_PID.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid),
		});
		return data.data;
	}

	async getUserList(uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url: ApiUrl.baseUrl + ApiUrl.PROJECT_GET_LIST.replace("{uid}", uid),
		});
		return data.data;
	}

	async postProject(param: any, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "POST",
			url: ApiUrl.baseUrl + ApiUrl.PROJECT_POST_SAVE.replace("{uid}", uid),
			data: param,
			timeout: 700000,
		});
		return data;
	}

	async putProject(param: any, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "PUT",
			url: ApiUrl.baseUrl + ApiUrl.PROJECT_PUT_SAVE.replace("{uid}", uid),
			data: param,
			timeout: 700000,
		});
		return data;
	}

	async deleteProject(uid: string, param: any): Promise<any[]> {
		const { data } = await this.axios({
			method: "DELETE",
			url: ApiUrl.baseUrl + ApiUrl.PROJECT_POST_DELETE.replace("{uid}", uid),
			data: param,
			timeout: 700000,
		});
		return data;
	}
}

const ApiActProject = new ProjectApi();

export default ApiActProject;
