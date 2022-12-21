import { ApiUrl } from "./ApiUrl";
import "./Calculation.type";
import instance from "@apis/_axios/instance";
import { AxiosInstance } from "axios";
import { prependListener } from "process";

export interface commonRowProps {
	comm_var_id: number;
	pid: string;
	cd_variable: number;
	var_group: string;
	var_name: string;
	id_mm: string;
	id_inch: string;
	nominal: string;
	value: string;
	revision_no: number;
	del_yn: string;
	reg_dt: number;
}

export interface commonTypeRowProps {
	type: string;
	name: string;
	value: string;
	id: number;
}

export class CommonApi {
	axios: AxiosInstance = instance;
	foam: any = {};
	line_number_data: any = {};

	constructor(axios?: AxiosInstance) {
		if (axios) this.axios = axios;
	}

	async getListRevi(
		pid: string,
		uid: string,
		revision_no: string
	): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.COMMON_GET_VAR_REVI.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{revision_no}", revision_no),
		});
		return data.data;
	}

	async getConditionList(pid: string, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.COMMON_GET_CONDITION_LIST.replace("{pid}", pid).replace(
					"{uid}",
					uid
				),
		});
		return data.data;
	}

	async getCriteriaColumnList(pid: string, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.COMMON_GET_CRITERIA_COLUMN_LIST.replace("{pid}", pid).replace(
					"{uid}",
					uid
				),
		});
		return data.data;
	}

	async getProjectUnitList(pid: string, uid: string): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.COMMON_GET_PROJECT_UNIT_LIST.replace("{pid}", pid).replace(
					"{uid}",
					uid
				),
		});
		return data.data;
	}

	async getCalculationVariableList({
		pid,
		uid,
		marid,
		code,
	}: any): Promise<any[]> {
		const { data } = await this.axios({
			method: "GET",
			url:
				ApiUrl.baseUrl +
				ApiUrl.COMMON_GET_CALCULATION_VARIABLE_LIST.replace("{pid}", pid)
					.replace("{uid}", uid)
					.replace("{marid}", marid)
					.replace("{cd_variable}", code),
		});
		return data.data;
	}

	async saveProjectUnitList(param: any, uid: string): Promise<any[]> {
		// console.log("@@@@save = ", param);
		const { data } = await this.axios({
			method: "POST",
			url:
				ApiUrl.baseUrl + ApiUrl.COMMON_POST_PROJECT_UNIT_LIST.replace("{uid}", uid),
			data: param,
			timeout: 700000,
		});
		return data;
	}
	async saveCalculationVariableList(param: any, uid: string): Promise<any[]> {
		// console.log("@@@@save = ", param);
		const { data } = await this.axios({
			method: "POST",
			url: ApiUrl.baseUrl + ApiUrl.COMMON_POST_VAR_SAVE.replace("{uid}", uid),
			data: param,
			timeout: 700000,
		});
		return data;
	}

	async saveCommonCondition(param: any, uid: string): Promise<any[]> {
		// console.log("@@@@save = ", param);
		const { data } = await this.axios({
			method: "POST",
			url:
				ApiUrl.baseUrl + ApiUrl.COMMON_POST_CONDITION_SAVE.replace("{uid}", uid),
			data: param,
			timeout: 700000,
		});
		return data;
	}

	bindPipeData(data: commonRowProps[]) {
		let pipeSize: any = {
			inch: [],
			nominal: [],
			mm: [],
		};
		if (Array.isArray(data)) {
			data.map((row: commonRowProps) => {
				// console.log("row-", row);
				pipeSize.inch.push(row.id_inch);
				pipeSize.nominal.push(row.nominal);
				pipeSize.mm.push(row.id_mm);
			});
		}
		return pipeSize;
	}

	bindCommonVars(data: commonTypeRowProps[]) {
		let commonVars: any = {};
		// console.log("@bindCommonVars", data);
		/**
		 * 0: {type: 'skid_margin', name: 'Skid Margin', value: '1', id: 0}
1: {type: 'height_limit', name: 'Height Limit', value: '12', id: 1}
2: {type: 'tank_roof_slope', name: 'Tank Roof Slope', value: '0.75', id: 2}
3: {type: 'tank_shell_height', name: 'Tank Shell Height', value: '7.4', id: 3}
4: {type: 'hydraulic_balance', name: 'Hydraulic Balance', value: '0.15', id: 4}
5: {type: 'discharge_pressure', name: 'Discharge Pressure', value: '2.1', id: 5}
length: 6
[[Prototype]]: Array(0)

		 * 
		 */
		if (Array.isArray(data)) {
			data.map((row: commonTypeRowProps) => {
				switch (row.type) {
					case "skid_margin":
						commonVars.margin = Number(row.value);
						break;
					case "height_limit":
						commonVars.height = Number(row.value);
						break;
					case "tank_roof_slope":
						commonVars.slope = row.value;
						break;
					case "tank_shell_height":
						commonVars.cover = row.value;
						break;
					case "hydraulic_balance":
						commonVars.hydraulicBalance = row.value;
						break;
					case "discharge_pressure":
						commonVars.pressure = row.value;
						break;
				}
			});
		}
		return commonVars;
	}

	bindCommonData(resData: any) {
		// console.log("bindCommonData - resData", resData);
		const data = resData;
		//code = 1410001
		let pipeSize: any = null;
		try {
			const data1410001 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410001)?.variable_data?.json_data
			);
			pipeSize = this.bindPipeData(data1410001);
			// console.log("@@@data1410001", data1410001);
			// console.log("@@@pipeSize", pipeSize);
		} catch (e) {
			// console.log("ERROR catch:1410001 - ", e);
		}

		let commonVars: any = {
			height: null,
			margin: null,
			slope: null,
			cover: null,
			hydraulicBalance: null,
		};
		//code = 1410002
		try {
			const data1410002 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410002)?.variable_data?.json_data
			);
			// console.log("@@@data1410002", data1410002);
			// console.log("@@@commonVars", commonVars);
			commonVars = this.bindCommonVars(data1410002);
		} catch (e) {
			// console.log("ERROR catch:1410002 - ", e);
		}

		//code = 1410003
		let minimum: any = null;
		let minimum_bom: any = null;
		let minimumList: any = null;
		try {
			const data1410003 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410003)?.variable_data?.json_data
			);
			if (Array.isArray(data1410003)) {
				minimumList = data1410003.map((e: any) => {
					return JSON.parse(e.value);
				});
				minimum = data1410003
					?.filter((e: any) => e.system_gubun === "water_spray")
					.map((e: any) => {
						return {
							type: e.type,
							minimum: e.value,
							//minimum: e.minimum_application_rate,
						};
					});

				minimum_bom = data1410003
					?.filter((e: any) => e.system_gubun === "foam")
					.map((e: any) => {
						return {
							type: e.type,
							minimum: e.value,
							//minimum: e.minimum_application_rate,
						};
					});
			} else {
				// console.log("ERROR:1410003 not array - ", data1410003);
			}
		} catch (e) {
			// console.log("ERROR catch:1410003 - ", e);
		}

		//code = 1410004
		let velocity: any = { valve: null, manifold: null, default: null };
		try {
			const data1410004 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410004)?.variable_data?.json_data
			);
			if (data1410004) {
				// console.log({ data1410004 });
				data1410004?.forEach((e: any) => {
					if (e.type.toLowerCase().indexOf("valve") !== -1) {
						velocity.valve = Number(e.value);
					} else if (e.type.toLowerCase().indexOf("mani") !== -1) {
						velocity.manifold = Number(e.value);
					} else {
						velocity.default = Number(e.value);
					}
				});
			} else {
				// console.log("ERROR:1410004 not array - ", data1410004);
			}
		} catch (e) {
			// console.log("ERROR catch:1410004 -common-velocity", e);
		}

		//code = 1410005
		let valve: any = null;
		try {
			const data1410005 = data.find((e: any) => e.cd_variable == 1410005)
				?.variable_data?.json_data;
			let tmp_valve = JSON.parse(data1410005 ?? "{}");

			if (tmp_valve.deluge_valve_no) {
				valve = {
					deluge_no:
						tmp_valve.deluge_valve_no?.map((e: any) => e.value).join("") ??
						"deluge_no-empty",
					number_digit: tmp_valve.number_digit,
					start_number: tmp_valve.start_number,
				};
			} else {
				// console.log("ERROR:1410005 not array - ", { tmp_valve }, { data1410005 });
			}
		} catch (e) {
			// console.log("ERROR catch:1410005 ", e);
		}

		//code = 1410006 Line Number Fluid Code
		/*** 넘버링 부분인데 value 잘못들어가있는듯하네... 확인 필요
		 * 220719.xlsx - Line Numbering Rule (7/12 추가)
		 *
		 */
		let line_number_data: any = {};
		try {
			//
			const data1410006 = data.find((e: any) => e.cd_variable == 1410006)
				?.variable_data?.json_data;
			line_number_data = JSON.parse(data1410006 ?? "{}");
			//이건 확인이 필요하네
			// console.log("1410006 valve 이것도 valve 야???", line_number_data);
		} catch (e) {
			// console.log("ERROR catch:1410006 ", e);
		}

		//code = 1410007 Foam Minimum Discharge Time - min_discharge_time
		let foamMinDischargeTime: any = [];
		try {
			const data1410007 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410007)?.variable_data?.json_data
			);
			if (Array.isArray(data1410007)) {
				data1410007.map((r: any) => {
					//const row = JSON.parse(r.value);
					// code: r.var_name,
					// value: r.value,
					foamMinDischargeTime.push({
						type: r.type,
						value: r.value,
					});
				});
			} else {
				// console.log("ERROR:1410007 not array - ", data1410007);
			}
		} catch (e) {
			// console.log("ERROR catch:1410007 ", e);
		}

		//code = 1410008 Foam Concentration - foam_concentration
		let foamConcent: any = [];
		try {
			const data1410008 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410008)?.variable_data?.json_data
			);
			if (Array.isArray(data1410008)) {
				data1410008.map((r: any) => {
					//const row = JSON.parse(r.value);
					foamConcent.push({
						type: r.type,
						value: r.value,
					});
				});
			} else {
				// console.log("ERROR:1410008 not array - ", data1410008);
			}
		} catch (e) {
			// console.log("ERROR catch:1410008", e);
		}

		let appendix2n1: any = [];
		try {
			const data1410009 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410009)?.variable_data?.json_data
			);
			if (Array.isArray(data1410009)) {
				data1410009.map((row: any) => {
					if (row?.model) {
						appendix2n1.push({
							model: row?.model,
							inlet: row?.inlet_inch,
							outlet: row?.outlet_inch,
							kfacter_min: Number(row?.k_factor_min),
							kfacter_max: Number(row?.k_factor_max),
						});
					} else {
						// console.log("ERROR data 1410009 appendix2n1 JSON:", row);
					}
				});
			} else {
				// console.log("ERROR: 1410009 not array - ", data1410009);
			}
		} catch (e) {
			// console.log("ERROR catch:1410009", e);
		}

		let appendix2n2: any = [];
		try {
			const data1410010 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410010)?.variable_data?.json_data
			);
			if (Array.isArray(data1410010)) {
				data1410010.map((row: any) => {
					if (row?.tank_diameter) {
						appendix2n2.push({
							diameter: row?.tank_diameter,
							minimum_discharge: row?.minimum_number_outlets,
						});
					} else {
						// console.log("ERROR data 1410010 appendix2n2 JSON:", row);
					}
				});
			} else {
				// console.log("ERROR: 1410010 not array - ", data1410010);
			}
		} catch (e) {
			// console.log("ERROR catch:1410010", e);
		}

		let appendix3n2: any = [];
		try {
			const data1410011 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410011)?.variable_data?.json_data
			);
			if (Array.isArray(data1410011)) {
				data1410011.map((row: any) => {
					if (row?.tank_diameter) {
						appendix3n2.push({
							diameter: row?.tank_diameter,
							minimum_discharge: row?.minimum_number_outlets,
						});
					} else {
						// console.log("ERROR data 1410011 appendix3n2 JSON:", row);
					}
				});
			} else {
				// console.log("ERROR:1410011 ", data1410011);
			}
		} catch (e) {
			// console.log("ERROR catch:1410011 ", e);
		}

		let appendix3n4: any = [];
		try {
			const data1410012 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410012)?.variable_data?.json_data
			);
			if (Array.isArray(data1410012)) {
				data1410012.map((row: any) => {
					if (row?.model) {
						appendix3n4.push({
							model: row?.model,
							factor: row?.k_factor,
						});
					} else {
						// console.log("ERROR data 1410012 appendix3n4 JSON:", row);
					}
				});
			} else {
				// console.log("ERROR:1410012", data1410012);
			}
		} catch (e) {
			// console.log("ERROR catch:1410012", e);
		}

		let appendix4n1: any = [];
		try {
			const data1410013 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410013)?.variable_data?.json_data
			);
			if (Array.isArray(data1410013)) {
				data1410013.map((row: any) => {
					if (typeof row === "object") {
						appendix4n1.push({
							model: row?.model,
							factor_min: row?.min,
							factor_max: row?.max,
							h1: row?.h1_mm,
							h2: row?.h2_mm,
							w: row?.w_mm,
							fi: row?.fi_inch,
						});
					} else {
						// console.log("ERROR data 1410013 appendix4n1 JSON:", row);
					}
				});
			} else {
				// console.log("ERROR:1410013", data1410013);
			}
		} catch (e) {
			// console.log("ERROR catch:1410013", e);
		}

		let appendix4n2: any = [];
		try {
			const data1410014 = JSON.parse(
				data.find((e: any) => e.cd_variable == 1410014)?.variable_data?.json_data
			);
			if (Array.isArray(data1410014)) {
				data1410014.map((row: any) => {
					if (typeof row === "object") {
						appendix4n2.push({
							sealtype: row?.seal_type,
							detail: row?.applicable_illustration_detail,
							minimum_rate: row?.minimum_application_rate,
							minimum_time: row?.minimum_discharge_time,
							foam_dam_305: row?.mm_foam_dam_305,
							foam_dam_610: row?.mm_foam_dam_610,
						});
					} else {
						// console.log("ERROR data 1410014 appendix4n2 JSON:", row);
					}
				});
			} else {
				// console.log("ERROR:1410014", data1410014);
			}
		} catch (e) {
			// console.log("ERROR catch:1410014", e);
		}

		this.foam = {
			pipeSize,
			minimum: minimum_bom,
			hydraulicBalance: commonVars.hydraulicBalance,
			discharge_time: foamMinDischargeTime,
			concentration: foamConcent,
			appendix2n1,
			appendix2n2,
			appendix3n2,
			appendix3n4,
			appendix4n1,
			appendix4n2,
			velocity,
		};

		this.line_number_data = line_number_data;

		return {
			minimum,
			velocity,
			valve,
			pipeSize,
			commonVars,
			line_number_data,
		};
	}
}

const ApiActCommon = new CommonApi();

export default ApiActCommon;
