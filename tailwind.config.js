module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],

	theme: {
		extend: {
			backgroundImage: {
				tapes: "url('./images/tapes-bg.jpg')",
			},
			fontFamily: {
				"press-start": ['"Press Start 2P"', "cursive"],
			},
		},
		colors: {
			background: "#F461C2",
			primary: "#35C3FF",
			secondary: "#FFEF33",
			highlight: "#00FDD6",
			header: "#D83B25",
			text: "gray-900",
		},
	},
	plugins: [],
};
