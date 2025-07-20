/** @type {import('tailwindcss').Config} */
export default {
  // Specify files to scan for Tailwind classes
  content: [
    "./index.html", // For the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // For all JS, TS, JSX, TSX files in src/
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here
      // For example, adding custom colors, fonts, spacing, etc.
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define 'Inter' as a custom font family
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
        'gradient-x': 'gradientX 3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        gradientX: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [], // Add any Tailwind plugins here
}