import { createMuiTheme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const GlobalTheme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});

export default GlobalTheme;
