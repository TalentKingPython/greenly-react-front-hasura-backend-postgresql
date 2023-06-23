import { createTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createTheme' {}

declare module '@material-ui/core/styles/createPalette' {
  interface GreenPalette {
    primary: string;
    secondary: string;
    accentLight: string;
    category: string;
    icon: string;
    background: string;
  }

  interface GrayPalette {
    primary: string;
    secondary: string;
    dark: string;
    background: string;
    divider: string;
  }
  interface Palette {
    green: GreenPalette;
    gray: GrayPalette;
    white: string;
  }

  interface PaletteOptions {
    green: GreenPalette;
    gray: GrayPalette;
    white: string;
  }
}

// TODO: add theme colors here
enum Colors {
  WHITE = '#FFFFFF',
  GRAY_PRIMARY = '#838383',
  GRAY_SECONDARY = '#B6B6B6',
  GRAY_DARK = '#4F4F4F',
  GRAY_BACKGROUND = '#EEEEEE',
  GRAY_DIVIDER = '#E9E9E9',
  GREEN_PRIMARY = '#004621',
  GREEN_SECONDARY = '#008940',
  GREEN_ACCENT_LIGHT = '#BCFFA7',
  GREEN_CATEGORY = '#07C25E',
  GREEN_ICON = '#A5ED8C',
  GREEN_BACKGROUND = '#D2FFC2',
}

const fontWeightRegular = 400 as number;
const fontWeightMedium = 600 as number;
const fontWeightBold = 700 as number;

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 720,
      lg: 960,
      xl: 1140,
    },
  },
  palette: {
    green: {
      primary: Colors.GREEN_PRIMARY,
      secondary: Colors.GREEN_SECONDARY,
      accentLight: Colors.GREEN_ACCENT_LIGHT,
      category: Colors.GREEN_CATEGORY,
      icon: Colors.GREEN_ICON,
      background: Colors.GREEN_BACKGROUND,
    },
    gray: {
      primary: Colors.GRAY_PRIMARY,
      secondary: Colors.GRAY_SECONDARY,
      dark: Colors.GRAY_DARK,
      background: Colors.GRAY_BACKGROUND,
      divider: Colors.GRAY_DIVIDER,
    },
    white: Colors.WHITE,
  },
  typography: {
    fontFamily: [
      'Avenir Next',
      'Nunito Sans',
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: { fontSize: '48px', lineHeight: '60px', fontWeight: fontWeightRegular },
    h2: { fontSize: '34px', lineHeight: '46px', fontWeight: fontWeightBold },
    h3: { fontSize: '30px', lineHeight: '41px', fontWeight: fontWeightMedium },
    h4: { fontSize: '26px', lineHeight: '36px', fontWeight: fontWeightMedium },
    h5: { fontSize: '24px', lineHeight: '33px', fontWeight: fontWeightMedium },
    body1: {
      fontSize: '21px',
      lineHeight: '34px',
      fontWeight: fontWeightRegular,
    },
    body2: {
      fontSize: '18px',
      lineHeight: 'normal',
      fontWeight: fontWeightMedium,
    },
    caption: {
      fontSize: '16px',
      lineHeight: 'normal',
      fontWeight: fontWeightMedium,
    },
    subtitle1: {
      fontSize: '14px',
      lineHeight: 'normal',
      fontWeight: fontWeightMedium,
    },
  },
});
