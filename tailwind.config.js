/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'], // 이부분 수정
  theme: {
    extend: {
      // custom colors
      colors: {
        brand: '#f96262',
      },
    },
  },
  plugins: [],
};
