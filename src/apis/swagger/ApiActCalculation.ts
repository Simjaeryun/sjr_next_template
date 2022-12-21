import { ApiUrl } from "./ApiUrl";
import "./Calculation.type";
import { DBNotJsonField, DBCalculationState } from "./DatabaseDefine";
import instance from "@apis/_axios/instance";
import currentDate from "@components/common/CurrentDate";
import { AxiosInstance } from "axios";
import _ from "lodash";
import moment from "moment";

export class CalculationApi {
	axios: AxiosInstance = instance;
	constructor(axios?: AxiosInstance) {
		if (axios) this.axios = axios;
	}

	async getExportData(
		pid: string,
		uid: string,
		marid: string,
		protection_method: string,
		project_no: string
	) {
		const url =
			ApiUrl.baseUrl +
			ApiUrl.CALCULATION_GET_EXPORT.replace("{pid}", pid)
				.replace("{uid}", uid)
				.replace("{marid}", marid)
				.replace(
					"{protection_method}",
					protection_method === "water" ? "waterspray" : ""
				);

		this.axios({
			responseType: "blob",
			method: "GET",
			url,
		}).then((response) => {
			const blob = new Blob([response.data]);

			const link = document.createElement("a");
			const dateString = currentDate();
			link.href = window.URL.createObjectURL(blob);
			link.download = `${project_no}_BOM_Datasheet_${dateString}.xlsx`;
			link.click();
		});
	}

	async getListPid(pid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url: ApiUrl.baseUrl + ApiUrl.CALCULATION_GET_PID,
			params: { pid },
		});
		return data;
	}
	async getListMarid(pid: string, uid: string, marid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.CALCULATION_GET_MARID_WATER.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid),
		});
		return data.data;
	}

	async getListMaridDelyn(param: any): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.CALCULATION_GET_MARID_WATER.replace("{pid}", param.pid)
					.replace("{uid}", param.uid)
					.replace("{marid}", param.marid),
			params: {
				del_check: param.del_check,
			},
			timeout: 700000,
		});
		return data.data;
	}

	async load(pid: string, uid: string, marid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.CALCULATION_WATERSPRAY_GET_LOAD.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid),
		});
		return data.data;
	}

	async delete(pid: string, marid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url: ApiUrl.baseUrl + ApiUrl.CALCULATION_GET_MARID,
			params: { pid, marid },
		});
		return data;
	}

	async save(param: any): Promise<any[]> {
		console.log("@@@@save = ", param);
		const { data } = await this.axios({
			method: "POST",
			url: ApiUrl.baseUrl + ApiUrl.CALCULATION_POST_SAVE_WATER,
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
				ApiUrl.baseUrl +
				ApiUrl.CALCULATION_POST_ISSUE_WATER.replace("{pid}", param.pid),
			params: {
				description: param.description,
				revision_name: param.revision_name,
				uid: param.uid,
			},
		});
		return data;
	}

	async getHistory(
		pid: string,
		uid: string,
		marid: string,
		calc_id: string
	): Promise<any> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.CALCULATION_GET_HISTORY.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid)
					.replace("{calc_id}", calc_id),
		});
		return data;
	}

	bindData(data: any) {
		return _.sortBy(data, (e: any) => {
			return Number(e.data_order);
		}).map((e: any, i: number) => {
			let r: any = JSON.parse(e.json_data ?? "{}");
			r.no = i + 1;
			DBNotJsonField.map((v) => {
				if (e[v]) {
					r = { ...r, [v]: e[v] };
				}
			});

			r.status =
				DBCalculationState.find((stats) => stats.code == r.cd_status)?.type ??
				r.cd_status;
			r.rev_reg_dt = moment.unix(r.rev_reg_dt).format("YYYY.MM.DD HH:mm");
			//r._editCol = Object.keys(JSON.parse(e.change_data) ?? []);

			r.highlightKeyList = e.highlightKeyList ?? [];
			r._editCol = e.highlightKeyList ?? [];
			return r;
		});
	}

	async getListCompare(
		pid: string,
		uid: string,
		marid: string,
		marid_sub: string
	): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.CALCULATION_GET_LIST_COMPARE_WATER.replace("{pid}", pid).replace(
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
}

const ApiActCalculation = new CalculationApi();

export default ApiActCalculation;
