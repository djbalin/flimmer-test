const fontSizes = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

export const lightTheme = {
  colors: {
    typography: "#000000",
    background: "#ffffff",
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
  fontSizes: fontSizes,
} as const;

export const darkTheme = {
  colors: {
    typography: "#ffffff",
    background: "#000000",
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
  fontSizes: fontSizes,
} as const;

// define other themes
