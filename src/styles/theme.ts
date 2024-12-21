export const COLORS = {
  primary: {
    main: '#2A3441',
    light: '#455271',
    dark: '#1A2231',
    text: '#FFFFFF'
  },
  secondary: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
    text: '#FFFFFF'
  },
  accent: {
    main: '#FF5722',
    light: '#FF8A65',
    dark: '#D84315',
    text: '#FFFFFF'
  },
  background: {
    default: '#121212',
    paper: '#1E1E1E',
    gradient: 'linear-gradient(180deg, #2A3441 0%, #1A2231 100%)'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#AAB4BE',
    disabled: '#666666'
  }
} as const;

export type ColorScheme = typeof COLORS;
export type ColorCategory = keyof typeof COLORS;
export type ColorVariant<T extends ColorCategory> = keyof typeof COLORS[T];