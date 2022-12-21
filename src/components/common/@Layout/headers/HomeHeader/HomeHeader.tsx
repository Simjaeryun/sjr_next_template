import HomeHeaderData from "./HomeHeader.data";
import { getApiDataProject } from "@apis/func";
import ApiActAdmin from "@apis/swagger/ApiActAdmin";
import ApiActProject from "@apis/swagger/ApiActProject";
import { ApiUrl } from "@apis/swagger/ApiUrl";
import { Badge, Box, Flex, HStack, Text, useToast } from "@chakra-ui/react";
import HeaderCustomSelectProject from "@components/common/HeaderCustomSelectProject";
import { LAYOUT } from "@constants/layout";
import styled from "@emotion/styled";
import { setProjectAuth } from "@features/Auth/projectAuth";
import { equipmentOnSave } from "@features/Save/equipmentSaveSlice";
import { setEventMessage } from "@features/Sse/EventMessage";
import { setIsNotice } from "@features/Sse/IsNotice";
import { setMessageOpen } from "@features/Sse/MessageOpen";
import { setProjectData } from "@features/User/userSlice";
import { AppState } from "@features/store";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface HomeHeaderProps {
	variant?: HomeHeaderData.VariantType;
}
interface ProjectOption {
	value: string;
	label: string;
	project_no: string;
}
const HomeHeader = ({ variant = "light" }: HomeHeaderProps) => {
	const router = useRouter();
	const cssByVariant = HomeHeaderData.VARIANTS[variant];

	const activeLink = useMemo(() => {
		return router.asPath;
	}, [router]);

	const dispatch = useDispatch();

	const userSlice = useSelector((state: AppState) => state.USER);
	const isNotice = useSelector((state: AppState) => state.isNotice);
	const messageOpen = useSelector((state: AppState) => state.messageOpen);
	const projectAuth = useSelector((state: AppState) => state.projectAuth);
	const { uid, pid, name, role, cd_usr_group, project_list } = userSlice;
	const eventMessage = useSelector((state: AppState) => state.eventMessage);
	const [options, setOptions] = useState<ProjectOption[]>();

	const chooseType = (e: {
		value: string;
		label: string;
		project_no: string;
	}) => {
		console.log("@SELECT-HEADER-chooseType", e);

		dispatch(
			setProjectData({ pid: e.value, pid_name: e.label, project_no: e.project_no })
		);
		dispatch(equipmentOnSave());
	};

	const [isLogout, setIsLogout] = useState(false);
	const toast = useToast();

	return (
		<Container>
			<Flex
				as="header"
				px={{ base: "16px", md: "32px" }}
				alignItems="center"
				justifyContent="space-between"
				position="fixed"
				zIndex="2"
				transition="all 0.3s"
				w="100%"
				h="64px"
				background={"#0a3b85"}
			>
				<Flex alignItems="flex-end" mt="3px" className="flexShrink">
					<Text color="white" textStyle="xl" fontWeight="bold">
						SJR
					</Text>
					<Text color="#FFFFFFB2" textStyle="md" ml="5px" mb="6px">
						TEMPLATE
					</Text>
				</Flex>
				<HStack spacing="40px" className="flexShrink">
					{LAYOUT.MENU.filter((el: any) => {
						return el.name !== "Admin";
					}).map((menu, idx) => {
						const isActive = activeLink === menu.link || activeLink === menu.alias;

						return (
							<Flex position="relative" key={menu.name} className="flexShrink">
								<Link href={menu.link} passHref key={`menu_${idx}`}>
									<Box
										textStyle="md"
										color={isActive ? "white" : "#FFFFFFB2"}
										fontWeight={isActive ? "bold" : "normal"}
										cursor="pointer"
									>
										<span>{menu.name}</span>
									</Box>
								</Link>
								{isActive ? <ActiveBorder></ActiveBorder> : <></>}
							</Flex>
						);
					})}
					{LAYOUT.MENU.filter((el: any) => {
						return el.name === "Admin";
					}).map((menu, idx) => {
						const isActive = activeLink === menu.link || activeLink === menu.alias;
						if (role === "ADMIN")
							return (
								<Flex position="relative" key={menu.name} className="flexShrink">
									<Link href={menu.link} passHref key={`menu_admin${idx}`}>
										<Box
											textStyle="md"
											color={isActive ? "white" : "#FFFFFFB2"}
											fontWeight={isActive ? "bold" : "normal"}
											cursor="pointer"
										>
											{<span>{menu.name}</span>}
										</Box>
									</Link>
									{isActive ? <ActiveBorder></ActiveBorder> : <></>}
								</Flex>
							);
					})}
				</HStack>

				<HeaderRight>
					<Logout
						onMouseEnter={() => {
							setIsLogout(true);
						}}
						onMouseLeave={() => {
							setIsLogout(false);
						}}
					>
						<div className="text">{name === "" ? "empty" : name}</div>
					</Logout>
					<Bell
						onClick={() => {
							dispatch(setMessageOpen(true));
						}}
					>
						<img src="/images/message.png" alt="우편모양 아이콘" />

						{isNotice.isNotice ? (
							<div className="new">
								<img src="/images/message_bell.png" alt="종모양 아이콘" />
							</div>
						) : (
							<></>
						)}
					</Bell>

					<HeaderCustomSelectProject
						chooseType={chooseType}
						optionsList={options}
						selectedValue={pid}
					/>
				</HeaderRight>
			</Flex>
		</Container>
	);
};

