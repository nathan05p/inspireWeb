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
          900: '#121C26',
          700: '#202D3B',
          500: '#41607A',
          300: '#7A91A7',
          100: '#DEE0DB',
        },
        theme: {
          accent: '#3C6E71',
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
