import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const palette = {
  black: '#000000',
  cream50: '#F9F1EC',
  cream100: '#EAE1D7',
  cream200: '#DBCEC2',
  white: '#FFFFFF',
  roseGold: '#A9876D',
  roseGoldDark: '#8B6950',
  roseGoldDeep: '#60432E',
  roseGoldLight: '#EED2BC',
  roseGoldLight2: '#D0B198',
  textSecondary: '#5E564D',
  error: '#A63D2F',
  success: '#3E6B50',
  warning: '#8A5F17',
};

export const AppColors = palette;

const theme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'light',
    primary: { main: palette.black, contrastText: palette.cream50 },
    secondary: {
      main: palette.roseGold, dark: palette.roseGoldDark,
      light: palette.roseGoldLight, contrastText: palette.cream50,
    },
    background: { default: palette.cream50, paper: palette.white },
    text: { primary: palette.black, secondary: palette.textSecondary },
    divider: palette.cream200,
    error: { main: palette.error },
    success: { main: palette.success },
    warning: { main: palette.warning },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'Jost, Arial, sans-serif',
    h1: { fontFamily: 'Jost, Arial, sans-serif', fontWeight: 300, letterSpacing: '-0.01em' },
    h2: { fontFamily: 'Jost, Arial, sans-serif', fontWeight: 300, letterSpacing: '-0.005em' },
    h3: { fontFamily: 'Jost, Arial, sans-serif', fontWeight: 400 },
    h4: { fontFamily: 'Jost, Arial, sans-serif', fontWeight: 400 },
    h5: { fontFamily: 'Jost, Arial, sans-serif', fontWeight: 400 },
    h6: { fontFamily: 'Jost, Arial, sans-serif', fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    button: { fontWeight: 500, textTransform: 'none', letterSpacing: '0.01em' },
    overline: { letterSpacing: '0.12em', fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { backgroundColor: palette.cream50 } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 48, borderRadius: 999, paddingInline: 24 } },
    },
    MuiIconButton: { styleOverrides: { root: { borderRadius: 999 } } },
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 8, '& fieldset': { borderColor: palette.roseGoldDark } } },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 999, fontWeight: 500 } } },
    MuiAppBar: { defaultProps: { elevation: 0 } },
  },
}));

export default theme;
