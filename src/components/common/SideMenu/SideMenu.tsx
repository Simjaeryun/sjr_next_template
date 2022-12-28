import { ISideMenuProps, ISideMenuStyle } from "./SideMenuType";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

function SideMenu({ width, sideMenuList, setActiveMenu }: ISideMenuProps) {
	return (
		<Container width={width}>
			<Accordion defaultIndex={0} allowToggle>
				{sideMenuList.map((column) => {
					return (
						<AccordionItem key={column.name + column.index}>
							<AccordionButton
								onClick={() => {
									setActiveMenu({ activeIndex: column.index, activeName: column.name });
								}}
							>
								<Box flex="1" textAlign="center">
									{column.name}
								</Box>
								<AccordionIcon />
							</AccordionButton>
							<AccordionPanel p={0} cursor={"pointer"}>
								{column.children &&
									column.children.map((subColumn) => {
										return (
											<SubColumn
												onClick={() => {
													setActiveMenu({
														activeIndex: subColumn.index,
														activeName: subColumn.name,
													});
												}}
												key={subColumn.name + subColumn.index}
											>
												{subColumn.name}
											</SubColumn>
										);
									})}
							</AccordionPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</Container>
	);
}

const Container = styled.div<ISideMenuStyle>`
	width: ${(props) => props.width};
	height: 100%;
	border-right: 2px solid #ddd;
`;

const SubColumn = styled.div`
	padding: 10px 0px;
	text-align: center;
	border-bottom: 1px solid #ddd;
	&:first-of-type {
		border-top: 1px solid #ddd;
	}
	&:hover {
		background-color: #ddd;
	}
`;
export default SideMenu;
