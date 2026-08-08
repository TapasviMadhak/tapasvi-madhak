/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans:    ['"Space Grotesk"', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        ink: {
          bg:      '#080808',
          surface: '#111111',
          border:  '#252525',
          hover:   '#1e1e1e',
          muted:   '#555555',
          dim:     '#909090',
          text:    '#d8d8d8',
          white:   '#f5f5f5',
        },
        'gr':       '#22c55e',
        'gr-dim':   '#16a34a',
        'gr-faint': '#14532d',
      },
      boxShadow: {
        glow: '0 0 24px rgba(34,197,94,0.15)',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink:   'blink 1s step-start infinite',
        'fade-in': 'fade-in 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};
