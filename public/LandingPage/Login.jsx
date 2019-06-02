import axios from 'axios';
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
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
    padding: theme.spacing(2, 3, 3, 2),
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

function Login(props) {
  const { classes, history } = props;
  const [formData, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [loading, setLoading] = useState(false);

  const { setUser, setToken } = useContext(AuthContext);

  const onFormChange = async event => {
    const { target } = event;
    const { name, value } = target;
    setForm({ ...formData, [name]: value });
  };

  const submitForm = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/login', {
        username: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      setToken(res.data.token);
      setLoading(false);
      history.push('/');
    } catch (err) {
      setLoading(false);
      setSnackbar({ open: true, message: err });
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setSnackbar({ open: false });
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submitForm}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Email Address</InputLabel>
            <Input
              error={snackbar.open}
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onFormChange}
            />
          </FormControl>
          <TextField
            required
            fullWidth
            error={snackbar.open}
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
              Sign in
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </form>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Invalid username or password"
      />
    </main>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Login));
