import Content from "./Content";
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

function HomePageContent() {
	const [activeMenu, setActiveMenu] = useState<number>(0);

	return (
		<Flex h="100%" w="100%">
			<Content activeMenu={activeMenu} />
		</Flex>
	);
}

export default HomePageContent;
