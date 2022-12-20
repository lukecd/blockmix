import React from "react";

// speech bubbles => https://www.freepik.com/free-vector/doodle-blank-speech-bubbles-hand-drawn-cartoon-thinking-shapes-set_13110284.htm
const Instructions = () => {
	return (
		<div className="mt-8 mx-20 flex flex-col">
			<div className="bg-primary text-header">
				<span className="text-4xl font-press-start px-2 py-2">What's Up?</span>
			</div>
			<div className="bg-primary text-text px-5">
				<h2 className="text-2xl font-press-start ">Sit down</h2>
				<h2 className="text-3xl font-press-start">relax & </h2>
				<h2 className="text-xl font-press-start">explore some tunes.</h2>
			</div>
			<div>
				Like something? Make a playlist with it. Just like a lucky find in a dusty used record
				store, there's no guarantee you'll find the same song again.
			</div>
			<div className="mt-4 bg-secondary px-10">
				<ul className="list-decimal text-text font-mono">
					<li>Click "Conect Wallet" in the top right</li>
					<li>Click on a search term</li>
					<li>Click Play to preview</li>
					<li>Click Pause once you're done vibing</li>
					<li>Click "Add" to add to a mixtape</li>
					<li>Click "Save To Bundlr" once you're happy with your mixtape</li>
					<li>Click "play" to listen</li>
				</ul>
			</div>
		</div>
	);
};

export default Instructions;
