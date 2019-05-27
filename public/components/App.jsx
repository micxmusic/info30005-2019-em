// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AppBar from './AppBar';
import Routes from './Routes';
import GlobalTheme from '../GlobalTheme';
import { AuthProvider } from './AuthContext';

const styles = {
  root: {
    marginTop: 64,
  },
};

function App(props) {
  const { classes } = props;
  return (
    <ThemeProvider theme={GlobalTheme}>
      <CssBaseline />
      <AuthProvider>
        <AppBar />
        <div className={classes.root}>
          <HelmetProvider>
            <Routes />
          </HelmetProvider>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(hot(App));
