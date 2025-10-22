/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: '#2563eb',
        secondary: '#6366f1',
        bg: '#f8fafc',
        surface: '#ffffff',
        text: '#1e293b',
        border: '#e2e8f0',
        error: '#ef4444',
        success: '#22c55e',
      }
    }
  },
  plugins: [],
}
