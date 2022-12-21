import {
	ApiUrlObjAdmin,
	ApiUrlObjRevision,
	ApiUrlEquipment,
	ApiUrlObjUser,
	ApiUrlObjCommon,
	ApiUrlObjCalculation,
	ApiUrlBomMms,
} from "./ApiUrlObj";
import { CONFIG } from "@config";

export const ApiUrl = {
	baseUrl: process.env.NEXT_PUBLIC_API_URL + "//api/v1",
	...ApiUrlObjUser,
	...ApiUrlObjCommon,
	...ApiUrlObjCalculation,
	...ApiUrlObjRevision,
	...ApiUrlObjAdmin,
	...ApiUrlEquipment,
	...ApiUrlBomMms,
	getPath: (path: string) => {
		return "/" + path;
	},
};
