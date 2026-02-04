/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors extracted from Tune My Heart cover
        primary: {
          DEFAULT: '#2B5876',
          dark: '#1C3A4F',
          light: '#3D6B8A',
        },
        accent: {
          DEFAULT: '#922c1f',
          light: '#b5382a',
          dark: '#6f2115',
        },
        // Supporting colors for content hierarchy
        gold: {
          DEFAULT: '#C9A961',
          light: '#E5D4A6',
          dark: '#A68945',
        },
        sage: {
          DEFAULT: '#7A9B76',
          light: '#A4C0A0',
          dark: '#5E7A5B',
        },
        lavender: {
          DEFAULT: '#9B89B3',
          light: '#BFB3D1',
          dark: '#7D6B95',
        },
        background: {
          DEFAULT: '#F5F1E8',
          dark: '#E8E2D5',
          light: '#FDFCF9',
        },
        text: {
          DEFAULT: '#2C2C2C',
          light: '#5A5A5A',
          lighter: '#8A8A8A',
        }
      },
      fontFamily: {
        heading: ['"Merriweather"', 'Georgia', 'serif'],
        body: ['"Crimson Text"', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
