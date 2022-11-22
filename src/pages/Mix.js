import React, { useState } from "react";
import TrackList from "../components/TrackList";
import Instructions from "../components/Instructions";
import Mixtape from "../components/Mixtape";

const Mix = () => {
	const [tracks, setTracks] = useState([]);
	const [playlistTracks, setPlaylistTracks] = useState([]);

	const searchQueries = [
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
		"trending",
	];
	const doSearch = async (searchType) => {
		setTracks([]);
		console.log("searchType=", searchType);
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

		console.log("tracks: ", tracks);
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
							{searchQueries.map((query) => (
								<div className="px-1">
									<button
										type="button"
										className="mt-3 mb-3 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-text shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
				{playlistTracks.length > 0 && <Mixtape playlistTracks={playlistTracks} />}

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
