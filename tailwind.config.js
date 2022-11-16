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
			background: "#071D26",
			primary: "#F24130",
			secondary: "#F2C12E",
			text: "gray-900",
		},
	},
	plugins: [],
};
