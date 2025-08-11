export const theme = {
  colors: {
    backgroundStart: '#0a0f1f',
    backgroundEnd: '#111b3a',
    card: '#0f1a2e',
    primary: '#7b5cff',
    secondary: '#00d2ff',
    accent: '#ff4ecd',
    text: '#e6e9f5',
    textMuted: '#9aa3b2',
    success: '#3ddc97',
    warning: '#ffcc00',
    danger: '#ff4d4d',
    border: 'rgba(255,255,255,0.08)'
  },
  spacing: (n: number) => n * 8,
  radius: {
    sm: 8,
    md: 14,
    lg: 22,
  },
  shadow: {
    glowPrimary: {
      shadowColor: '#7b5cff',
      shadowOpacity: 0.5,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 0 },
      elevation: 6,
    },
  },
};