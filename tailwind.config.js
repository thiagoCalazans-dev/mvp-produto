module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {   
    extend: {
      colors: {
        brand: {
          primary: "#00466f",
          "primary-light": "#4caecf", 
          secondary: "#999999",
          "secondary-light": "#849daa",
        },
        dark : { 
          100: "#fafafa",
          200: "#343940",        
          300: "#21262d",   
          500: "#161b22",       
          700: "#0d1117",        
          900: "#010409",
               },
        contrast: {
          100: "#FAFAFA",
          300: "#ff9c33",
          500: "#cc6900",
          700: "#994f00",
          900: "#663500",
        },
        light: {            
            100: "#FAFAFA",            
            300: "#f6f8fa",           
            500: "#d8dde3",          
            700: "#d7dde3", 
            900: "#0b1217",
        },
      },
      borderRadius: {
        md: '4px'
      },
      backgroundImage: {
        'gcaspp-hero': "url('/images/400dpiLogo.png')",       
      }
    },
  },
  plugins: [require("@tailwindcss/forms"),
  require('tailwind-scrollbar'),
],
}