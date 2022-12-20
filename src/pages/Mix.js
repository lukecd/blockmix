import React, { useState, useEffect } from "react";
import TrackList from "../components/TrackList";
import Instructions from "../components/Instructions";
import SplashScreen from "../components/SplashScreen";
import Mixtape from "../components/Mixtape";
import { Network, Alchemy } from "alchemy-sdk";

const Mix = () => {
	const [tracks, setTracks] = useState([]);
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [searchQueries, setSearchQueries] = useState([]);
	const [mixtapeURLs, setMixtapeURLs] = useState([]);
	const ASYNC_MUSIC_CONTRACT = "0xbc402bed62c90afd0e104be32bdee9447b5ccd0d";

	const alchemySettings = {
		apiKey: "qrnzDRutOpKRpuEC7GDiinrMzc2EcHDI", // Replace with your Alchemy API Key.
		network: Network.ETH_MAINNET, // Replace with your network.
	};
	const alchemy = new Alchemy(alchemySettings);

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
		// shuffle the queries to give our UI some randomness
		shuffleQueries();
	}, []);

	const storePlaylistURL = (newURL) => {
		console.log("storing playlist url=", newURL);
		setMixtapeURLs([...mixtapeURLs, newURL]);
		// a new URL has been added. store the whole array in local storage.
		localStorage.setItem("mixtape-urls", [...mixtapeURLs, newURL]);
	};

	const shuffleQueries = () => {
		const baseQueries = [
			"house",
			"ambient",
			"pop",
			"folk",
			"disco",
			"jazz",
			"hip hop",
			"trap",
			"experimental",
			"lofi",
			"metal",
			"electronic",
			"punk",
			"world",
			"classical",
			"country",
			"latin",
			"hyperpop",
			"house",
			"tropical house",
			"moombahton",
			"trending",
		];
		/* Randomize array in-place using Durstenfeld shuffle algorithm (not my code:)) */
		// randomize the list and then only show the first 12
		for (var i = baseQueries.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = baseQueries[i];
			baseQueries[i] = baseQueries[j];
			baseQueries[j] = temp;
		}
		setSearchQueries(baseQueries.slice(0, 12));
	};

	const getValueForTraitType = (traits, searchKey) => {
		for (let i = 0; i < traits.length; i++) {
			if (traits[i].trait_type === searchKey) return traits[i].value;
		}

		return "";
	};

	const doSearch = async (searchType) => {
		setTracks([]);
		let tracks = [];

		// first search audius
		let audiusTracks;
		const audiusSdk = window.audiusSdk({
			appName: "blockmix",
		});
		if (searchType == "trending") {
			audiusTracks = await audiusSdk.tracks.getTrendingTracks();
		} else {
			audiusTracks = await audiusSdk.tracks.searchTracks({
				query: searchType,
			});
		}

		// then convert the audius data into our cross platform data
		for (let i = 0; i < audiusTracks.length; i++) {
			const newTrack = {
				artwork: audiusTracks[i].artwork["150x150"],
				artist: audiusTracks[i].user.name,
				track: audiusTracks[i].title,
				id: audiusTracks[i].id,
				playUrl: await audiusSdk.tracks.streamTrack({
					trackId: audiusTracks[i].id,
				}),
				previewURL: "https://audius.co" + audiusTracks[i].permalink,
			};
			tracks.push(newTrack);
		}

		// now search ASYNC_MUSIC_CONTRACT
		const nftQueryOptions = {
			contractAddress: ASYNC_MUSIC_CONTRACT,
			startToken: 10,
			limit: 16,
		};

		const nftsForContract = await alchemy.nft.getNftsForContract(ASYNC_MUSIC_CONTRACT, {
			limit: 16,
		});
		console.log("from alchemy got=>", nftsForContract.nfts.length);
		for (let i = 0; i < 16; i++) {
			//for (let i = 0; i < nftsForContract.nfts.length; i++) {
			const newTrack = {
				artwork: nftsForContract.nfts[i].rawMetadata.image,
				artist: getValueForTraitType(nftsForContract.nfts[i].rawMetadata.attributes, "Artist"),
				track: nftsForContract.nfts[i].title,
				id: nftsForContract.nfts[i].tokenId,
				playUrl: nftsForContract.nfts[i].rawMetadata.animation_url,
				previewURL: nftsForContract.nfts[i].rawMetadata.external_url,
			};
			tracks.push(newTrack);
		}

		// finally randomize the track list
		for (var i = tracks.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = tracks[i];
			tracks[i] = tracks[j];
			tracks[j] = temp;
		}

		setTracks(tracks);
	};

	return (
		<div className="w-full h-full min-h-full pt-20">
			<div className="flex flex-col">
				<div className="">
					<span className="text-4xl font-press-start"></span>
				</div>
				{tracks.length === 0 && (
					<div className="mt-5">
						<SplashScreen />
					</div>
				)}

				<div className="border bg-secondary border-primary border-8 mx-20 mt-5">
					<div>
						<div className="flex flex-row items-center pr-10">
							{searchQueries.map((query, id) => (
								<div className="px-1" key={id}>
									<button
										type="button"
										className="font-mono mt-3 mb-3 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-text shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										onClick={(e) => {
											doSearch(query);
										}}
									>
										{query}
									</button>
								</div>
							))}
						</div>
					</div>
				</div>

				{playlistTracks.length > 0 && (
					<Mixtape
						playlistTracks={playlistTracks}
						setPlaylistTracks={setPlaylistTracks}
						storePlaylistURL={storePlaylistURL}
					/>
				)}

				<div className="px-4 max-w-full">
					{tracks.length > 0 && (
						<TrackList
							tracks={tracks}
							playlistTracks={playlistTracks}
							setPlaylistTracks={setPlaylistTracks}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Mix;
