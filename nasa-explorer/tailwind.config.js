/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        body: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        space: {
          950: '#02040a',
          900: '#040c1e',
          800: '#071428',
          700: '#0a1f3d',
          600: '#0f2a52',
        },
        cyan: {
          400: '#00ffe0',
          500: '#00d4bb',
        },
        blue: {
          400: '#38b6ff',
          500: '#1a8fd1',
          600: '#0f6ba8',
        },
        star: '#c8d8e8',
      },
    },
  },
  plugins: [],
}
