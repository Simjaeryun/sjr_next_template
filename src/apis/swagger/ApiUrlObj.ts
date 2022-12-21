export const ApiUrlObjUser = {
	POST_CERT: "/user/cert/{name}",

	/** 사용자 로그인한다.. */
	AUTH_POST_LOGIN: "/user/login",
	// /** 사용자 로그아웃한다. */
	AUTH_POST_LOGOUT: "/user/logout",
	// /** 사용자 Access Token 값 갱신한다. */
	// AUTH_GET_REFRESH: "/user/token/refresh",
	// SSE DATA
	SSE_GET_DATA: `/user/subscribe/{uid}`,
	// EVENT MESSAGE
	USER_EVENT_MESSAGE: "/user/{uid}/eventMessage/list",
	PROJECT_GET_PID: "/user/project/{pid}/{uid}/{marid}", //수정 //완료
	/** 프로젝트를 전체 조회한다 */
	PROJECT_GET_LIST: "/user/project/{uid}/list", //수정완료
};

export const ApiUrlBomMms = {
	BOM_MARID_LIST: "/bom/{pid}/{uid}/{marid}/list", //완료
	BOM_ITEM_DELETE: "/bom/delete/{pid}/{uid}/{marid}/{bom_id}", //완료
	BOM_ITEM_HISTORY: "/bom/history/{pid}/{uid}/{marid}/{bom_id}", //완료
	BOM_ISSUE: "/bom/issue/{pid}",
	BOM_LOAD: "/bom/load/{pid}/{uid}", //완료
	BOM_SAVE: "/bom/save",
	BOM_DS_EXPORT: "/bom/excel/{pid}/{uid}/{marid}", //완료
	BOM_WBS_LIST: "/bom/wbs/{pid}/{uid}/{marid}/list", //완료
	BOM_WBS_SAVE: "/bom/wbs/{pid}/{uid}/{marid}/save", //완료
	BOM_WBS_DELETE: "/bom/wbs/delete/{pid}/{uid}/{marid}/{wbs_id}", //완료
	BOM_LIST_COMPARE: "/bom/compare/{pid}/{uid}",
	BOM_LOAD_CAL_DATA: "/bom/load/data/{pid}/{uid}/{marid}",
};

export const ApiUrlObjCalculation = {
	CALCULATION_GET_EXPORT:
		"/calculation/excel/{pid}/{uid}/{marid}/{protection_method}",
	/** CalculationList  */
	CALCULATION_GET_PID: "/calculation/{pid}",
	/** CalculationList 조회한다(pid, marid) */
	CALCULATION_GET_MARID: "/calculation/{pid}/{marid}",
	/** CalculationList 조회한다(pid, marid) 구분 waterspray */
	CALCULATION_GET_MARID_WATER:
		"/calculation/waterspray/{pid}/{uid}/{marid}/list",
	/** CalculationList 조회한다(pid, marid) 구분 foam */
	CALCULATION_GET_MARID_FOAM: "/calculation/foam/{pid}/{uid}/{marid}/list",
	/** RevHistoryEqumt 저장한다. */
	CALCULATION_POST_SAVE: "/calculation/save",
	/** RevHistoryEqumt method 구분 waterspray 저장한다. */
	CALCULATION_POST_SAVE_WATER: "/calculation/waterspray/save",
	/** RevHistoryEqumt  method 구분 foam 저장한다. */
	CALCULATION_POST_SAVE_FOAM: "/calculation/foam/save",
	/** Calculation ISSUE. */
	CALCULATION_POST_ISSUE: "/calculation/issue/{pid}",
	/** Calculation ISSUE. 구분 waterspray */
	CALCULATION_POST_ISSUE_WATER: "/calculation/issue/waterspray/{pid}",
	/** Calculation ISSUE. 구분 foam */
	CALCULATION_POST_ISSUE_FOAM: "/calculation/issue/foam/{pid}",
	/** Load btn으로 대상물선정 marid로 대상물선정 issue 당시의 첫 minor List 조회한다 */
	CALCULATION_WATERSPRAY_GET_LOAD:
		"/calculation/load/{pid}/{uid}/{marid}/WaterSpray",
	CALCULATION_FORM_GET_LOAD: "/calculation/load/{pid}/{uid}/{marid}/Foam",
	/** CalculationHistory를 조회한다 */
	CALCULATION_GET_HISTORY: "/calculation/history/{pid}/{uid}/{marid}/{calc_id}",
	/** Calculation ISSUE. */
	CALCULATION_GET_LIST_COMPARE: "/calculation/compare/{pid}",
	/** Calculation ISSUE. 구분 waterspray */
	CALCULATION_GET_LIST_COMPARE_WATER:
		"/calculation/compare/waterspray/{pid}/{uid}",
	/** Calculation ISSUE. 구분 foam */
	CALCULATION_GET_LIST_COMPARE_FOAM: "/calculation/compare/foam/{pid}/{uid}",
};

