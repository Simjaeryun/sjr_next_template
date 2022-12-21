import Router, { useRouter } from "next/router";
import { useEffect } from "react";

function SsoLogin() {
	const router = useRouter();

	const onLogin = () => {
		router.push("/equipment");
	};
	return (
		<>
			<div onClick={onLogin}>Hello SJR</div>
		</>
	);
}

export default SsoLogin;
