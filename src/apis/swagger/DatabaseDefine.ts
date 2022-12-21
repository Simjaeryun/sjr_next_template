export const DBNotJsonField = [
	"calc_id",
	"calc_mirid",
	"cd_data_type",
	"cd_status",
	"data_order",
	"del_yn",
	"equmt_uid",
	"marid",
	"pid",
	"reg_dt",
	"uid",
	"no",
	"_editCol",
	"rev_reg_dt",
	"revision_no",
	"highlightKeyList",
];
export const DBNotJsonFieldBom = [
	"_editCol",
	"_vaildCol",
	"no",
	"uid",
	"remark",

	"reg_dt",
	"del_yn",
	"highlightKeyList",
	"cd_data_type",
	"cd_status",
	"marid",
	"pid",

	//bom
	"bom_id",
	"bom_mirid",
	"total_qty",
	"system",
	"item",
];

//데이타 타입 CALCULATION 데이터 타입(100)
export const DBCalculationEquipCode = {
	equip: 1210001,
	valve: 1210002,
	manifold: 1210003,
};

export const DB_BOM_ITEM_CODE = {
	unitName: 1310001,
	drawingNo: 1310002,
	item: 1310003,
};

//리비전 상태 - 추가:1010101, 삭제:1010102, 수정:1010103
export const DBCalculationState = [
	{ type: "Added", code: "1010101" },
	{ type: "Deleted", code: "1010102" },
	{ type: "Modified", code: "1010103" },
];

export interface ResTypeRevision {
	cd_revision?: string;
	del_yn?: string;
	description?: string;
	marid: string;
	pid?: string;
	reg_dt?: number;
	revision_name?: string;
	revision_no?: string;
	uid?: string;
}
