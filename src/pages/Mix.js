import React, { useState, useEffect } from "react";
import TrackList from "../components/TrackList";
import Instructions from "../components/Instructions";
import SplashScreen from "../components/SplashScreen";
import Mixtape from "../components/Mixtape";
import { Network, Alchemy } from "alchemy-sdk";
import SearchQueries from "../components/SearchQueries";
import { sdk } from "@audius/sdk";

const Mix = () => {
	const [tracks, setTracks] = useState([]);
	const [playlistTracks, setPlaylistTracks] = useState([]);

	const ASYNC_MUSIC_CONTRACT = "0xbc402bed62c90afd0e104be32bdee9447b5ccd0d";

	const alchemySettings = {
		apiKey: "qrnzDRutOpKRpuEC7GDiinrMzc2EcHDI", // Replace with your Alchemy API Key.
		network: Network.ETH_MAINNET,
	};
	const alchemy = new Alchemy(alchemySettings);

	/**
	 * Helper function to search NFT traits
	 * @param {*} traits The list of traits to search
	 * @param {*} searchKey The search term to look for
	 * @returns
	 */
	const getValueForTraitType = (traits, searchKey) => {
		for (let i = 0; i < traits.length; i++) {
			if (traits[i].trait_type === searchKey) return traits[i].value;
		}

		return "";
	};

	/**
	 * Searches Audius using Audius API and returns maxTracks.
	 * There is no guarantee that subsequent calls will return the same dataset
	 * I've intentionally coded in a bunch of randomness.
	 * @param {*} tracks Array to hold the found tracks
	 * @param {*} maxTracks Max number of tracks to return
	 */
	const doSearchAudius = async (searchType, maxTracks) => {
		let tracks = [];
		let audiusTracks;

		const audiusSdk = sdk({ appName: "Blockmix" });
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

		// now randomally delete items from the array until the length is maxTracks
		while (tracks.length > maxTracks) {
			const randIndex = Math.floor(Math.random() * tracks.length);
			tracks.splice(randIndex, 1);
		}
		return tracks;
	};

	/**
	 * Searches ASYNC_MUSIC_CONTRACT using Alchmey NFT API and returns maxTracks.
	 * There is no guarantee that subsequent calls will return the same dataset
	 * I've intentionally coded in a bunch of randomness.
	 * @param {*} tracks Array to hold the found tracks
	 * @param {*} maxTracks Max number of tracks to return
	 */
	const doSearchAsyncMusic = async (maxTracks) => {
		let tracks = [];

		// query the contract for the first 100 NFTs
		const nftsForContract = await alchemy.nft.getNftsForContract(ASYNC_MUSIC_CONTRACT);

		// iterate over the list and put data into our JSON format
		for (let i = 0; i < nftsForContract.nfts.length; i++) {
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

		// now randomally delete items from the array until the length is maxTracks
		while (tracks.length > maxTracks) {
			const randIndex = Math.floor(Math.random() * tracks.length);
			tracks.splice(randIndex, 1);
		}
		return tracks;
	};

	/**
	 * Called when the user clicks a search term.
	 * @param {*} searchType The search option (genre selection)
	 */
	const doSearch = async (searchType) => {
		setTracks([]);
		let tracks = [];
		const maxTracks = 15; // limit number of tracks per data source
		const audiusTracks = await doSearchAudius(searchType, maxTracks);
		const asyncTracks = await doSearchAsyncMusic(maxTracks);
		tracks = audiusTracks.concat(asyncTracks);

		// now randomize the track list
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

				<SearchQueries doSearch={doSearch} />

				{playlistTracks.length > 0 && (
					<Mixtape playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} />
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
