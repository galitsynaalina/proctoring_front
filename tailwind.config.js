/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: { 
      colors: {
        primary: '#1B4E9B',
      },
      fontFamily: {
        'montserrat-regular': ['"Montserrat"', 'sans-serif'],
        'montserrat-semibold': ['"Montserrat SemiBold"', 'sans-serif'],
        'montserrat-bold': ['"Montserrat Bold"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

