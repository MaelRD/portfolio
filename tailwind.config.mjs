/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  future: {
    // Gate `hover:` behind an actual hover-capable, fine pointer so a tap on
    // touch devices never leaves a hover/lift state visually "stuck" after
    // the finger lifts.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // Mirrors the custom properties on .space in src/styles/space.css,
        // which is where the page design actually lives.
        bg: '#030014',
        panel: '#0A0520',
        ink: '#EEEBFF',
        dim: '#A49FC9',
      },
      fontFamily: {
        // The families loaded in Layout.astro.
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        heading: ['Syne', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4,0,0.2,1)',
      },
    },
  },
  plugins: [],
};
