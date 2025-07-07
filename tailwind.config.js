/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#03045e',
        'secondary': '#00befb',
        'tertiary': '#6c757d',
        'success': '#28a745',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8',
        'light': '#f8f9fa',
        'dark': '#343a40',
        'background': '#e8efff',
        'whiten': '#f6f6f6',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
