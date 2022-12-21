import ApiActFoamCalculation from "@apis/swagger/ApiActFoam";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useQuery } from "react-query";

const ContentBody = () => {
	const { status, data, error } = useQuery<any>("coinInfo", () =>
		ApiActFoamCalculation.getCoinInfo()
	);

	useEffect(() => {
		if (status === "loading" || status === "error") {
			return;
		} else {
			console.log(data);
		}
	}, [status]);

	return (
		<Container>
			Home Body
			<div></div>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	width: 100%;
	position: relative;
`;

export default ContentBody;
