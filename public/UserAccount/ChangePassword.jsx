import React, { useState } from 'react';
import PropTypes, { func } from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

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

function ChangePassword(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Grid container className={classes.root} spacing={16}>
        <Typography component="body1">Enter current password to proceed</Typography>
        <form className={classes.form}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            id="outlined-oldpassword-input"
            label="Current Password"
            className={classes.textField}
            type="password"
            name="oldpassword"
            autoComplete="password"
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Grid>
      {/* </Paper> */}
    </main>
  );
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangePassword);
