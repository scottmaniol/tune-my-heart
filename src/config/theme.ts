// Brand colors and design tokens extracted from Tune My Heart cover art

export const theme = {
  colors: {
    primary: {
      DEFAULT: '#2B5876',
      dark: '#1C3A4F',
      light: '#3D6B8A',
    },
    accent: {
      DEFAULT: '#922c1f',
      light: '#b5382a',
      dark: '#6f2115',
    },
    gold: {
      DEFAULT: '#C9A961',
      light: '#E5D4A6',
      dark: '#A68945',
    },
    sage: {
      DEFAULT: '#7A9B76',
      light: '#A4C0A0',
      dark: '#5E7A5B',
    },
    lavender: {
      DEFAULT: '#9B89B3',
      light: '#BFB3D1',
      dark: '#7D6B95',
    },
    background: {
      DEFAULT: '#F5F1E8',
      dark: '#E8E2D5',
      light: '#FDFCF9',
    },
    text: {
      DEFAULT: '#2C2C2C',
      light: '#5A5A5A',
      lighter: '#8A8A8A',
    },
  },
  fonts: {
    heading: '"Merriweather", "Georgia", serif',
    body: '"Crimson Text", "Georgia", serif',
  },
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    xxl: '4rem',     // 64px
  },
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
  },
} as const;

export type Theme = typeof theme;
