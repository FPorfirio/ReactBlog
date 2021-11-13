/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

/* eslint-disable linebreak-style */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'main-texture': 'url("./assets/wallpaper-2574943_1920.png")',
        'header-background': 'url("./assets/post.svg")',
        'probando-back': 'url("./assets/backgroundsvg.svg")',
      }),
      colors: {
        'main-backgroundd': '#484554',
        'main-background': '#41788D',
        'navbar-bg': '#034b67',
        'main-panel': 'rgba(229, 231, 235, 0.4)',
        lavender: 'lavender',
        'header-gradient1': '#004865',
        'header-gradient2': '#3f7a83e6',
        'header-color': 'cornflowerblue',
        'header-texture': '#E6F4F1',
        'cadet-blue': 'cadetblue',
        azure: 'azure',
        peru: 'peru',
        coral: 'coral',
        gainsboro: 'gainsboro',
        darkslategray: 'darkslategray',
        indianred: 'indianred',
        teal: 'teal',
      },
      fontFamily: {
        'main-heading': ['"Open Sans"'],
        heading: 'Red Hat Display',
        text: 'Darker Grotesque',
      },
      spacing: {
        140: '35rem',
        155: '43rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