const Container = styled.div`
	.flexShrink {
		flex-shrink: 0;
	}
`;
const Logout = styled.div`
	position: relative;
	min-width: 100px;
	height: 64px;
	display: flex;
	align-content: center;
	justify-content: center;
	cursor: pointer;
	.text {
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: -0.02em;
		color: rgba(255, 255, 255, 0.7);
	}
	.modal {
		position: absolute;
		width: 100px;
		height: 35px;
		background: #f8f8f8;
		box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 10px;
		top: 80%;
		left: 50%;
		transform: translateX(-50%);
		.modal_link {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: "Roboto";
			font-style: normal;
			font-weight: 600;
			font-size: 12px;
			line-height: 16px;
			cursor: pointer;
			border-radius: 10px;
			&:hover {
				background: #0a3b85;
				color: #fff;
				img {
					filter: invert(93%) sepia(100%) saturate(28%) hue-rotate(48deg)
						brightness(106%) contrast(109%);
				}
			}
			img {
				margin-right: 7.25px;
			}
		}
	}
`;

const ActiveBorder = styled.div`
	position: absolute;
	bottom: -2px;
	width: 100%;
	height: 3px;
	background: #fff;
`;

const Bell = styled.div`
	margin-right: 20px;
	color: #fff;
	position: relative;
	cursor: pointer;
	width: 30px;
	img {
		filter: invert(100%) sepia(0%) saturate(7445%) hue-rotate(175deg)
			brightness(117%) contrast(88%);
		cursor: pointer;
	}
	.new {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2px;
		background: #d93704;
		position: absolute;
		right: -10px;
		top: -5px;
		border-radius: 50%;
		img {
			filter: invert(100%) sepia(0%) saturate(7445%) hue-rotate(175deg)
				brightness(117%) contrast(88%);
			width: 15px;
		}
	}
`;

const MessageModal = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 2;
	background: rgba(0, 0, 0, 0.5);
	.closeBtn {
		position: absolute;
		right: -10px;
		top: -10px;
		width: 35px;
		height: 35px;
		background-color: #fff;
		border-radius: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.message_modal {
		width: 1050px;
		position: absolute;
		background-color: #fff;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 20px 20px 0px 0px;
		h1 {
			background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
				#0a3b85;
			height: 59px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-family: "Inter";
			font-style: normal;
			font-weight: 600;
			font-size: 25px;
			border-radius: 20px 20px 0px 0px;
		}
		header {
			padding: 0px 20px;
			ul {
				list-style: none;
				display: flex;
				border-bottom: 3px solid #76c7fd;

				li {
					width: 20%;
					height: 50px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
		article {
			position: relative;
			min-height: 200px;
			padding: 0px 20px;
			ul {
				display: flex;
				&:nth-of-type(odd) {
					background: #ececec;
				}
				li {
					width: 20%;
					height: 50px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
		footer {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-bottom: 20px;
			margin-top: 20px;
			button {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 32.76px;
				width: 120px;
				margin-right: 10px;
				border-radius: 20px;
				border: 1px solid #000;
				font-family: "Inter";
				font-style: normal;
				font-weight: 600;
				font-size: 14px;
				&:first-of-type {
					background-color: #0a3b85;
					border: none;
					color: #fff;
				}
			}
			/* height: 50px;
			background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
				#0a3b85;
			color: #fff;
			font-family: "Inter";
			font-style: normal;
			font-weight: 600;
			font-size: 25px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer; */
		}
	}
`;

const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	.headerCustomSelect {
		width: auto;
		margin-right: 10px;
	}
`;
export default HomeHeader;
