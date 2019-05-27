import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import HiddenPassword from './HiddenPassword';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function SignIn(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={4}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Grid>
        <Grid item xs={8} />
      </Grid>
      <form className={classes.form}>
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
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
      {/* </Paper> */}
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
