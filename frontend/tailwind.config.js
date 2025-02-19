/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'], 
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // Large screens
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // Medium screens
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // Small/medium screens
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }], // Small screens
        'body-lg': ['1.125rem', { lineHeight: '1.75' }], // Large screens
        'body-base': ['1rem', { lineHeight: '1.75' }], // Medium screens
        'body-sm': ['0.875rem', { lineHeight: '1.625' }], // Small screens
        'body-xs': ['0.75rem', { lineHeight: '1.5' }], // Extra small screens
      },
      colors: {
        primary: {
          50: '#fff1f5',
          100: '#ffe4ed',
          200: '#fecdd6',
          300: '#fda4bd',
          400: '#fb7aa1',
          500: '#f43f7a',
          600: '#e31b5e',
          700: '#bf124c',
          800: '#9f1242',
          900: '#85133c',
          950: '#4c0720',
        },
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#e84393',
          600: '#d53f8c',
          700: '#c03081',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        night: {
          lightGray: '#FFFFFF4D',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite -3s',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-slight': 'bounce-slight 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'gradient-linear': 'linear-gradient(white, gray)', // Fixed the gradient syntax
      },
    },
  },
  plugins: [],
};