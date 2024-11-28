/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#072E36',
        'primary': '#10515F',
        'accent-green': '#82B440',
        'accent-orange': '#FF7236',
        'light': '#E7E7E7',
        'hover-orange': '#ff7236c2',
        'gray': '#d9d9d9',
      },
    },
  },
  plugins: [],
};