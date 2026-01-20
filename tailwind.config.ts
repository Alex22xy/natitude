// Add this inside the 'extend' section of your tailwind.config.js
keyframes: {
  scan: {
    '0%': { top: '0%' },
    '100%': { top: '100%' },
  }
},
animation: {
  scan: 'scan 2s linear infinite',
}