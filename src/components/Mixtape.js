import React, { useState } from "react";
import { providers } from "ethers";
import { WebBundlr } from "@bundlr-network/client";
import BigNumber from "bignumber.js";

const Mixtape = ({ playlistTracks }) => {
	const [playing, setPlaying] = useState(false);

	const doSave = async () => {
		await window.ethereum.enable();
		const provider = new providers.Web3Provider(window.ethereum);
		await provider._ready();
		console.log("provider=", provider);

		//const bundlr = new WebBundlr("https://devnet.bundlr.network", "matic", provider);
		const bundlr = new WebBundlr("https://devnet.bundlr.network", "matic", provider, {
			providerUrl: "https://rpc-mumbai.matic.today",
		});
		await bundlr.ready();
		console.log("bundlr=", bundlr);

		const dataToUpload = "foobar";
		const tx = bundlr.createTransaction(dataToUpload);

		const fundAmountAtomic = "1";
		const fundAmountConverted = new BigNumber(fundAmountAtomic).multipliedBy(
			bundlr.currencyConfig.base[1],
		);
		console.log("funding ", fundAmountConverted.toString());

		await bundlr.fund(fundAmountConverted);
		//await bundlr.fund(Math.ceil(balance.minus(cost).multipliedBy(1.1)));
		await tx.sign();
		const response = await tx.upload();
		console.log("response=", response);

		console.log(`Data uploaded ==> https://arweave.net/${response.id}`);

		//
		// const cost = await bundlr.getPrice(tx.size);
		// const balance = await bundlr.getLoadedBalance();
		// console.log("cost=", cost.toString());
		// console.log("balance=", balance.toString());
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
			<div className="py-1 px-1">
				{playing && (
					<button
						type="button"
						className="mt-3 mr-3 bg-secondary px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
						className="mt-3 mr-3 bg-secondary px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={(e) => {
							doPlay();
						}}
					>
						play now
					</button>
				)}
				<button
					type="button"
					className="mt-3 bg-secondary px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					onClick={(e) => {
						doSave();
					}}
				>
					save to bundlr
				</button>
			</div>
		</div>
	);
};

export default Mixtape;
