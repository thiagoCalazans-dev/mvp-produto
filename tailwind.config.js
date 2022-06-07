module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {   
    extend: {
      colors: {
        brand: {
          100: "#ccddff",
          300: "#6699ff",
          500: "#0055ff",
          700: "#003399",
          900: "#001133",
        },
        contrast: {
          100: "#ffc180",
          300: "#ff9c33",
          500: "#cc6900",
          700: "#994f00",
          900: "#663500",
        },
        base: {
            50: "#FAFAFA",
            100: "#f5f5f5",
            200: "#EEEEEE",
            300: "#E0E0E0",
            400: "#BDBDBD",
            500: "#9E9E9E",
            600: "#282a2d",
            700: "#24292f",  
            800: "#202124",
            900: "#0e1013",
        },
      },
      borderRadius: {
        md: '4px'
      }
    },
  },
  plugins: [require("@tailwindcss/forms"),
  require('tailwind-scrollbar'),
],
}