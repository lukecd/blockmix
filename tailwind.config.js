module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],

	theme: {
		extend: {
			backgroundImage: {
				tapes: "url('./images/tapes-bg.jpg')",
			},
			fontFamily: {
				"press-start": ['"Press Start 2P"', "cursive"],
				roboto: ["Roboto"],
			},
		},
		colors: {
			background: "#0E2954",
			primary: "#82A8A1",
			secondary: "#2F8A97",
			highlight: "#D83B25",
			header: "#D83B25",
			text: "gray-900",
		},
	},
	plugins: [],
};
