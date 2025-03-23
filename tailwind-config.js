/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Aurora theme colors
        'background': '#0B0F19',
        'surface': '#1B2230',
        'aurora-green': '#14E81E',
        'aurora-blue': '#00EA8D',
        'aurora-purple': '#8D00C4',
        'text-primary': '#E2E8F0',
        'text-secondary': '#CBD5E1',
        'text-muted': '#94A3B8',
        
        // Status colors
        'success': '#22C55E',
        'error': '#EF4444',
        'warning': '#F59E0B',
        'info': '#0EA5E9',
        
        // Base Tailwind colors for fallback
        slate: {
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(45deg, #14E81E, #00EA8D, #8D00C4)',
        'space-gradient': 'radial-gradient(ellipse at top, #1B2230, #0B0F19 50%)',
      },
      boxShadow: {
        'aurora': '0 0 15px rgba(20, 232, 30, 0.5)',
        'aurora-blue': '0 0 15px rgba(0, 234, 141, 0.5)',
        'aurora-purple': '0 0 15px rgba(141, 0, 196, 0.5)',
      },
      animation: {
        'aurora-pulse': 'aurora-pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'aurora-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(20, 232, 30, 0.7)' },
          '50%': { boxShadow: '0 0 20px rgba(20, 232, 30, 0.9)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
