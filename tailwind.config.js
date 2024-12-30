/** @type {import('tailwindcss').Config} */
/* eslint-disable no-undef */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1440px',
      },
    },
    extend: {
      screens: {
        xs: '0px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        primary: {
          50: '#34c0ff',
          100: '#2ab6fd',
          200: '#20acf3',
          300: '#16a2e9',
          400: '#0c98df',
          500: '#130F40',
          600: '#0084cb',
          700: '#007ac1',
          800: '#0070b7',
          900: '#0066ad',
        },
        secondary: {
          50: '#ffb932',
          100: '#ffaf28',
          200: '#ffa51e',
          300: '#ff9b14',
          400: '#fb910a',
          500: '#f18700',
          600: '#e77d00',
          700: '#dd7300',
          800: '#d36900',
          900: '#c95f00',
        },
        black300: '#e0e0e0',
        black400: '#bdbdbd',
        black500: '#828282',
        black600: '#4f4f4f',
        black700: '#282a2c',
        darkblue: '#026ca2',
        bluetheme: '#015581',
        button: {
          blue: '#0097da',
          orange: '#f29b2b',
          red: '#dd413c',
        },
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
