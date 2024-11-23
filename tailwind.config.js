/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sf': {
          primary: 'var(--sf-primary)',
          accent: 'var(--sf-accent)',
          'gradient-start': 'var(--sf-gradient-start)',
          'gradient-end': 'var(--sf-gradient-end)',
          blue: {
            500: '#0176D3',
            600: '#014486',
            700: '#032D60'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'sf': '0 2px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.08)',
        'sf-lg': '0 8px 16px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'sf-gradient': 'linear-gradient(to right, var(--sf-gradient-start), var(--sf-gradient-end))',
      },
    },
  },
  plugins: [],
};