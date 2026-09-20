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
        // Page background & primary ink. The rest of the palette (violet, cyan,
        // fuchsia, slate) already matches Tailwind's default scale almost
        // exactly (violet-500 #8b5cf6, sky-400 #38bdf8, fuchsia-600 #c026d3),
        // so we lean on those instead of re-declaring a parallel palette.
        bg: '#030014',
        panel: '#07061A',
        ink: '#F8FAFC',
        dim: '#94A3B8',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4,0,0.2,1)',
      },
    },
  },
  plugins: [],
};
