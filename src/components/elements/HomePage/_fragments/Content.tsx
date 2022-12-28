import { IHomaPageContentProps } from "../HomepageType";
import ContentBody from "./ContentBody";
import ContentHeader from "./ContentHeader";
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

function Content({ activeMenu, width }: IHomaPageContentProps) {
	return (
		<Flex w={width} direction="column">
			<ContentHeader title={activeMenu?.activeName} />
			<ContentBody />
		</Flex>
	);
}

export default Content;
