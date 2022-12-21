import ContentBody from "./ContentBody";
import ContentHeader from "./ContentHeader";
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

function Content({ activeMenu }: any) {
	return (
		<Flex py="20px" paddingLeft="265px" w="99%" direction="column">
			<ContentHeader />
			<ContentBody />
		</Flex>
	);
}

export default Content;
