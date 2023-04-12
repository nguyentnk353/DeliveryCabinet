import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: blue,
  },
  typography: {
    fontFamily: ['"Montserrat"', 'sans-serif'].join(','),
  },
});

export default theme;
