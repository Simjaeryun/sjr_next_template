import { ThemeProvider, useColorMode, useTheme } from "@chakra-ui/react";
import store from "@features/store";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider, useDispatch } from "react-redux";
import withChakraProvider from "styles/provider";

function MyApp({ Component, pageProps }: AppProps) {
	const theme = useTheme();
	const [client] = useState(() => new QueryClient());
	return (
		// Provide the client to your App
		<Provider store={store}>
			<QueryClientProvider client={client}>
				<ReactQueryDevtools />
				<Hydrate state={pageProps.dehydratedState}>
					<ThemeProvider
						theme={{
							...theme,
							colors: { ...theme.colors },
						}}
					>
						<Component {...pageProps} />
					</ThemeProvider>
				</Hydrate>
			</QueryClientProvider>
		</Provider>
	);
}

export default withChakraProvider(MyApp);
