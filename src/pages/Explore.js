import React from "react";
import { useState, useEffect } from "react";
import { client, recommendedProfiles } from "../lens/api.js";
import ABI from "../lens/abi.json";
import { ethers } from "ethers";
import { useBalance, useAccount, useContract, useContractEvent, useProvider, useSigner } from "wagmi";

const Explore = () => {
	const [profiles, setProfiles] = useState([]);
	const lensHubProxyContractAddress = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

	useEffect(() => {
		fetchProfiles();
	}, []);

	const fetchProfiles = async () => {
		try {
			const response = await client.query(recommendedProfiles).toPromise();
			setProfiles(response.data.recommendedProfiles);
		} catch (e) {
			console.log("error on fetchProfiles ", e);
		}
	};

	const { data: signer, isError: isSignerError, isLoading: isSignerLoading } = useSigner();
	// swap signer for submitting transactions
	const lensProtocolContract = useContract({
		addressOrName: lensHubProxyContractAddress,
		contractInterface: ABI,
		signerOrProvider: signer,
	});

	const followUser = async (id) => {
		try {
			const tx = await lensProtocolContract.follow("stani.lens", [0x0]);
			console.log("follow successful ", tx);
		} catch (e) {
			console.log("error on follow ", e);
		}
	};

	console.log("profiles=", profiles);
	return (
		<div className="w-full h-full min-h-full pt-20 bg-background">
			<div className="flex flex-col">
				<div className="">
					<span className="text-4xl font-press-start"></span>
				</div>
				<div className="border bg-secondary border-primary border-8 mx-20 mt-10">
					{profiles.map((profile, index) => (
						<div className="mt-5 ml-5">
							{profile.picture && profile.picture.original && (
								<img src={profile.picture.original.url} width="60px" height="60px" />
							)}
							<h4 className="font-xl font-bold">{profile.handle}</h4>
							<p>{profile.bio}</p>
							<p>
								<a href="#" onClick={followUser}>
									Follow User
								</a>
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Explore;
