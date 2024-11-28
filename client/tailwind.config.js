/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#1E201E',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(255, 255, 0, 0.2)',
      },
      backgroundImage: {
        'dark-gradient': "linear-gradient(180deg, #1a1a2e, #16213e, #0f3460)"
      },
    },
  },
  plugins: [require('daisyui')],
}

