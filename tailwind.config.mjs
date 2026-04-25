/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0F0A0A',
        'deep-red': '#8E1616',
        'cin-red': '#D84040',
        offwhite: '#EEEEEE',
        muted: '#A3A3A3',
        surface: '#1E1414',
      },
      fontFamily: {
        headline: ['Chakra Petch', 'sans-serif'],
        body: ['Jost', 'sans-serif'],
        orbit: ['Orbitron', 'monospace'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4,0,0.2,1)',
      },
    },
  },
  plugins: [],
};
