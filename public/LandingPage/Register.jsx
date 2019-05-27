import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import { AuthContext } from '../components/AuthContext';

const styles = theme => ({
  main: {
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block', // Fix IE 11 issue.
  },
  paper: {
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
  buttonProgress: {
    color: 'black',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
});

function Register(props) {
  const { classes, history } = props;
  const [formData, setFormData] = useState({ name: '', password: '', email: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [formValidation, setFormValidation] = useState({
    emailInUse: false,
    emailInvalid: false,
    shortPassword: false,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  });

  const onFormChange = async event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    switch (name) {
      case 'email':
        setFormValidation({ ...formValidation, emailInUse: false });
        if (formValidation.emailInvalid) {
          setFormValidation({ ...formValidation, emailInvalid: !isEmail(value) });
        }
        break;
      case 'password':
        if (formValidation.shortPassword) {
          setFormValidation({ ...formValidation, shortPassword: !isLength(value, { min: 6 }) });
        }
        break;
      default:
        break;
    }
  };

  const validateForm = async event => {
    event.preventDefault();
    setLoading(true);
    const validate = {
      emailInvalid: !isEmail(formData.email),
      shortPassword: !isLength(formData.password, { min: 6 }),
    };
    const invalid = !Object.keys(validate).every(k => !validate[k]);
    setFormValidation(validate);

    if (invalid) {
      setSnackbar({ open: true, message: 'Please check your details' });
      setLoading(false);
      return;
    }
    try {
      await axios.post('/api/register', {
        username: formData.email,
        name: formData.name,
        password: formData.password,
      });
      setLoading(false);
      history.push('/login');
    } catch (err) {
      setLoading(false);
      if (err.response.status === 409) {
        setFormValidation({ emailInUse: true });
        setSnackbar({ open: true, message: 'Email already in use' });
      } else {
        setSnackbar({ open: true, message: 'Server error' });
      }
    }
  };

  const handleClose = () => {
    setSnackbar({ open: false });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={validateForm}>
          <TextField
            margin="normal"
            required
            fullWidth
            error={formValidation.emailInUse || formValidation.emailInvalid}
            helperText={
              formValidation.emailInvalid
                ? 'Please enter a valid email address'
                : formValidation.emailInUse
                ? 'Account exists with this email address'
                : ''
            }
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            onChange={onFormChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            label="Full Name"
            autoComplete="name"
            onChange={onFormChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            error={formValidation.shortPassword}
            helperText="Minimum 6 characters"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            id="password"
            name="password"
            label="Password"
            autoComplete="current-password"
            onChange={onFormChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Toggle password visibility" onClick={togglePassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </form>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbar.message}
      />
    </main>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Register));
