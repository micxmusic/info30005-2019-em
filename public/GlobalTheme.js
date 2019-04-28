import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const defaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
  layout: {
    width: 'auto',
    padding: `${defaultTheme.spacing.unit * 4}px 0 ${defaultTheme.spacing.unit * 6}px`,
    marginTop: defaultTheme.spacing.unit * 3,
    marginLeft: defaultTheme.spacing.unit * 3,
    marginRight: defaultTheme.spacing.unit * 3,
    [defaultTheme.breakpoints.up(1100 + defaultTheme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

export default theme;
