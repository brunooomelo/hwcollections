/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      screens: {
        'xs': '576px'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
