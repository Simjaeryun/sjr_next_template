import { ApiUrl } from "./ApiUrl";
// import "./Calculation.type";
import instance from "@apis/_axios/instance";
import { AxiosInstance } from "axios";

export class EquipmentApi {
	axios: AxiosInstance = instance;
	constructor(axios?: AxiosInstance) {
		if (axios) this.axios = axios;
	}

	async getListCompare(
		pid: string,
		marid: string,
		marid_sub: string,
		uid: string
	): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.EQIUPMENT_GET_LIST_COMPARE.replace("{pid}", pid).replace(
					"{uid}",
					uid
				),
			params: {
				marid,
				marid_sub,
			},
		});
		return data.data;
	}

	async getLoadList(pid: string, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.EQIUPMENT_GET_LOAD_DATA.replace("{pid}", pid).replace("{uid}", uid),
		});
		return data.data;
	}

	async getLoadMessageList(pid: string, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.EQIUPMENT_GET_LOAD_MESSAGE_LIST.replace("{pid}", pid).replace(
					"{uid}",
					uid
				),
		});
		return data.data;
	}

	async getListOfRevision(
		pid: string,
		uid: string,
		marid: string
	): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.EQIUPMENT_GET_LIST_OF_REVISION.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid),
		});
		return data.data;
	}

	async getListMarid(pid: string, marid: string, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.EQIUPMENT_GET_MARID.replace("{pid}", pid)
					.replace("{marid}", marid)
					.replace("{uid}", uid),
		});
		return data.data;
	}

	async getListMaridDelyn(param: any): Promise<any[]> {
		console.log("@@@@issue = ", param);
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.EQIUPMENT_GET_MARID.replace("{pid}", param.pid)
					.replace("{uid}", param.uid)
					.replace("{marid}", param.marid),
			params: {
				del_check: param.del_check,
			},
			timeout: 700000,
		});
		return data.data;
	}

	// async load(pid: string, marid: string): Promise<any[]> {
	//   const { data } = await this.axios({
	//     method: "GET",
	//     url: ApiUrl.baseUrl + ApiUrl.CALCULATION_GET_MARID,
	//     params: { pid, marid },
	//   });
	//   return data;
	// }

	// async delete(pid: string, marid: string): Promise<any[]> {
	//   const { data } = await this.axios({
	//     method: "GET",
	//     url: ApiUrl.baseUrl + ApiUrl.CALCULATION_GET_MARID,
	//     params: { pid, marid },
	//   });
	//   return data;
	// }

	async save(param: any): Promise<any[]> {
		console.log("@@@@save = ", param);
		const { data } = await this.axios({
			method: "POST",
			url: ApiUrl.baseUrl + ApiUrl.EQIUPMENT_POST_SAVE,
			data: param,
			timeout: 700000,
		});
		return data;
	}

	async issue(param: any): Promise<any[]> {
		console.log("@@@@issue = ", param);
		const { data } = await this.axios({
			method: "POST",
			url:
				ApiUrl.baseUrl + ApiUrl.EQIUPMENT_POST_ISSUE.replace("{pid}", param.pid),
			params: {
				description: param.description,
				revision_name: param.revision_name,
				uid: param.uid,
			},
			timeout: 700000,
		});
		return data;
	}

	async getHistory(
		pid: string,
		marid: string,
		equmt_id: string,
		uid: string
	): Promise<any> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.EQIUPMENT_GET_HISTORY.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid)
					.replace("{equmt_id}", equmt_id),
		});
		return data;
	}

	// 사이드 메뉴 트리 리스트 가지고 오기
	async getTreeList(pid: string, marid: string, uid: string): Promise<any> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.EQIUPMENT_GET_TREELIST.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid),
		});
		return data;
	}

	// 사이드 메뉴 트리 선택시 wbs 정보 리스트 가지고 오기
	async getWBS(
		pid: string,
		uid: string,
		marid: string,
		wbs: string,
		depth: string
	): Promise<any> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.EQIUPMENT_GET_WBS.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid)
					.replace("{wbs}", wbs),
			params: {
				depth: depth,
			},
		});
		return data;
	}
}

const ApiActEquipment = new EquipmentApi();

export default ApiActEquipment;
