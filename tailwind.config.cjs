/* eslint-env node */
/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: {
        50: '#F1F0F8',
        100: '#E7E6EF',
        200: '#D4D1E0',
        300: '#C0BDD1',
        400: '#A9A5C0',
        500: '#938DB0',
        600: '#797298',
        700: '#5C5676',
        800: '#454158',
        900: '#2E2B3B',
      },
      yellow: colors.yellow,
      blue: colors.blue,
      green: colors.green,
      red: colors.red,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.25rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '3rem',
      },
    },
  },
  plugins: [],
}
