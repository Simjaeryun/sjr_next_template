import ApiActEquipment from "./swagger/ApiActEquipment";
import ApiActBom from "@apis/swagger/ApiActBom";
import ApiActCalculation from "@apis/swagger/ApiActCalculation";
import ApiActProject from "@apis/swagger/ApiActProject";
import ApiActRevistion from "@apis/swagger/ApiActRevistion";

export const getApiDataProject = async (uid: any, callBack?: any) => {
	const data = await ApiActProject.getAllList(uid);
	if (typeof callBack === "function") {
		callBack(data);
		return;
	}
	return data;
};

export const getApiDataRevistionCalcul = async (param: any, callBack?: any) => {
	const data = await ApiActRevistion.getCalculationListBom(param);
	if (typeof callBack === "function") {
		callBack(data);
		return;
	}
	return data;
};

export const getApiDataRevistionCalculFoam = async (
	param: any,
	callBack?: any
) => {
	const data = await ApiActRevistion.getCalculationFoamListBom(param);
	if (typeof callBack === "function") {
		callBack(data);
		return;
	}
	return data;
};

export const getApiDataRevistionEquip = async (param: any, callBack?: any) => {
	const data = await ApiActRevistion.getEquipmentListCalLoad(param);
	if (typeof callBack === "function") {
		callBack(data);
		return;
	}
	return data;
};

export const getApiEquipmentRevision = async (param: any, callBack?: any) => {
	const { pid } = param;
	const { uid } = param;
	const data = await ApiActRevistion.getEquipmentList(pid, uid);
	if (typeof callBack === "function") {
		callBack(data);
		return;
	}
	return data;
};

export const getApiHistoryCalcul = async (param: any, callBack?: any) => {
	const { pid, uid, marid, calc_id } = param;
	const data = await ApiActCalculation.getHistory(pid, uid, marid, calc_id);
	if (typeof callBack === "function") {
		callBack(data.data);
		return;
	}
	return data;
};

export const getApiHistoryEquip = async (param: any, callBack?: any) => {
	const { pid, marid, equmt_id, uid } = param;
	const data = await ApiActEquipment.getHistory(pid, marid, equmt_id, uid);
	if (typeof callBack === "function") {
		callBack(data.data);
		return;
	}
	return data;
};

export const getApiHistoryBom = async (param: any, callBack?: any) => {
	const { pid, uid, marid, bom_id } = param;
	const data = await ApiActBom.history(pid, uid, marid, bom_id);
	if (typeof callBack === "function") {
		callBack(data.data);
		return;
	}
	return data;
};

export const getApiTreeList = async (param: any, callBack?: any) => {
	console.log(param);
	const { pid } = param;
	const { equipmentMarid } = param;
	const { uid } = param;
	const data = await ApiActEquipment.getTreeList(pid, equipmentMarid, uid);
	if (data.data === null) return;
	if (typeof callBack === "function" && data.data.length !== 0) {
		let resData = data.data;
		resData = resData.replaceAll("wbs_list", "children");
		resData = resData.replaceAll("wbs", "label");
		callBack(JSON.parse(resData));

		return;
	}

	return data;
};
