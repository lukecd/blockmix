import React from "react";
import Instructions from "../components/Instructions";
import glasses from "../assets/images/3d-glasses.png";
import sneakers from "../assets/images/sneakers.png";
import tv from "../assets/images/tv.png";
import vhs from "../assets/images/vhs.png";
import skate from "../assets/images/skate.png";

const How = () => {
	return (
		<div className="w-full h-full min-h-full pt-20">
			<div className="px-10 py-10">
				<div className="flex flex-row items-end bg-primary text-header px-5 py-5">
					<img src={sneakers} width="20%" />
					<h2 className="text-4xl font-press-start ml-2">Remember Record Bins?</h2>
				</div>
				<div className="flex flex-row items-end bg-secondary text-text px-5 py-5">
					<h2 className="font-mono ml-2">
						This project all started with a trip down memory lane, an afternoon reminiscing
						about the joys of searching through record bins. In the age of streaming and
						fine-grained search tools, it's easy to find the exact song you want ... but you
						also miss out on those random happy accidents that come from searching though record
						bins. I designed Blockmix to be the anti-search engine. You can search only by
						pre-defined categories, and that category list is dynamic and changes with each
						refresh. Then you can combine your picks from that cross-contract / cross-chain
						search into a single mixtape playlist and listen to it start to finish.
						<br />
					</h2>
					<img src={vhs} width="20%" />
				</div>
				<div className="flex flex-row items-end bg-background text-text px-5 py-5">
					<img src={glasses} width="20%" />

					<h2 className="font-mono ml-2">
						Then I decided to lean into the whole "happy accidents" feature, and just mix stuff
						up. With every search, I use the{" "}
						<a
							href="https://audius.org/en/api"
							target="_blank"
							className="underline decoration-primary"
						>
							Audius API
						</a>
						to do a genre search, then I use the{" "}
						<a
							href="https://www.alchemy.com/nft-api"
							target="_blank"
							className="underline decoration-primary"
						>
							Alchemy NFT API
						</a>{" "}
						to query the{" "}
						<a
							href="https://opensea.io/collection/async-music-blueprints"
							target="_blank"
							className="underline decoration-primary"
						>
							Async Music Blueprints
						</a>{" "}
						contract, and I just mix everything together.
					</h2>
				</div>
				<div className="flex flex-row items-end bg-primary text-text px-5 py-5">
					<h2 className="font-mono ml-2">
						Mixtapes are saved to the Arweave blockchain via{" "}
						<a
							href="https://bundlr.network/"
							target="_blank"
							className="underline decoration-secondary"
						>
							Bundlr
						</a>
						. They're immutable, once made you can't change them, you can't delete them, you can
						only listen to them. And because they're stored on Arweave, they're guaranteed to be
						there forever (well at least 200 years).
					</h2>
					<img src={skate} width="20%" />
				</div>
				<div className="flex flex-row items-end bg-secondary text-text px-5 py-5">
					<img src={tv} width="15%" />

					<h2 className="font-mono ml-2">
						In allowing you to create mixtapes using multiple audio sources, I'm also addressing
						another problem with the music NFT space. It's currently very easy to build a lovely
						collection of songs, but not to easy to listen to them. Nobody wants to have to
						click play over and over as you listen to songs from different contracts. This app
						is an example of how easy it is to mix songs from different contracts, I'd be
						curious to see someone expand on it and pull in data from hundreds of contracts.
						<ul className="list-disc ml-5 mt-2">
							<li>
								A tutorial on how I built this can be found{" "}
								<a href="TODO" target="_blank" className="underline decoration-primary">
									here
								</a>
								.{" "}
							</li>
							<li>
								The source code can be found here{" "}
								<a
									href="https://github.com/lukecd/blockmix"
									target="_blank"
									className="underline decoration-primary"
								>
									here
								</a>
								.{" "}
							</li>
							<li>
								The cool 90s graphics are from{" "}
								<a
									href="https://www.vecteezy.com/vector-art/11739286-90s-80s-memphis-nostalgic-colorful-retro-objects-toys"
									target="_blank"
									className="underline decoration-primary"
								>
									here
								</a>
								.{" "}
							</li>
						</ul>
					</h2>
				</div>
			</div>
		</div>
	);
};

export default How;
