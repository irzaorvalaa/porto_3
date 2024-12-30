import { createTheme, Theme } from '@mui/material'

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#028ed5',
      dark: '#016395',
      light: '#34a4dd',
    },
    secondary: {
      main: '#f18700',
      dark: '#a85e00',
      light: '#f39f33',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    button: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 2,
  },
})

export { theme }
