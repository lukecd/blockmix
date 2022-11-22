import React, { useState } from "react";
import { providers } from "ethers";
import { WebBundlr } from "@bundlr-network/client";
import BigNumber from "bignumber.js";

const Mixtape = ({ playlistTracks }) => {
	const [playing, setPlaying] = useState(false);
	const [playlistTitle, setPlaylistTitle] = useState("");

	// On saving to Bundlr, we take the mixtape template and inject the following values
	// 1. Mixtape title
	// 2. Audius IDs
	// 3. Random tape image
	const doSave = async () => {
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
				<button
					type="button"
					className="mt-3 bg-secondary px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
