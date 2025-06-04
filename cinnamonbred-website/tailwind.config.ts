import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Note: 'pages' dir might not be used if only using App Router
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cinnamonbred color palette
        forest: {
          50: '#F1F6F1',
          100: '#E8F0E8', 
          200: '#C5D6C7',
          300: '#7A9B7E',
          400: '#5A7F5E',
          500: '#2D5A3D',
          600: '#1F3E2A',
          700: '#152B1C',
          800: '#0D1B11',
          900: '#060D08',
        },
        cream: {
          50: '#FFF8F0',
          100: '#FAF7F3',
          200: '#F5F0EA',
          300: '#EDE4D3',
          400: '#E0D0B7',
          500: '#D4A574',
          600: '#B8935F',
          700: '#8B5A3C',
          800: '#5D3C28',
          900: '#2F1E14',
        },
        coral: '#F2B5A7',
        lavender: '#B8A9C9',
      },
      fontFamily: {
        serif: ['Crimson Text', 'serif'],
        sans: ['Source Sans Pro', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
        rounded: ['Comfortaa', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config 