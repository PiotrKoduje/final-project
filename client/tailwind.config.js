/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#7B1E3C',
        secondary: '#D4AF37',
        background: '#F9F5F0',
        surface: '#FAFAFA',
        text: '#2C2C2C',
        muted: '#9CA3AF',
        accent: '#3B3F2B',
      },
      screens: {
        'xs': '350px',
        '3xl': '1800px',
      }
    },
  },
  plugins: [],
}

