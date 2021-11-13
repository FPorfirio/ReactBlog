import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    'deep-blue': ['#563784', '#563784', '#563784'],
    asphalt: [
      '#4B5563',
      '#D4E0E2',
      '#B9CCD0',
      '#9EB8BD',
      '#82A4AB',
      '#679098',
      '#52747A',
      '#3E575B',
      '#293A3D',
      '#151D1E',
    ],
    primaryColor: 'teal',
    cadetBlue: 'cadetblue',
    lightTeal: {
      50: '#e2f6ff',
      100: '#c5e0eb',
      200: '#a4cbd9',
      300: '#83b4c8',
      400: '#629fb7',
      500: '#48869d',
      600: '#36687b',
      700: '#234a59',
      800: '#0f2e37',
      900: '#001217',
    },
  },
  components: {
    Link: {
      variants: {
        navLink: { _hover: { color: '#b1c9f0', textDecoration: 'none' } },
      },
    },
  },
})
export default theme
