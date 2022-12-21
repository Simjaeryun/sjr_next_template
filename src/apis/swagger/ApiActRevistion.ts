import { ApiUrl } from "./ApiUrl";
import instance from "@apis/_axios/instance";
import { AxiosInstance } from "axios";

interface saveProps {
	cd_revision: number;
	del_yn: string;
	description: string;
	marid: number;
	pid: string;
	reg_dt: number;
	revision_name: string;
	revision_no: number;
	uid: string;
}

export class RevistionApi {
	axios: AxiosInstance = instance;
	constructor(axios?: AxiosInstance) {
		if (axios) this.axios = axios;
	}

	async getList(uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url: ApiUrl.baseUrl + ApiUrl.REVISION_GET_UID.replace("{uid}", uid),
		});

		return data.data;
	}

	async getCalculationFoamList(pid: string, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.REVISION_FOAM_LIST.replace("{pid}", pid).replace("{uid}", uid),
		});
		return data.data;
	}

	async getCalculationFoamListBom(param: any): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.REVISION_FOAM_LIST.replace("{pid}", param.pid).replace(
					"{uid}",
					param.uid
				),
			params: {
				bom_load: param.bom_load,
			},
		});

		return data.data;
	}

	async getCalculationList(pid: string, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.REVISION_WATER_LIST.replace("{pid}", pid).replace("{uid}", uid),
		});
		return data.data;
	}
	async getCalculationListBom(param: any): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.REVISION_WATER_LIST.replace("{pid}", param.pid).replace(
					"{uid}",
					param.uid
				),
			params: {
				bom_load: param.bom_load,
			},
		});
		return data.data;
	}

	async getEquipmentList(pid: string, uid: string): Promise<any> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.REVISION_EQUIPMENT_LIST.replace("{pid}", pid).replace("{uid}", uid),
		});

		return data.data;
	}

	async getEquipmentListCalLoad(param: any): Promise<any> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.REVISION_EQUIPMENT_LIST.replace("{pid}", param.pid).replace(
					"{uid}",
					param.uid
				),
			params: {
				cal_load: param.cal_load,
			},
		});

		return data.data;
	}

	async save(postData: saveProps): Promise<any[]> {
		console.log("save - ", ApiUrl.baseUrl + ApiUrl.REVISION_SAVE, postData);
		const { data } = await this.axios({
			method: "POST",
			url: ApiUrl.baseUrl + ApiUrl.REVISION_SAVE,
			data: postData,
		});

		console.log("save - data ", data);
		return data;
	}
}

const ApiActRevistion = new RevistionApi();

export default ApiActRevistion;
