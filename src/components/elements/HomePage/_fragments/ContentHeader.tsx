import styled from "@emotion/styled";

function ContentHeader({ title }: any) {
	return (
		<Container>
			<Title>{title}</Title>
		</Container>
	);
}

const Container = styled.div``;

const Title = styled.div`
	font-weight: bold;
	font-size: 22px;
`;

export default ContentHeader;
