import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "@/stores/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistStore(store)}>
						<Component {...pageProps} />
					</PersistGate>
				</Provider>
			</Hydrate>
		</QueryClientProvider>
	);
}
