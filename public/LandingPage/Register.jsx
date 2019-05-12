import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import HiddenPassword from './HiddenPassword';
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    marginLeft: theme.spacing.unit * 4,
  },
  typography: {
    marginLeft: theme.spacing.unit * 4,
  },
  container: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 4,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function Register(props) {
  const { classes } = props;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Avatar className={classes.avatar}>
        <InsertEmoticonOutlinedIcon />
      </Avatar>
      <Typography className={classes.typography} component="h1" variant="h5">
        Register as a new user
      </Typography>

      <form className={classes.container} noValidate autoComplete="on">
        <TextField
          InputLabelProps={{ shrink: true }}
          required
          id="outlined-username-input"
          label="Username"
          className={classes.textField}
          type="username"
          name="username"
          autoComplete="name"
          margin="normal"
          variant="outlined"
        />

        <TextField
          InputLabelProps={{ shrink: true }}
          required
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          fullWidth
        />

        <HiddenPassword />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </main>
  );
}

export default withStyles(styles)(Register);
