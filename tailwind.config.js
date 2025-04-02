/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
   // "./src/**/*.{js,ts,jsx,tsx,html",
     "./src/**/*.{js,jsx,ts,tsx,html}", // React/Vite projects
   //  "./public/**/*.html", // Static HTML files
  ],
  theme: {
    extend: {
      colors : {
        primary : '#222831', 
        info : '#C40C0C'
      } 
    },
  },
  plugins: [],
}

