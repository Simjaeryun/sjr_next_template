import { ApiUrl } from "./ApiUrl";
import "./Calculation.type";
import {
	DBNotJsonField,
	DBCalculationState,
	DBNotJsonFieldBom,
} from "./DatabaseDefine";
import instance from "@apis/_axios/instance";
import { AxiosInstance } from "axios";
import { url } from "inspector";
import _ from "lodash";
import moment from "moment";

const ApiUrlBomMms222 = {
	BOM_ISSUE: "/bom/issue/{pid}",
	BOM_LOAD: "/bom/load/{pid}", // 이거 맞나?
	BOM_SAVE: "/bom/bom/{pid}/{marid}/list",
};

export class BomForMmsApi {
	axios: AxiosInstance = instance;
	pid: string = "";
	marid: string = "";
	bom_id: string = "";
	uid: string = "";
	constructor(pid?: string) {
		if (pid) this.pid = pid;
	}

	async maridList(pid: string, uid: string, marid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.BOM_MARID_LIST.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid),
		});
		return data.data;
	}

	async maridListDel(pid: string, uid: string, marid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.BOM_MARID_LIST.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid),
			params: {
				del_check: "Y",
			},
		});
		return data.data;
	}

	async history(
		pid: string,
		uid: string,
		marid: string,
		bom_id: string
	): Promise<any> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.BOM_ITEM_HISTORY.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid)
					.replace("{bom_id}", bom_id),
		});
		return data;
	}

	async issue(param: any): Promise<any[]> {
		if (param.pid) this.pid = param.pid;

		console.log("@@@@issue = ", param);
		const { data } = await this.axios({
			method: "POST",
			url: ApiUrl.baseUrl + ApiUrl.BOM_ISSUE.replace("{pid}", this.pid),
			params: {
				description: param.description,
				revision_name: param.revision_name,
				uid: param.uid,
				mms_check: param.mms_check,
			},
		});
		return data;
	}

	async load(pid: string, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.BOM_LOAD.replace("{pid}", pid).replace("{uid}", uid),
		});
		return data.data;
	}

	async calLoad(pid: string, uid: string, marid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.BOM_LOAD_CAL_DATA.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid),
		});
		return data;
	}

	async save(param: any, load_yn: string): Promise<any> {
		console.log("@@@@bom - save = ", param);
		const { data } = await this.axios({
			method: "POST",
			url: ApiUrl.baseUrl + ApiUrl.BOM_SAVE,
			data: param,
			timeout: 700000,

			params: {
				load_yn: load_yn,
			},
		});
		return data;
	}

	async delete(
		pid: string,
		uid: string,
		marid: string,
		bom_id: string
	): Promise<any[]> {
		console.error("@@@@bom - delete = ");

		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.BOM_ITEM_DELETE.replace("{pid}", pid).replace("{uid}", uid),

			params: { marid: marid, bom_id: bom_id },
		});
		return data;
	}

	/********************/
	async wbsSave(param: any, uid: string): Promise<any[]> {
		console.log("@@@@bom - wbsSave = ", param);
		const { data } = await this.axios({
			method: "POST",
			url:
				ApiUrl.baseUrl +
				ApiUrl.BOM_WBS_SAVE.replace("{pid}", this.pid)
					.replace("{uid}", uid)
					.replace("{marid}", this.marid),
			data: param,
		});
		return data;
	}

	async wbsList(pid: string, uid: string, marid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.BOM_WBS_LIST.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid),
		});
		return data.data;
	}

	async wbsDelete(wbs_id: string, uid: string): Promise<any[]> {
		console.log("@@@@bom - wbsList = ", this.pid, this.marid);
		const { data } = await this.axios({
			method: "DELETE",
			url:
				ApiUrl.baseUrl +
				ApiUrl.BOM_WBS_DELETE.replace("{pid}", this.pid)
					.replace("{uid}", uid)
					.replace("{marid}", this.marid)
					.replace("{wbs_id}", wbs_id),
		});
		return data.data;
	}
	/********************/
	/********************/
	/********************/
	/********************/
	/********************/
	/********************/
	/********************/
	/********************/

	bindData(data: any) {
		return _.sortBy(data, (e: any) => {
			return Number(e.data_order);
		}).map((e: any, i: number) => {
			let r: any = JSON.parse(e.json_data ?? "{}");
			r.no = i + 1;
			DBNotJsonFieldBom.map((v) => {
				if (e[v]) {
					r = { ...r, [v]: e[v] };
				}
			});

			// r.status = DBCalculationState.find((stats) => stats.code == r.cd_status)?.type ?? r.cd_status;
			//r.rev_reg_dt = moment.unix(r.rev_reg_dt).format("YYYY.MM.DD HH:mm");
			//r._editCol = Object.keys(JSON.parse(e.change_data) ?? []);
			r.rev_reg_dt = moment.unix(r.reg_dt).format("YYYY.MM.DD HH:mm");

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
				ApiUrl.BOM_LIST_COMPARE.replace("{pid}", pid).replace("{uid}", uid),
			params: {
				marid,
				marid_sub,
			},
		});
		return data.data;
	}
}

const ApiActBomForMms = new BomForMmsApi();

export default ApiActBomForMms;
