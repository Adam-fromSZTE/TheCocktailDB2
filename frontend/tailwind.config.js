module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'md': {'min': '200px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '5000px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }
    },
    extend: {},
  },
  plugins: [],
}
