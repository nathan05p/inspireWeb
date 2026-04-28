/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
      },
      colors: {
        primary: {
          DEFAULT: '#C4CDC3', // Sage
          dark: '#9CB09A',
        },
        slate: {
          DEFAULT: '#2D3E40', // Deep Slate
        },
        accent: {
          DEFAULT: '#E54B4B', // Coral Red
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
