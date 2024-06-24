import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const SeravekBasic = {
  fontFamily: 'SeravekBasic',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('SeravekBasic'),
    url('assets/fonts/SeravekBasic.ttf') format('truetype')
  `,
};

const rockwell = {
  fontFamily: 'rockwell',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('rockwell'),
    url('assets/fonts/rockwell.ttf') format('truetype')
  `,
};

export const darkTheme = createTheme({
  palette: {
    common: {
      black: '#030405',
      white: '#FFFFFF',
    },
    primary: {
      main: '#FFFFFF', // White for fonts
      contrastText: '#030405', // Black for contrast
    },
    secondary: {
      main: '#181A25',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: 'SeravekBasic, rockwell, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@font-face': [SeravekBasic, rockwell],
        },
      },
    },
  },
});

