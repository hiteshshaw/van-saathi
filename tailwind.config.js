/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F0F7F4',
          100: '#D8F3DC',
          200: '#B7E4C7',
          300: '#95D5B2',
          400: '#74C69D',
          500: '#52B788',
          600: '#40916C',
          700: '#2D6A4F',
          800: '#1B4332',
          900: '#081C15',
        },
        terracotta: {
          50: '#FDF6F4',
          100: '#FCECE8',
          200: '#F8D4CC',
          300: '#F2B5A7',
          400: '#E68671',
          500: '#C84C32',
          600: '#B83A2C',
          700: '#9E2A2B',
          800: '#7E2021',
          900: '#541516',
        },
        sand: {
          50: '#FAF8F5',
          100: '#F4EFE6',
          200: '#EAE1D2',
          300: '#DFD3C3',
          400: '#CAB89F',
          500: '#B69E7D',
          600: '#8E775B',
          700: '#68553F',
          800: '#453829',
          900: '#261E16',
        },
        honey: {
          50: '#FEF9EC',
          100: '#FDF1D0',
          200: '#FBE2A0',
          300: '#F7CE68',
          400: '#F3B700',
          500: '#DDA15E',
          600: '#BC6C25',
          700: '#964B00',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
