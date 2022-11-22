import React from "react";

const Instructions = () => {
	return (
		<div className="mt-8 mx-20 flex flex-col">
			<div className="bg-primary text-header">
				<span className="text-4xl font-press-start px-2 py-2">Welcome to Blockmix.</span>
			</div>
			<div className="bg-primary text-text px-5">
				Sit down, relax and explore tunes from blockchains spread across the galaxy. Each search is
				unique, every time you click a search term, you get a 42 random tunes in that category.
				<br /> Like something? Make a playlist with it. Just like a lucky find in a dusty used
				record store, there's no guarantee you'll find the same song again.
			</div>
			<div className="mt-4 bg-secondary px-10">
				<ul className="list-decimal text-text">
					<li>Click "Conect Wallet" in the top right</li>
					<li>Click on a search term</li>
					<li>Click Play to preview</li>
					<li>Click Pause once you're done vibing</li>
					<li>Click "Add" to add to a mixtape</li>
					<li>Click "Save To Bundlr" once you're happy with your mixtape</li>
					<li>Click "foo" to share on Lens after</li>
				</ul>
			</div>
		</div>
	);
};

export default Instructions;
