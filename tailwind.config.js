/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#171717',
        paper: '#f7f4ef',
        moss: '#526349',
        clay: '#b4553b',
        tide: '#336b73',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(23, 23, 23, 0.12)',
      },
    },
  },
  plugins: [],
}
