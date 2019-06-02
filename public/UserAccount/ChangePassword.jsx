import axios from 'axios';
import isLength from 'validator/lib/isLength';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthContext } from '../components/AuthContext';

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 3, 3, 0),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  buttonProgress: {
    color: 'black',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
});

function ChangePassword(props) {
  const { classes } = props;
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '' });
  const [formValidation, setFormValidation] = useState({
    passwordShort: false,
    wrongPassword: false,
  });

  const source = axios.CancelToken.source();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cancelToken: source.token,
  };

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'oldPassword':
        setFormValidation({ ...formValidation, wrongPassword: false });
        break;
      case 'newPassword':
        setFormValidation({ ...formValidation, newPassword: !isLength(value, { min: 6 }) });
        break;
      default:
        break;
    }
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = async event => {
    event.preventDefault();
    setUpdateSuccess(false);
    setLoading(true);
    const validate = {
      wrongPassword: false,
      passwordShort: !isLength(formData.newPassword, { min: 6 }),
    };
    const invalid = !Object.keys(validate).every(k => !validate[k]);
    setFormValidation(validate);
    if (invalid) {
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        '/api/account/changePassword',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        config
      );
      setUpdateSuccess(true);
    } catch (err) {
      if (err.response.status === 403) {
        setFormValidation({ wrongPassword: true });
      }
    }
    setLoading(false);
  };

  return (
    <main className={classes.main}>
      <Grid container className={classes.root} spacing={2}>
        <Typography variant="body1">Enter current password to proceed</Typography>
        <form className={classes.form} onSubmit={validateForm}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            id="currentPassword"
            label="Current Password"
            className={classes.textField}
            type="password"
            name="currentPassword"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            error={formValidation.wrongPassword}
            helperText={formValidation.wrongPassword ? 'Current password did not match' : ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            id="newPassword"
            label="New Password"
            className={classes.textField}
            type="password"
            name="newPassword"
            autoComplete="new-password"
            margin="normal"
            variant="outlined"
            error={formValidation.passwordShort}
            helperText="Minimum 6 characters"
            onChange={handleChange}
            fullWidth
          />
          {updateSuccess ? <Typography>Password changed successfully!</Typography> : null}
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Submit
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </form>
      </Grid>
    </main>
  );
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangePassword);
