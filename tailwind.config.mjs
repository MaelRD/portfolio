/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#1D1616',
        'deep-red': '#8E1616',
        'cin-red': '#D84040',
        offwhite: '#EEEEEE',
        muted: '#A3A3A3',
        surface: '#2A2A2A',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4,0,0.2,1)',
      },
    },
  },
  plugins: [],
};
