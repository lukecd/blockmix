import React from "react";
import boomBox from "../assets/images/blue-pink-boom-box.png";
// using assets from https://www.vecteezy.com/vector-art/11739286-90s-80s-memphis-nostalgic-colorful-retro-objects-toys
const SplashScreen = () => {
	return (
		<div className="w-full flex flex-row justify-center">
			<img src={boomBox} alt="90s boom box" />
		</div>
	);
};

export default SplashScreen;
