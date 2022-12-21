import HomePageContent from "./_fragments/HomePageContent";
import HomeLayout from "@components/common/@Layout/layouts/HomeLayout/HomeLayout";
import Head from "next/head";
import React from "react";

function HomePage() {
	return (
		<>
			<Head>
				<title>SJR TEMPLATE</title>
			</Head>
			<HomeLayout content={<HomePageContent />} />
		</>
	);
}

export default HomePage;
