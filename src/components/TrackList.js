import React, { useState } from "react";

const TrackList = ({ tracks, playlistTracks, setPlaylistTracks }) => {
	const [activeAudio, setActiveAudio] = useState();
	const [activeAudioId, setActiveAudioId] = useState();

	const doAdd = (artwork, artist, track, id) => {
		const newTrack = {
			artwork: artwork,
			artist: artist,
			track: track,
			id: id,
		};
		setPlaylistTracks([...playlistTracks, newTrack]);
	};

	const doPlay = async (trackId) => {
		if (activeAudio) {
			activeAudio.pause();
			setActiveAudio(null);
			return;
		}
		const audiusSdk = window.audiusSdk({
			appName: "blockmix",
		});
		const url = await audiusSdk.tracks.streamTrack({
			trackId: trackId,
		});
		const audio = new Audio(url);
		audio.play();
		setActiveAudio(audio);
		setActiveAudioId(trackId);
	};

	return (
		<div className="mt-8 flex flex-col mx-20">
			<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table className="min-w-full divide-y divide-secondary">
							<thead className="bg-secondary">
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6"
									></th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left font-semibold text-gray-900"
									>
										Artist
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left font-semibold text-gray-900"
									>
										Title
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left font-semibold text-gray-900"
									>
										Genre
									</th>
									<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"></th>
								</tr>
							</thead>
							<tbody className="divide-y divide-secondary bg-primary ">
								{tracks.map((track) => (
									<tr key={track.id}>
										<td className="whitespace-wrap py-4 pl-4 pr-3 sm:pl-6">
											<div className="flex items-center">
												<div className="h-10 w-10 flex-shrink-0">
													<img
														className="h-10 w-10 rounded-full"
														src={track.artwork["150x150"]}
														alt=""
													/>
												</div>
											</div>
										</td>
										<td className="whitespace-wrap px-3 py-4 text-gray-500">
											<div className="text-gray-900">{track.user.name}</div>
										</td>
										<td className="whitespace-wrap px-3 py-4 text-gray-500">
											<span className="whitespace-wrap px-3 py-4 text-white">
												{track.title}
											</span>
										</td>
										<td className="whitespace-wrap px-3 py-4 text-white">
											{track.genre}
										</td>
										<td className="relative whitespace-wrap py-4 pl-3 pr-4 text-right font-medium sm:pr-6">
											{activeAudio && activeAudioId == track.id && (
												<a
													href="#"
													className="mt-3 mb-3 mr-3 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
													onClick={(e) => {
														doPlay(track.id);
													}}
												>
													Pause
												</a>
											)}
											{!activeAudio && (
												<a
													href="#"
													className="mt-3 mb-3 mr-3 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
													onClick={(e) => {
														doPlay(track.id);
													}}
												>
													Play
												</a>
											)}

											<a
												href="#"
												className="mt-3 mb-3 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
												onClick={(e) => {
													doAdd(
														track.artwork["150x150"],
														track.user.name,
														track.title,
														track.id,
													);
												}}
											>
												Add
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
export default TrackList;
