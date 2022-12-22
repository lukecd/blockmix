import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { provider, chains } = configureChains([chain.polygonMumbai], [publicProvider()]);

const { connectors } = getDefaultWallets({
	appName: "Blockmix",
	chains,
});
const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				theme={darkTheme({
					accentColor: "#82A8A1",
					accentColorForeground: "#2F8A97",
				})}
			>
				<App />
			</RainbowKitProvider>
		</WagmiConfig>
	</React.StrictMode>,
);
