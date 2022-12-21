import ApiActFoamCalculation from "@apis/swagger/ApiActFoam";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useQuery } from "react-query";

const ContentBody = () => {
	const { status, data, error } = useQuery("coinInfo", () => {
		ApiActFoamCalculation.getCoinInfo();
	});
	useEffect(() => {
		console.log(data);
	}, []);

	return <Container>Home Body</Container>;
};

const Container = styled.div`
	height: 100vh;
	width: 100%;
	position: relative;
`;

export default ContentBody;
