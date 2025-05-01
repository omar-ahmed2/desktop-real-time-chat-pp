/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-start': '#1a1a1a',
        'dark-end': '#2d2d2d',
      },
    },
  },
  plugins: [],
}
