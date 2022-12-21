import instance, { unsetAuthHeader } from "@apis/_axios/instance";
import { ApiUrl } from "@apis/swagger/ApiUrl";
import { setUserInfo } from "@features/User/userSlice";
import { AppState } from "@features/store";
import { deleteToken, setToken } from "@utils/localStorage/token";
import { Console } from "console";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function logout() {
	const router = useRouter();
	const [isLogoutEnd, setIsLogoutEnd] = useState<boolean>(false);

	const dispatch = useDispatch();

	useEffect(() => {
		console.log("Start logout - isLogoutEnd");
		if (isLogoutEnd) {
			window.localStorage.setItem("useri", "");
			router.push(ApiUrl.getPath("/login"))
		}
	}, [isLogoutEnd]);

	useEffect(() => {
		console.log("Start logout");
		instance.post(ApiUrl.baseUrl + ApiUrl.AUTH_POST_LOGOUT).finally(() => {
			const userInfo: any = {
				uid: "",
				email: "",
				name: "",
				role: "",
			};
			window.localStorage.setItem("useri", JSON.stringify(userInfo));
			dispatch(setUserInfo(userInfo));

			unsetAuthHeader();
			deleteToken();
			setIsLogoutEnd(true);
		});
	}, []);
	return "";
}
