module.exports = {
  content: ["./matrix-portfolio/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        matrix: {
          green: '#0F0',
          dark: '#000',
        }
      },
      fontFamily: {
        mono: ['Fira Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
