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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 4,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function ChangeEmail(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Grid container className={classes.root} spacing={16}>
        <Grid item sm={12} xs={12}>
          <Typography component="body1">Your currently listed email address is: </Typography>
        </Grid>
        <Grid item sm={12} xs={12}>
          <Typography component="body1" color="secondary">
            currentemail@mail
          </Typography>
        </Grid>
        <Grid item sm={12} xs={12}>
          <Typography component="body1">
            Enter new email to change the currently listed email address
          </Typography>
          <form className={classes.form}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              id="outlined-email-input"
              label="New Email Address"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
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
              Change Email
            </Button>
          </form>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </main>
  );
}

ChangeEmail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangeEmail);
