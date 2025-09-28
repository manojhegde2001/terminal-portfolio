/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          term: {
            bg: '#1e1e1e',
            side: '#252526',
            text: '#d4d4d4',
            green: '#4ec9b0',
            blue:  '#569cd6',
            yellow:'#d7ba7d',
            red:   '#f44747',
          },
        },
        fontFamily: {
          mono: ['Fira Code', 'Consolas', 'monospace'],
        },
      },
    },
    plugins: [],
  }
  