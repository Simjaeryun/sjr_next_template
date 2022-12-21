import { setToken } from "../../utils/localStorage/token/index";
import { CONFIG } from "@config";
import { apiLogger } from "@utils/apiLogger";
import { deleteToken, getToken } from "@utils/localStorage/token";
import styledConsole from "@utils/styledConsole";
import axios from "axios";
import { useRouter } from "next/router";
import logout from "pages/logout";

const isDev = CONFIG.ENV === "development";

const instance = axios.create({
	baseURL: CONFIG.API_BASE_URL,
	timeout: 20000,
	headers: {
		"Content-Type": "application/json",
	},
});

const setAuthHeader = (token: string) => {
	//console.warn("setAuthHeader-token1", token)
	if (token) {
		//   console.warn("setAuthHeader-token2", token)
		instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		//localStorage.setItem("token-error", "login")
	}
};

const unsetAuthHeader = () => {
	delete instance.defaults.headers.common["Authorization"];
};

instance.interceptors.request.use(
	async (config) => {
		const token = await getToken();
		const isAccess = !!token && !!token.access;
		if (isAccess) setAuthHeader(token.access as string);
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(res) => {
		const { status, config: reqData, data: resData } = res;
		if (isDev) apiLogger({ status, reqData, resData });
		return res;
	},
	async (error) => {
		try {
			const { response: res, config: reqData } = error || {};
			const { status } = res || {};
			const isUnAuthError = status === 401;
			const isExpiredToken = status === 403;
			const isDev = CONFIG.ENV === "development";

			if (isDev) apiLogger({ status, reqData, resData: error, method: "error" });

			//강제 로그아웃을 제외한다.
			// if (false && isExpiredToken) {
			// 	// || isUnAuthError
			// 	localStorage.setItem(
			// 		"token-error",
			// 		res.data.result_meg ?? "[error]" + status
			// 	);
			// 	console.log(res.data.result_meg);
			// 	unsetAuthHeader();
			// 	deleteToken();

			// 	//  alert(res.data.result_meg);
			// 	//  const router = useRouter()
			// 	//  router.push("
			// 	//  router.push("경로")")

			// 	// const logoutAsync = async () => {
			// 	//   const logoutRes = logout()
			// 	// }
			// 	// logoutAsync()
			// 	return Promise.reject(error);

			// 	/* window.location.replace("경로"); */
			// 	// const token = await refreshToken();
			// 	// if (token?.access) {
			// 	//   setAuthHeader(token?.access);
			// 	//   return instance(reqData);
			// 	// }
			// }
			// if (isExpiredToken) {
			// 	return Promise.reject(error);
			// }
			if (isUnAuthError) {
				localStorage.setItem("isSession", "false");
				return Promise.reject(error);
			}
		} catch (e) {
			styledConsole({
				//
				method: "error",
				topic: "UN_HANDLED",
				title: "axios-interceptor",
				data: e,
			});
		}
	}
);

export { setAuthHeader, unsetAuthHeader };
export default instance;
