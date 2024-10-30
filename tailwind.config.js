const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      sans: ['Avenir-Heavy','Gotham SSm A', 'Gotham SSm B', 'Avenir-Heavy', 'sans-serif'],
    },
    extend: {      
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, black, transparent)',
        'angled-blue-gradient': 'linear-gradient(145deg, #2196f3, #1565c0)',
      },
      colors: {
        'custom-blue': '#080f28',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
