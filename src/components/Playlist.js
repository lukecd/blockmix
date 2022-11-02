import React from "react";

const Playlist = ({ playlistTracks }) => {
	const doSave = () => {};
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
				<button
					type="button"
					className="mt-3 bg-secondary px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					onClick={(e) => {
						doSave();
					}}
				>
					save
				</button>
			</div>
		</div>
	);
};

export default Playlist;
