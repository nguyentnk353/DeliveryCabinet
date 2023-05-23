import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: blue,
  },
  typography: {
    fontFamily: ['"Public Sans"', 'sans-serif'].join(','),
  },
});

export default theme;
