/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
          DEFAULT: '#DEE0DB', // Lightest Deep Sea
          dark: '#7A91A7',    // Light Deep Sea
        },
        slate: {
          DEFAULT: '#121C26', // Darkest Deep Sea
        },
        accent: {
          DEFAULT: '#41607A', // Medium Deep Sea
        },
        deepsea: {
          900: '#0A111F',
          700: '#052243',
          500: '#0B4372',
          300: '#1583A6',
          100: '#FFFFFF',
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
