// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");

//Duda con el scrollbar este es el completo require('tailwind-scrollbar')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
   flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(), ('tailwind-scrollbar')],
}