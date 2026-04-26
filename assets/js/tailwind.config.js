tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          container: '#00F0FF',
        },
        'on-primary': '#000000',
        secondary: '#B066FF',
        surface: '#0A0A0A',
        'surface-container-low': '#0F0F0F',
        'surface-container-highest': '#1A1A1A',
        'on-surface': '#FFFFFF',
        'on-surface-variant': '#A1A1AA',
        'primary-container/20': 'rgba(0, 240, 255, 0.2)',
      },
      fontFamily: {
        'h1': ['Space Grotesk', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
      },
    }
  }
}
