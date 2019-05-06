import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
export default createMuiTheme({
  palette: {
    primary: { main: '#99CC66' },
    secondary: { main: '#9966FF' },
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
