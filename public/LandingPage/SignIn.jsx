import React, { useState } from 'react';
import PropTypes, { func } from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import HiddenPassword from './HiddenPassword';
// Define theme presets for all components
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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    marginLeft: theme.spacing.unit * 4,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  typography: {
    marginLeft: theme.spacing.unit * 4,
  },
});
// Beginning of the sign in component
function SignIn(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      {/* Include icon of the lock */}
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      {/* Start a grid to contain title */}
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={4}>
          <Typography component="h1" variant="h5" className={classes.typography}>
            Sign in
          </Typography>
        </Grid>

        {/* Second grid item containing the text fields for user input */}
        <form className={classes.form}>
          {/* For username */}
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
          {/* For email */}
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
          {/* Include a text field for password that can be revealed or hidden on button press */}
          <HiddenPassword />
          <Grid item>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </Grid>
          {/* Button to submit data */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </Grid>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
