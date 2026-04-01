/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg: '#090f1c',
          card: '#0e1a2d',
          neon: '#7df9ff',
          lime: '#b3ff36',
          orange: '#ff7a18',
          slate: '#8da2c0',
        },
      },
      boxShadow: {
        brutal: '8px 8px 0px 0px #000',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