export const ApiUrlEquipment = {
	/** Equipment getListCompare  */
	EQIUPMENT_GET_LIST_COMPARE: "/equipment/compare/{pid}/{uid}",
	/** Equipment getListOfRevision  */
	EQIUPMENT_GET_LIST_OF_REVISION: "/equipment/{pid}/{uid}/{marid}",
	/** Equipment List 조회한다(pid, marid) */
	EQIUPMENT_GET_MARID: "/equipment/{pid}/{uid}/{marid}",
	/** Equipment RevHistoryEqumt 저장한다. */
	EQIUPMENT_POST_SAVE: "/equipment/save",
	/** Equipment ISSUE. */
	EQIUPMENT_POST_ISSUE: "/equipment/issue/{pid}",
	/** Equipment ISSUE. */
	EQIUPMENT_GET_HISTORY: "/equipment/history/{pid}/{uid}/{marid}/{equmt_id}",
	/** Equipment getTreeList. */
	EQIUPMENT_GET_TREELIST: "/equipment/treeList/{pid}/{uid}/{marid}",
	/** Equipment getWBS. */
	EQIUPMENT_GET_WBS: "/equipment/{pid}/{uid}/{marid}/{wbs}",
	// Equipment Load Data
	EQIUPMENT_GET_LOAD_DATA: "/equipment/load/{pid}/{uid}",
	// Equipment Load Data List
	EQIUPMENT_GET_LOAD_MESSAGE_LIST: "/equipment/load/{pid}/{uid}/info",
};

export const ApiUrlObjRevision = {
	/** RevisionMajorList 조회한다 */
	REVISION_GET_UID: "/revision/{uid}",
	/** RevisionMajor 저장한다. */
	REVISION_SAVE: "/revision/save",

	/** RevisionMajorCalculationList method 구분 waterspray 조회한다 */
	REVISION_WATER_LIST: "/revision/{pid}/{uid}/waterspray/list",
	/** RevisionMajorCalculationList method 구분 foam 조회한다 */
	REVISION_FOAM_LIST: "/revision/{pid}/{uid}/foam/list",
	/** RevisionMajorCalculationList method 구분 foam 조회한다 */
	REVISION_BOM_LIST: "/revision/{pid}/{uid}/bom/list",

	/** RevisionMajorCalculationList 조회한다 */
	REVISION_CALCULATION_LIST: "/revision/{pid}/{uid}/calculationList",
	/** RevisionMajorList 조회한다 */
	REVISION_EQUIPMENT_LIST: "/revision/{pid}/{uid}/equipmentList",
};

export const ApiUrlObjAdmin = {
	/** 프로젝트를 저장한다
cid를 보내면

DB에 일치하는 값이 있으면 신규 프로젝트 생성
DB에 일치하는 값이 없으면 프로젝트는 생성하지 않음
cid를 보내지 않고 client_name를 보내면 cid를 생성하고 db에 저장한 후 프로젝트 생성


pid,reg_dt,del_yn은 보내지 않으면 자동 생성된다 */
	PROJECT_SET: "/admin/project/set",
	/** 프로젝트 {pid}별 조회 */

	// 프로젝트를 저장한다.
	PROJECT_POST_SAVE: "/admin/project/{uid}",
	PROJECT_PUT_SAVE: "/admin/project/{uid}",
	PROJECT_POST_DELETE: "/admin/project/{uid}",

	//User 적용
	USER_INFO_PUT: "/admin/user/info/{uid}", //수정  완료
	USER_INFO_POST: "/admin/user/info/{uid}", //수정 완료
	USER_INFO_DELETE: "/admin/user/info/{uid}", //수정 완료

	USER_INFO_GET: "/admin/user/info/{uid}", //수정 완료
	// /** Project 사용자 추가를 위한 전체 사용자 조회 */
};

export const ApiUrlObjCommon = {
	// calculation data 조회
	COMMON_GET_CALCULATION_VARIABLE_LIST:
		"/common/variable/{pid}/{uid}/{marid}/{cd_variable}",

	COMMON_GET_VAR_REVI: "/common/variable/{pid}/{uid}/{revision_no}",
	/** 프로젝트 {pid}별 조회 */
	COMMON_POST_VAR_SAVE: "/common/variable/save/{pid}/{uid}",
	/** ConditionList 조회한다 */
	COMMON_GET_CONDITION_LIST: "/common/{pid}/{uid}",
	/* 대상물선정 column 항목 조회 */
	COMMON_GET_CRITERIA_COLUMN_LIST: "/common/criteria/{pid}/{uid}",
	// project unit list 조회
	COMMON_GET_PROJECT_UNIT_LIST: "/common/prjunit/{pid}/{uid}",
	// project unit save
	COMMON_POST_PROJECT_UNIT_LIST: "/common/insert/projectunit/{uid}",
	//Calculation Condition Save
	COMMON_POST_CONDITION_SAVE: "/common/insert/commonCond/{uid}",
};
