import React, { useState } from "react";

const TrackList = ({ tracks, playlistTracks, setPlaylistTracks }) => {
	const [activeAudio, setActiveAudio] = useState();
	const [activeAudioURL, setActiveAudioURL] = useState();

	// called when the user clicks "Add"
	const doAdd = (track) => {
		setPlaylistTracks([...playlistTracks, track]);
	};

	// called when the user clicks "Play"
	const doPlay = async (url) => {
		if (activeAudio) {
			activeAudio.pause();
			setActiveAudio(null);
			return;
		}

		const audio = new Audio(url);
		audio.play();
		setActiveAudio(audio);
		setActiveAudioURL(url);
	};

	return (
		<div className="mt-8 flex flex-col mx-20">
			<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle">
					<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
						<table className="min-w-full divide-y divide-secondary">
							<thead className="bg-secondary">
								<tr>
									<th
										scope="col"
										className="font-mono py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6"
									></th>
									<th
										scope="col"
										className="font-mono px-3 py-3.5 text-left font-semibold text-gray-900"
									>
										Artist
									</th>
									<th
										scope="col"
										className="font-mono px-3 py-3.5 text-left font-semibold text-gray-900"
									>
										Title
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
														src={track.artwork}
														alt=""
													/>
												</div>
											</div>
										</td>
										<td className="whitespace-wrap px-3 py-4 text-gray-500">
											<div className="font-mono text-sm text-gray-900">
												{track.artist}
											</div>
										</td>
										<td className="whitespace-wrap px-3 py-4 text-gray-500">
											<span className="font-mono text-sm whitespace-wrap px-3 py-4 text-white">
												{track.track}
											</span>
										</td>

										<td className="relative whitespace-wrap py-4 pl-3 pr-4 text-right font-medium sm:pr-6">
											{activeAudio && activeAudioURL == track.playUrl && (
												<a
													href="#"
													className="font-mono text-xs mt-3 mb-3 mr-3 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
													onClick={(e) => {
														doPlay(track.playUrl);
													}}
												>
													Pause
												</a>
											)}
											{!activeAudio && (
												<a
													href="#"
													className="font-mono text-sm mt-3 mb-3 mr-3 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
													onClick={(e) => {
														doPlay(track.playUrl);
													}}
												>
													Play
												</a>
											)}

											<a
												href="#"
												className="font-mono text-sm mt-3 mb-3 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
												onClick={(e) => {
													doAdd(track);
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
