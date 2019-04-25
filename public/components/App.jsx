import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AppBar from './AppBar';
import Routes from './Routes';
import GlobalTheme from '../GlobalTheme';

const styles = {
  root: {
    marginTop: 48,
  },
};

function App(props) {
  const { classes } = props;
  return (
    <ThemeProvider theme={GlobalTheme}>
      <CssBaseline />
      <AppBar />
      <div className={classes.root}>
        <Routes />
      </div>
    </ThemeProvider>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
