/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

/* eslint-disable linebreak-style */
module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: theme => ({
				'main-texture': 'url("./assets/wallpaper-2574943_1920.png")',
				'header-background': 'url("./assets/post.svg")'
			}),
			colors: {
				'main-background': '#484554',
				'main-panel': 'rgba(229, 231, 235, 0.4)',
				'lavender': 'lavender',
				'header-gradient1': '#004865',
				'header-gradient2': '#3f7a83e6',
				'header-color': 'cornflowerblue'
			},
			fontFamily: {
				'main-heading': ['"Open Sans"']
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
