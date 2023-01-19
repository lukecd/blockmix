import React, { useState, useEffect } from "react";
import { WebBundlr } from "@bundlr-network/client";
import { useProvider, useSigner } from "wagmi";

const Mixtape = ({ playlistTracks, setPlaylistTracks }) => {
	const [arweaveURL, setArweaveURL] = useState(null);
	const [playing, setPlaying] = useState(false);
	const [activeAudioObjects, setActiveAudioObjects] = useState([]);
	const [playlistTitle, setPlaylistTitle] = useState("");
	const rainbowKitProvider = useProvider();
	const { data: signer } = useSigner();
	const [message, setMessage] = useState("");
	const [mixtapeURLs, setMixtapeURLs] = useState([]);

	useEffect(() => {
		// read out a local copy of our mixtape urls store in state
		const localStorageURLs = localStorage.getItem("mixtape-urls");
		if (localStorageURLs) {
			console.log(localStorageURLs.split(","));
			setMixtapeURLs(localStorageURLs.split(","));
		} else {
			console.log("No stored mixtapes");
			setMixtapeURLs([]);
		}
	}, []);

	/**
	 * Adds the latest playlist URL to the browser's local storage
	 * @param {*} newURL
	 */
	const storePlaylistURL = (newURL) => {
		setMixtapeURLs([...mixtapeURLs, newURL]);
		// a new URL has been added. store the whole array in local storage.
		localStorage.setItem("mixtape-urls", [...mixtapeURLs, newURL]);
	};

	// On saving to Bundlr, we take the mixtape template and inject the following values
	// 1. Mixtape title
	// 2. JSON object showing audio data
	// 3. Random tape image
	const doSave = async () => {
		if (!playlistTitle) {
			setMessage("How about a name first?");
			return;
		}
		// Template URL for the file stored on Arweave
		// If you uploaded your own template, change this URL.
		const templateURL =
			"https://arweave.net/lsjOqRmeBq0nP62WlJt3I6K_yD0CiM9-N8TB1Hfh31g";

		// 20 different images to show at the top of the playlist
		// If you uploaded your own images to Bundlr, change these IDs
		const tapeImages = [
			"Gbg6ST1ntBfYXUhIsjkqlrKDd8PEh7rwh3Y45VGE5Zw",
			"Z1QxcVwk-mqQiphuA3O0en6sAbk5zrCUny4nniOZujU",
			"ZRTbKEuUfV7IUy9mZCuMXjsuJ0kwnvqeEFtE_AOr5j0",
			"mgHl_zr0POZ9dsmzhP75-tU-VTOZavCLywYaHiDv3xw",
			"yPL1WRjU1jWRIi-jMVthn9LBE9JYT6xzVKl4s6PLYNo",
			"r1YeNoi5edRbUdw5r4y7EfJcJhctjrxEGBFZOjO8Yts",
			"UuSavdxKkQd_yzfoaUETvRULGKAGulmwykvxUK9oXAM",
			"N1hNZi5acUPV4luRzIhtnrLSpjOTO_fewPD2WoSkibs",
			"UEJMXYmBEkpiM7VLq71dGcIk1hEhSBKmBjYmOzE6PXA",
			"X1oyZpsslvGjKLjWb5HWU6JIGu3g7cnFiZxr6eCY9Go",
			"2BRqnvme7rskRh1hh8SE5cxV7skW_WbazyvNI4MUqjI",
			"2ALajE7LbvLy5VoxRpxDrEOlzyJd97zuEAl_DWfFOWQ",
			"zgsaseaxqN7UdKcujjQY4f1-9ml2iM0MBYcQLt4FHGU",
			"SnFB_aZNpSa6_hmsLYCxpL9wFdaKl3qkt4JJTHQng-k",
			"Gm3oWzFxiVtB2Ls2noT6q_TbgQQx_PwYNBjUJV0tJXg",
			"kxX9_3P5jokehNSDrGuB5btLPMKt_vB_yUijeYQL-Ro",
			"45X6FpmwsSVG_ul4TsPBnIkQh7aM2y1CuTNdF0aiaRE",
			"UVUvrWtxtcjjX4NnbjWvnL7sz06ar3y3aquqDpYxBG4",
			"bRsly1adnoqj9-5bPznXIfF_M7QcatuuKPCdl9zScq4",
			"vxyIsS8VWVwWlhKpOx3EBhvT04bAftC_-GmNtsihSkI",
		];

		// pick a random image
		const tapeURL =
			"https://arweave.net/" +
			tapeImages[Math.floor(Math.random() * tapeImages.length)];

		// grab the template data
		const templateDataFull = await fetch(templateURL);
		let templateDataText = await templateDataFull.text();
		let templateDataMerged = "";
		// 1. Change ||TITLE|| to playlistTitle
		templateDataText =
			templateDataText.substring(
				0,
				templateDataText.indexOf("||TITLE||"),
			) +
			playlistTitle +
			templateDataText.substring(
				templateDataText.indexOf("||TITLE||") + 9,
			);

		// 1. Change ||IMAGE|| to tapeURL
		templateDataText =
			templateDataText.substring(
				0,
				templateDataText.indexOf("||IMAGE||"),
			) +
			tapeURL +
			templateDataText.substring(
				templateDataText.indexOf("||IMAGE||") + 9,
			);

		// 3. Change ||TRACKS|| to the stringified value of our JSON array
		templateDataText =
			templateDataText.substring(
				0,
				templateDataText.indexOf("||TRACKS||"),
			) +
			JSON.stringify(playlistTracks) +
			templateDataText.substring(
				templateDataText.indexOf("||TRACKS||") + 10,
			);

		// use function injection to make the RainbowKit provider work with Bundlr
		rainbowKitProvider.getSigner = () => signer;
		// const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", rainbowKitProvider);
		const bundlr = new WebBundlr(
			"https://devnet.bundlr.network",
			"matic",
			rainbowKitProvider,
			{
				providerUrl: "https://matic-mumbai.chainstacklabs.com",
			},
		);
		await bundlr.ready();

		// create a transaction with the merged template data
		// also set the Content-type value so the browser knows how to render the page
		const tx = bundlr.createTransaction(templateDataText, {
			tags: [
				{ name: "Content-type", value: "text/html" },
				{ name: "App-Name", value: "blockmix" },
			],
		});

		// lazy fund the upload, only paying for the amount of data we need
		const cost = await bundlr.getPrice(tx.size);
		const balance = await bundlr.getLoadedBalance();

		// if necessary, fund the upload
		if (cost.isGreaterThan(balance)) {
			const fundAmountConverted = cost.minus(balance);
			console.log("funding ", fundAmountConverted.toString());
			await bundlr.fund(fundAmountConverted);
		}
		await tx.sign();

		const response = await tx.upload();

		// print the playlist URL to console for reference
		console.log(`Data uploaded ==> https://arweave.net/${response.id}`);

		// store the playlist url locally
		storePlaylistURL("https://arweave.net/" + response.id);

		// redirect to play page
		window.location.href = "/play";
	};

	/**
	 * Called when the user clicks Play at the mixtape level.
	 * Iterates though the array of tracks, playing each one.
	 * If already playing, pauses play.
	 */
	const doPlay = async () => {
		// if we're already playing, just pause and return
		if (playing) {
			for (let i = 0; i < activeAudioObjects.length; i++) {
				activeAudioObjects[i].pause();
			}
			// set playing to false
			setPlaying(false);
			// clear state
			setActiveAudioObjects([]);
			return;
		}

		setPlaying(true);

		// create an array of Audio objects we can play
		const audioObjects = [];
		for (let i = 0; i < playlistTracks.length; i++) {
			console.log("creating audio object=", playlistTracks[i].playUrl);
			const audio = new Audio(playlistTracks[i].playUrl);
			audioObjects.push(audio);
		}
		// store in state to make pausing easy
		setActiveAudioObjects(audioObjects);
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

	// removes the specified track from the list
	const removeFromPlaylist = (id) => {
		for (let i = 0; i < playlistTracks.length; i++) {
			if (id === playlistTracks[i].id) {
				playlistTracks.splice(i, 1);
				setPlaylistTracks([...playlistTracks]);
			}
		}
	};

	return (
		<div className="flex flex-col items-end bg-primary mx-20 ">
			<div className="flex border border-primary border-8 ">
				{playlistTracks.map((track) => (
					<div className="flex flex-col px-1">
						<img src={track.artwork} width="150" height="150" />
						<span className="text-right text-xs font-mono">
							<a
								href="#"
								onClick={(e) => removeFromPlaylist(track.id)}
							>
								x
							</a>
						</span>
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
						className="font-mono text-sm  bg-secondary mt-3 mr-3 px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
						className="font-mono text-sm mt-3 mr-3 bg-secondary px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={(e) => {
							doPlay();
						}}
					>
						play
					</button>
				)}
				{!arweaveURL && (
					<button
						type="button"
						className="font-mono text-sm mt-3 bg-secondary px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={(e) => {
							doSave();
						}}
					>
						save to bundlr
					</button>
				)}
			</div>
			<p className="font-bold text-white mr-1">{message}</p>
		</div>
	);
};

export default Mixtape;
