/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#222831',
        secondary: '#393E46',
        primary_light: '#DFD0B8',
        secondary_light: '#948979'
      }
    },
  },
  plugins: [],
}