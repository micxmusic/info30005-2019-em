import axios from 'axios';
import isEmail from 'validator/lib/isEmail';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { AuthContext } from '../components/AuthContext';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

function ChangeEmail(props) {
  const { classes } = props;
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState({});
  const [formData, setFormData] = useState({ email: '' });
  const [formValidation, setFormValidation] = useState({
    emailInUse: false,
    emailInvalid: false,
  });
  const source = axios.CancelToken.source();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cancelToken: source.token,
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        // await the result for all API calls run asynchronously)
        const details = await axios.get(`/api/account`, config);
        setAccountDetails(details.data);
        setLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          (() => {})(setLoading(false));
        }
      }
    })();
    // equivalent to componentDidUnmount
    return () => {
      // cancel API requests when component unmounted
      source.cancel();
    };
  }, [token]); // shouldComponentUpdate equivalent check

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const validateForm = async event => {
    event.preventDefault();
    setLoading(true);
    const validate = {
      emailInvalid: !isEmail(formData.email),
    };
    const invalid = !Object.keys(validate).every(k => !validate[k]);
    if (invalid) {
      setFormValidation(validate);
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        '/api/account',
        {
          username: formData.email,
        },
        config
      );
      setAccountDetails({
        ...accountDetails,
        username: formData.email.concat(' - successfully changed!'),
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response.status === 409) {
        setFormValidation({ emailInUse: true });
      }
    }
  };

  return (
    <main className={classes.main}>
      <Grid container className={classes.root} spacing={2}>
        {loading ? (
          <CenteredCircularProgress />
        ) : (
          <>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1">Your currently listed email address is: </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" color="secondary">
                {accountDetails.username}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1">Changing this will change your login as well</Typography>
              <form className={classes.form} onSubmit={validateForm}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  className={classes.textField}
                  autoComplete="email"
                  margin="normal"
                  error={formValidation.emailInUse || formValidation.emailInvalid}
                  helperText={
                    formValidation.emailInvalid
                      ? 'Please enter a valid email address'
                      : formValidation.emailInUse
                      ? 'Account exists with this email address'
                      : ''
                  }
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
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
          </>
        )}
      </Grid>
    </main>
  );
}

ChangeEmail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangeEmail);
