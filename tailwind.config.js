/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css}'
  ],
  theme: {
    extend: {
      colors: {
        'md-primary': 'var(--md-sys-primary)',
        'md-on-primary': 'var(--md-sys-on-primary)',
        'md-primary-container': 'var(--md-sys-primary-container)',
        'md-on-primary-container': 'var(--md-sys-on-primary-container)',
        'md-secondary': 'var(--md-sys-secondary)',
        'md-on-secondary': 'var(--md-sys-on-secondary)',
        'md-surface': 'var(--md-sys-surface)',
        'md-on-surface': 'var(--md-sys-on-surface)',
        'md-surface-variant': 'var(--md-sys-surface-variant)',
        'md-outline': 'var(--md-sys-outline)',
        'md-error': 'var(--md-sys-error)',
        'md-on-error': 'var(--md-sys-on-error)'
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px'
      },
      borderRadius: {
        'm3-sm': '4px',
        'm3-md': '12px',
        'm3-lg': '16px'
      }
    }
  },
  plugins: []
}
