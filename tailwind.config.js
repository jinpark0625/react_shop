/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // 이부분 수정
  theme: {
    extend: {
      // custom colors
      colors: {},
      boxShadow: {
        custom:
          '0 0px 15px -3px rgb(0 0 0 / 11%), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};
