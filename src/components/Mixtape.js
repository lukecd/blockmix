import React, { useState, useEffect } from "react";
import { WebBundlr } from "@bundlr-network/client";
import ABI from "../lens/abi.json";
import {
	client,
	// challenge,
	// authenticate,
	// getDefaultProfile,
	// signCreatePostTypedData,
	// lensHub,
	// splitSignature,
	// validateMetadata,
} from "../api";
import { ethers } from "ethers";

import { useBalance, useAccount, useContract, useContractEvent, useProvider, useSigner } from "wagmi";

const Mixtape = ({ playlistTracks }) => {
	// nader(5)
	const [address, setAddress] = useState();
	const [profileId, setProfileId] = useState("");
	const [handle, setHandle] = useState("");
	const [token, setToken] = useState("");
	const [session, setSession] = useState(null);

	const [arweaveURL, setArweaveURL] = useState(null);
	const [playing, setPlaying] = useState(false);
	const [playlistTitle, setPlaylistTitle] = useState("");
	const rainbowKitProvider = useProvider();
	const { data: signer, isError, isLoading } = useSigner();

	// useEffect(() => {
	// 	checkConnection();
	// }, []);
	// async function checkConnection() {
	// 	const provider = new ethers.providers.Web3Provider(window.ethereum);
	// 	const accounts = await provider.listAccounts();
	// 	if (accounts.length) {
	// 		setAddress(accounts[0]);
	// 		const response = await client.query({
	// 			query: getDefaultProfile,
	// 			variables: { address: accounts[0] },
	// 		});
	// 		setProfileId(response.data.defaultProfile.id);
	// 		setHandle(response.data.defaultProfile.handle);
	// 	}
	// }
	// async function connect() {
	// 	const account = await window.ethereum.send("eth_requestAccounts");
	// 	if (account.result.length) {
	// 		setAddress(account.result[0]);
	// 		const response = await client.query({
	// 			query: getDefaultProfile,
	// 			//variables: { address: accounts[0] },
	// 			variables: { address: account.result[0] },
	// 		});
	// 		setProfileId(response.data.defaultProfile.id);
	// 		setHandle(response.data.defaultProfile.handle);
	// 	}
	// }

	// async function login() {
	// 	try {
	// 		const challengeInfo = await client.query({
	// 			query: challenge,
	// 			variables: {
	// 				address,
	// 			},
	// 		});
	// 		const provider = new ethers.providers.Web3Provider(window.ethereum);
	// 		const signer = provider.getSigner();
	// 		const signature = await signer.signMessage(challengeInfo.data.challenge.text);
	// 		const authData = await client.mutate({
	// 			mutation: authenticate,
	// 			variables: {
	// 				address,
	// 				signature,
	// 			},
	// 		});

	// 		const {
	// 			data: {
	// 				authenticate: { accessToken },
	// 			},
	// 		} = authData;
	// 		localStorage.setItem("lens-auth-token", accessToken);
	// 		setToken(accessToken);
	// 		setSession(authData.data.authenticate);
	// 	} catch (err) {
	// 		console.log("Error signing in: ", err);
	// 	}
	// }

	// On saving to Bundlr, we take the mixtape template and inject the following values
	// 1. Mixtape title
	// 2. Audius IDs
	// 3. Random tape image
	const doSave = async () => {
		// TODO Move the template to Arweave too
		const templateURL = "http://localhost:3000/mixtape_design/mixtape_template.html";

		// Create a string representing all track ids.
		let trackIds = "[";
		for (let i = 0; i < playlistTracks.length; i++) {
			trackIds += '"' + playlistTracks[i].id + '"';
			trackIds += ",";
		}
		trackIds += "]";

		// 12 different images to show at the top of the playlist
		const tapeImages = [
			"4ukeDloi9VugwE2bR4w6L-XbTKPIltcWuaJwGBMJf2w",
			"pYX6w8mGvfHcO2ArFtpCmU0diq4LQEQFktG79YYtGXs",
			"4QkDwX8JUfTF-ZBLJwcpxcUwwn1pjItKhg38RjXKh38",
			"4ahfII1eLtJodm5VVzOYSGJPTQN4VJo-OrF0PggYOIY",
			"NIqMk23cZwbxkd4OZOqbOtm__qUhofZnVyIoNXhLnCg",
			"cRgPGTJC2TcpKWh3auoGIqqKJXTm2Yly3XBUtneueH0",
			"Bn2aK8CQ86QDcEu98QT0qTc6atEbZKfSVu1df04C86U",
			"WckZ1rgENky0qyHctgh6Ip-w8Ja4gUHbwDulOTdWW6A",
			"GDBbF838cY9c6I-upRwbOgivFMVQy5np-mLw-ns7xmI",
			"yxGrWUjU1H8iyyEO6meD47FvTmcjX28EPv6S2fTYywM",
			"zgMV-doPmW5qQNOmwbkzdlIUr_kPixZ8GoWpxvfn_K0",
			"1IK5aZCBIwYyx3juI9YvV9MyZUE2r_k0LRHbujTHrqk",
		];
		// pick a random image
		const tapeURL = "https://arweave.net/" + tapeImages[Math.floor(Math.random() * tapeImages.length)];

		const templateDataFull = await fetch(templateURL);
		let templateDataText = await templateDataFull.text();
		let templateDataMerged = "";
		// 1. Change ||TITLE|| to playlistTitle
		templateDataText =
			templateDataText.substring(0, templateDataText.indexOf("||TITLE||")) +
			playlistTitle +
			templateDataText.substring(templateDataText.indexOf("||TITLE||") + 9);

		// 1. Change ||IMAGE|| to tapeURL
		templateDataText =
			templateDataText.substring(0, templateDataText.indexOf("||IMAGE||")) +
			tapeURL +
			templateDataText.substring(templateDataText.indexOf("||IMAGE||") + 9);

		// 3. Change ||TRACKIDS|| to
		templateDataText =
			templateDataText.substring(0, templateDataText.indexOf("||TRACKIDS||")) +
			trackIds +
			templateDataText.substring(templateDataText.indexOf("||TRACKIDS||") + 12);

		console.log(templateDataText);

		rainbowKitProvider.getSigner = () => signer;
		// const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", rainbowKitProvider);
		const bundlr = new WebBundlr("https://devnet.bundlr.network", "matic", rainbowKitProvider, {
			providerUrl: "https://rpc-mumbai.matic.today",
		});
		await bundlr.ready();

		// create a transaction with the merged template data
		// also set the Content-type value so the browser knows how to render the page
		const tx = bundlr.createTransaction(templateDataText, {
			tags: [{ name: "Content-type", value: "text/html" }],
		});

		const cost = await bundlr.getPrice(tx.size);
		const balance = await bundlr.getLoadedBalance();
		console.log("cost ", cost);
		console.log("balance ", balance);
		if (cost.isGreaterThan(balance)) {
			const fundAmountConverted = cost.minus(balance);
			console.log("funding ", fundAmountConverted.toString());
			await bundlr.fund(fundAmountConverted);
		}
		console.log("signing");
		await tx.sign();

		console.log("uploading");
		const response = await tx.upload();
		console.log("response=", response);

		console.log(`Data uploaded ==> https://arweave.net/${response.id}`);
		setArweaveURL("https://arweave.net/" + response.id);
	};

	//https://docs.lens.xyz/docs/functions
	const doShareOld = async () => {
		// const provider = new ethers.providers.Web3Provider(window.ethereum);
		// const signer = provider.getSigner();
		// const contract = new ethers.Contract(lensHubProxyContractAddress, ABI, signer);
		// console.log("contract=", contract);
		// try {
		// 	const postData = {
		// 		profileId: 42221, // hardcode me for now
		// 		arweaveURL,
		// 		collectModule: "0x23b9467334bEb345aAa6fd1545538F3d54436e96", // free to collect
		// 		collectModuleInitData: ethers.utils.defaultAbiCoder.encode(["bool"], [true]),
		// 		referenceModule: "0x0000000000000000000000000000000000000000", // anyone can reference
		// 		referenceModuleInitData: [],
		// 	};
		// 	console.log("Posting ", postData);
		// 	const tx = await contract.post(postData);
		// 	console.log("posted mixtape successfully");
		// } catch (e) {
		// 	console.log("error on share ", e);
		// }
		// const { accessToken } = await refreshAuthToken();
		// const createPostRequest = {
		// 	profileId: 42221, // hardcode me for now
		// 	arweaveURL,
		// 	collectModule: {
		// 		freeCollectModule: { followerOnly: true },
		// 	},
		// 	referenceModule: {
		// 		followerOnlyReferenceModule: false,
		// 	},
		// };
		// const signedResult = await signCreatePostTypedData(createPostRequest, accessToken);
		// const typedData = signedResult.result.typedData;
		// const { v, r, s } = splitSignature(signedResult.signature);
		// const tx = await contract.postWithSig({
		// 	profileId: typedData.value.profileId,
		// 	contentURI: typedData.value.contentURI,
		// 	collectModule: typedData.value.collectModule,
		// 	collectModuleInitData: typedData.value.collectModuleInitData,
		// 	referenceModule: typedData.value.referenceModule,
		// 	referenceModuleInitData: typedData.value.referenceModuleInitData,
		// 	sig: {
		// 		v,
		// 		r,
		// 		s,
		// 		deadline: typedData.value.deadline,
		// 	},
		// });
	};

	const doShare = async () => {
		// const createPostRequest = {
		// 	profileId,
		// 	//contentURI: "ipfs://" + ipfsData.path,
		// 	contentURI: "https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
		// 	collectModule: {
		// 		freeCollectModule: { followerOnly: true },
		// 	},
		// 	referenceModule: {
		// 		followerOnlyReferenceModule: false,
		// 	},
		// };
		// console.log("createPostRequest=", createPostRequest);
		// try {
		// 	const signedResult = await signCreatePostTypedData(createPostRequest, token);
		// 	const typedData = signedResult.result.typedData;
		// 	const { v, r, s } = splitSignature(signedResult.signature);
		// 	const tx = await lensHub.postWithSig({
		// 		profileId: typedData.value.profileId,
		// 		contentURI: typedData.value.contentURI,
		// 		collectModule: typedData.value.collectModule,
		// 		collectModuleInitData: typedData.value.collectModuleInitData,
		// 		referenceModule: typedData.value.referenceModule,
		// 		referenceModuleInitData: typedData.value.referenceModuleInitData,
		// 		sig: {
		// 			v,
		// 			r,
		// 			s,
		// 			deadline: typedData.value.deadline,
		// 		},
		// 	});
		// 	console.log("successfully created post: tx hash", tx.hash);
		// } catch (err) {
		// 	console.log("error posting publication: ", err);
		// }
	};

	const doPlay = async () => {
		// if we're already playing, just pause and return
		if (playing) {
			for (let i = 0; i < audioObjects.length; i++) {
				audioObjects[i].pause();
			}
			document.getElementById("playpause").innerHTML = "Play";
			setPlaying(false);
			return;
		}

		console.log(playlistTracks);

		// connect to audiusSDK
		const audiusSdk = window.audiusSdk({
			appName: "blockmix",
		});

		// create an array of Audio objects we can play
		const audioObjects = [];
		for (let i = 0; i < playlistTracks.length; i++) {
			const url = await audiusSdk.tracks.streamTrack({
				trackId: playlistTracks[i].id,
			});
			const audio = new Audio(url);
			audioObjects.push(audio);
		}

		// iterate over the tracks, playing each one as you go
		for (let i = 0; i < audioObjects.length; i++) {
			console.log("playing track ", i);
			// start the track
			audioObjects[i].play();

			// check if the song has finished playing
			while (!audioObjects[i].ended) {
				// pause 1 second
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}
		// done
		setPlaying(false);
	};

	return (
		<div className="flex flex-col items-end bg-primary mx-20 ">
			<div className="flex border border-primary border-8 ">
				{playlistTracks.map((track) => (
					<div className="px-1">
						<img src={track.artwork} width="150" height="150" />
					</div>
				))}
			</div>
			<div className="flex flex-row w-full items-end justify-end py-1 px-1">
				<input
					type="text"
					name="mixtapeName"
					id="mixtapeName"
					value={playlistTitle}
					className="self-start mt-3 mr-3 px-1.5 py-0.5 border-highlight focus:border-highlight focus:ring-highlight"
					placeholder="what's my name?"
					onChange={(e) => setPlaylistTitle(e.target.value)}
				/>
				{playing && (
					<button
						type="button"
						className="bg-secondary mt-3 mr-3 px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={(e) => {
							doPlay();
						}}
					>
						pause
					</button>
				)}
				{!playing && (
					<button
						type="button"
						className="mt-3 mr-3 bg-secondary px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={(e) => {
							doPlay();
						}}
					>
						play now
					</button>
				)}
				{!arweaveURL && (
					<button
						type="button"
						className="mt-3 bg-secondary px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={(e) => {
							doSave();
						}}
					>
						save to bundlr
					</button>
				)}
				{arweaveURL && (
					<button
						type="button"
						className="mt-3 bg-secondary px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={(e) => {
							doShare();
						}}
					>
						share to lens
					</button>
				)}
			</div>
		</div>
	);
};

export default Mixtape;
