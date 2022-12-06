import React, { useState, useEffect } from "react";

const Play = () => {
	const [showTracksId, setShowTracksId] = useState(null);
	const myPlaylists = [
		"https://arweave.net/dkRqpfWVcucE6aqXZtVIPZsUnskbP9j-s1sPepnBBNw",
		"https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
		"https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
		"https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
		"https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
		"https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
		"https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
		"https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
		"https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
		"https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
		"https://arweave.net/i4iQhgpzcYaC53OyaRBZtlBzgwGJjTdqtFOPFN6HAVI",
	];
	const showTracks = (id) => {
		setShowTracksId(id);
	};

	return (
		<div className="w-full h-full min-h-full pt-20 bg-background">
			<div className="flex flex-col">
				{showTracksId && (
					<div
						className="h-full flex flex-row flex-wrap justify-items-center border bg-primary border-primary border-8 mx-20 mt-5"
						id="expandedTapeFrame"
					>
						<iframe src={showTracksId + "?showTracks=true"} width={910} height={280}></iframe>
					</div>
				)}

				<div className="h-full flex flex-row justify-items-start items-start flex-wrap border bg-primary border-primary border-8 mx-20 mt-5">
					{myPlaylists.map((playlist, id) => (
						<div id="showShareFrame" className="flex flex-col bg-secondary mr-1">
							<span className="text-center text-sm ">
								<a href="#" className="underline" onClick={() => showTracks(playlist)}>
									Show Tracks
								</a>
							</span>
							<iframe src={playlist} width={310} height={270}></iframe>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Play;
