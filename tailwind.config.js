const {plugin} = require('twrnc');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#131d28',
        secondary: '#3b3f46',
        tertiary: '#ed9617',
        quinary: '#e12c6e',
        white: '#ffffff',
        borderColor: '#e5e7eb',
        success: '#0C7040',
        error: '#C72C41',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        sm: '380px',
        md: '420px',
        lg: '680px',
        tablet: '1024px',
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.card':
          'flex-1 bg-white w-full p-5 pt-10 lg:p-10 lg:pt-14 rounded-t-3xl shadow-2xl shadow-primary',
      });
    }),
  ],
};
