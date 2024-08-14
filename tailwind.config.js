const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['suite', ...defaultTheme.fontFamily.sans],
      gsans: ['gsans'],
      cursive: ['Dancing Script']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      beige: '#fefee5',
      magenta: {
        50: '#feeff9',
        100: '#fedff3',
        200: '#ffcef2',
        300: '#fface5',
        400: '#f877d2',
        500: '#e142bc',
        600: '#ca26a5',
        700: '#a91a90',
        800: '#891869',
        900: '#50003f'
      },
      purple: {
        50: '#f9f1ff',
        100: '#f2e3ff',
        200: '#ebd5ff',
        300: '#ddb9ff',
        400: '#c490f9',
        500: '#a964f7',
        600: '#944de7',
        700: '#7c3ec3',
        800: '#633495',
        900: '#3a1659'
      },
      blue: {
        50: '#eff4fe',
        100: '#dee9fe',
        200: '#cddeff',
        300: '#a9c9ff',
        400: '#6daafb',
        500: '#068bee',
        600: '#266ef1',
        700: '#175bcc',
        800: '#1948a3',
        900: '#002661'
      },
      teal: {
        50: '#E6EFF1',
        100: '#CCDFE3',
        200: '#99BFC7',
        300: '#669FAB',
        400: '#004E64',
        500: '#004558',
        600: '#003C4C',
        700: '#003340',
        800: '#002A34',
        900: '#002028'
      },
      green: {
        50: '#F5FAF6',
        100: '#EBF5ED',
        200: '#D7EBDB',
        300: '#C3E1C9',
        400: '#AFD7B7',
        500: '#9BCDA5',
        600: '#3D844B',
        700: '#326E3E',
        800: '#275831',
        900: '#1C4224'
      },
      lime: {
        50: '#eef6e3',
        100: '#deeec6',
        200: '#cae6a0',
        300: '#a6d467',
        400: '#77b71c',
        500: '#5b9500',
        600: '#4f7f06',
        700: '#3f6900',
        800: '#365310',
        900: '#1b2d00'
      },
      yellow: {
        50: '#fdf2dc',
        100: '#fbe5b6',
        200: '#ffd688',
        300: '#f6bc2f',
        400: '#d79900',
        500: '#b97502',
        600: '#9f6402',
        700: '#845201',
        800: '#6b4100',
        900: '#392300'
      },
      amber: {
        50: '#fff1e1',
        100: '#ffe4b7',
        200: '#ffc67c',
        300: '#ffb749',
        400: '#df9500',
        500: '#c46e00',
        600: '#a95f03',
        700: '#904a07',
        800: '#6b4100',
        900: '#3e2000'
      },
      orange: {
        50: '#fff0e9',
        100: '#fee2d4',
        200: '#ffd3bc',
        300: '#ffb48c',
        400: '#fc823a',
        500: '#e65300',
        600: '#c54600',
        700: '#a33b04',
        800: '#823006',
        900: '#461a00'
      },
      red: {
        50: '#fff0ee',
        100: '#ffe1de',
        200: '#ffd2cd',
        300: '#ffb2ab',
        400: '#fc7f79',
        500: '#f83446',
        600: '#de1135',
        700: '#bb032a',
        800: '#950f22',
        900: '#520810'
      },
      gray: {
        50: '#f3f3f3',
        300: '#bbbbbb',
        600: '#727272',
        900: '#282828'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#326E3E',
          secondary: '#7c7287',
          accent: '#669FAB',
          error: '#de1135',
          warning: '#f6bc2f',
          success: '#0e8345'
        }
      }
    ]
  }
}
