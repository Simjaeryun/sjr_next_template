import { ApiUrl } from "./ApiUrl";
import instance from "@apis/_axios/instance";
import { AxiosInstance } from "axios";

export class AdminApi {
	axios: AxiosInstance = instance;
	constructor(axios?: AxiosInstance) {
		if (axios) this.axios = axios;
	}

	async getInfo(uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url: ApiUrl.baseUrl + ApiUrl.USER_INFO_GET.replace("{uid}", uid),
		});
		return data.data;
	}

	async getLoginUserInfo(uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url: ApiUrl.baseUrl + ApiUrl.USER_INFO_GET.replace("{uid}", uid),
		});
		return data.data;
	}

	async getEventMessage(uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url: ApiUrl.baseUrl + ApiUrl.USER_EVENT_MESSAGE.replace("{uid}", uid),
		});
		return data.data;
	}

	async postInfo(param: any, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "POST",
			url: ApiUrl.baseUrl + ApiUrl.USER_INFO_POST.replace("{uid}", uid),
			data: param,
			timeout: 700000,
		});
		return data;
	}

	async deleteInfo(param: any, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "DELETE",
			url: ApiUrl.baseUrl + ApiUrl.USER_INFO_DELETE.replace("{uid}", uid),
			data: param,
			timeout: 700000,
		});
		return data;
	}

	async putInfo(param: any, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "PUT",
			url: ApiUrl.baseUrl + ApiUrl.USER_INFO_PUT.replace("{uid}", uid),
			data: param,
			timeout: 700000,
		});
		return data;
	}
}

const ApiActAdmin = new AdminApi();

export default ApiActAdmin;
