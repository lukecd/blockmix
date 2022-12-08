import React from "react";
import { useState, useEffect } from "react";

import { ethers } from "ethers";
import { useProvider, useSigner } from "wagmi";

const Explore = () => {
	const [profiles, setProfiles] = useState([]);
	const lensHubProxyContractAddress = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"; // MAINNET
	//const lensHubProxyContractAddress = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"; // MUMBAI
	const { data: signer, isError: isSignerError, isLoading: isSignerLoading } = useSigner();
	const provider = useProvider();

	return (
		<div className="w-full h-full min-h-full pt-20 bg-background">
			<div className="flex flex-col">
				<div className="">
					<span className="text-4xl font-press-start"></span>
				</div>
				<div className="border bg-secondary border-primary border-8 mx-20 mt-10">Explore</div>
			</div>
		</div>
	);
};

export default Explore;
