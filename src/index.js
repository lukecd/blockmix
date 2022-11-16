import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "@rainbow-me/rainbowkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
	[chain.polygonMumbai],
	[alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()],
);
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
			<RainbowKitProvider chains={chains}>
				<App />
			</RainbowKitProvider>
		</WagmiConfig>
	</React.StrictMode>,
);
