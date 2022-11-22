import React from "react";

const Play = () => {
	return (
		<div className="w-full h-full min-h-full pt-20 bg-background">
			<div className="flex flex-col">
				<div className="h-full flex flex-row flex-wrap justify-between space-x-2 border bg-primary border-primary border-8 mx-20 mt-10">
					<iframe
						src="https://arweave.net/YCxrFg3K_sq4bLr4ATDPjVuWtscU9aL96tRqqSU-Ce0"
						width={310}
						height={450}
					></iframe>
					<iframe
						src="https://arweave.net/uVCljBkIZQV4L0rI4vzn9AvBWUGqpX1t--VhLCXcIKw"
						width={310}
						height={450}
					></iframe>
					<iframe
						src="https://arweave.net/PMLPRjhVM4yDiycxKy18HK_7lKakrxS6nYNq-8VBMKo"
						width={310}
						height={450}
					></iframe>
					<iframe
						src="https://arweave.net/RtBWqlW30yRZIEHWvl6ui47oaA5MrluZGn3UY_ehi-g"
						width={310}
						height={450}
					></iframe>
					<iframe
						src="https://arweave.net/p96W6SRya3ouhWJdX-1tq0OwZAf3izpxB1DVxCqpOZU"
						width={310}
						height={450}
					></iframe>
					<iframe src="/mixtape_design/mixtape.html" width={310} height={450}></iframe>
				</div>
			</div>
		</div>
	);
};

export default Play;
