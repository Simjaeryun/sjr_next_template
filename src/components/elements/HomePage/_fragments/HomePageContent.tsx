import { IActiveMenu } from "../HomepageType";
import Content from "./Content";
import { Flex } from "@chakra-ui/react";
import SideMenu from "@components/common/SideMenu/SideMenu";
import SideMenuList from "@components/common/SideMenu/SideMenuList";
import { ISideMenu } from "@components/common/SideMenu/SideMenuType";
import React, { useState } from "react";

function HomePageContent() {
	const [activeMenu, setActiveMenu] = useState<IActiveMenu>();
	const [sideMenuList, setSideMenuList] = useState<ISideMenu[]>(
		SideMenuList.homePage
	);

	return (
		<Flex h="100%" w="100%">
			<SideMenu
				width={"20%"}
				sideMenuList={sideMenuList}
				setActiveMenu={setActiveMenu}
			/>
			<Content width="80%" activeMenu={activeMenu} />
		</Flex>
	);
}

export default HomePageContent;
