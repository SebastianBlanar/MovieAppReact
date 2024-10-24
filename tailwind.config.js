const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      sans : ['Gotham SSm A', 'Gotham SSm B', 'sans-serif'],
    },
    extend: {      
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, black, transparent)',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};

