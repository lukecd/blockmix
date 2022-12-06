import React from "react";
import { useState, useEffect } from "react";
import { client, recommendedProfiles } from "../lens/api.js";
import ABI from "../lens/abi.json";
import { ethers } from "ethers";
import { useBalance, useAccount, useContract, useContractWrite, useProvider, useSigner } from "wagmi";

const Explore = () => {
	const [profiles, setProfiles] = useState([]);
	const lensHubProxyContractAddress = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"; // MAINNET
	//const lensHubProxyContractAddress = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"; // MUMBAI
	const { data: signer, isError: isSignerError, isLoading: isSignerLoading } = useSigner();
	const provider = useProvider();

	//Mint Function
	const {
		data: followData,
		write: follow,
		isLoading: isFollowLoading,
		isSuccess: isFollowStarted,
		error: followError,
	} = useContractWrite({
		addressOrName: lensHubProxyContractAddress,
		contractInterface: ABI,
		functionName: "follow",
	});

	useEffect(() => {
		console.log("followData=", followData);
		console.log("isFollowLoading=", isFollowLoading);
		console.log("isFollowStarted=", isFollowStarted);
		console.log("followError=", followError);
		console.log("___________");
	}, [followData, isFollowLoading, isFollowStarted, followError]);

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

	const connectNader = async () => {
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		console.log({ accounts });
	};

	const followUser = async (id) => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();

		const contract = new ethers.Contract(lensHubProxyContractAddress, ABI, signer);
		console.log("contract=", contract);
		try {
			const tx = contract.follow([id], [0x0]);
			await tx.wait();
			console.log("followed user successfully");
		} catch (e) {
			console.log("error on follow ", e);
		}
	};

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
								<a className="underline" href="#" onClick={() => followUser(profile.id)}>
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
