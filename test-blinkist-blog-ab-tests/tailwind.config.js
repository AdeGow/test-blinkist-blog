/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#2CDE80',
        'prussian-blue': '#002F54',
        'blue': '#1775FC',
        'dark-grey': '#394649',
        'white': '#FFFFFF',
        'white-ghost': '#F1F6F4',
        'navy-blue': '#042330',
        'grey': '#838F93',
      },
      fontFamily: {
        title: ['Roboto Condensed', 'sans-serif'],
        text: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
