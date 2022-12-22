import React, { useState, useEffect } from "react";

const Play = () => {
	const [showTracksId, setShowTracksId] = useState("");
	const [mixtapeURLs, setMixtapeURLs] = useState([]);

	const showTracks = (id) => {
		setShowTracksId(id);
	};

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

	return (
		<div className="w-full h-full min-h-full pt-20 bg-background">
			<div className="flex flex-col">
				{showTracksId && (
					<div
						className="h-full flex flex-row flex-wrap justify-items-center border bg-primary border-primary border-8 mx-20 mt-5"
						id="expandedTapeFrame"
					>
						<iframe src={showTracksId + "?showTracks=true"} width={910} height={220}></iframe>
					</div>
				)}

				<div className="h-full flex flex-row justify-items-start items-start flex-wrap border bg-primary border-primary border-8 mx-20 mt-5">
					{mixtapeURLs.map((mixtape, id) => (
						<div id="showShareFrame" className="flex flex-col bg-secondary mr-1">
							<span className="text-center text-sm ">
								<a href="#" className="underline" onClick={() => showTracks(mixtape)}>
									Show Tracks
								</a>
							</span>
							<iframe src={mixtape} width={310} height={220}></iframe>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Play;
