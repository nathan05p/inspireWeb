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
          DEFAULT: '#F5E6D3',
          dark: '#C4703A',
        },
        slate: {
          DEFAULT: '#12100E',
        },
        accent: {
          DEFAULT: '#E8681A',
        },
        deepsea: {
          900: '#0E0C0A',
          700: '#1C1308',
          500: '#3A1F00',
          300: '#E8681A',
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
