import React, { useState, useEffect } from "react";
import TrackList from "../components/TrackList";
import Instructions from "../components/Instructions";
import Mixtape from "../components/Mixtape";

const Mix = () => {
	const [tracks, setTracks] = useState([]);
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [searchQueries, setSearchQueries] = useState([]);
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

	const doSearch = async (searchType) => {
		setTracks([]);
		let tracks;
		const audiusSdk = window.audiusSdk({
			appName: "blockmix",
		});
		if (searchType == "trending") {
			tracks = await audiusSdk.tracks.getTrendingTracks();
		} else {
			tracks = await audiusSdk.tracks.searchTracks({
				query: searchType,
			});
		}
		// randomize the track list
		for (var i = tracks.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = tracks[i];
			tracks[i] = tracks[j];
			tracks[j] = temp;
		}

		setTracks(tracks);
	};

	return (
		<div className="w-full h-full min-h-full pt-20 bg-background">
			<div className="flex flex-col">
				<div className="">
					<span className="text-4xl font-press-start"></span>
				</div>
				<div className="border bg-secondary border-primary border-8 mx-20 mt-10">
					<div>
						<div className="flex flex-row items-center pr-10">
							{searchQueries.map((query, id) => (
								<div className="px-1" id={id}>
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
					{tracks.length === 0 && <Instructions />}
				</div>
			</div>
		</div>
	);
};

export default Mix;
