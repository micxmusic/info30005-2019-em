import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Avatar from './Avatar';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 5}px ${0}px ${theme.spacing.unit * 5}px  ${0}px`,
  },
});
function LandingPage(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Helmet>
        <meta charset="utf-8" />
        <title>Sustineo</title>
      </Helmet>
      <div className={classes.layout}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Avatar />
          </Grid>
          <Grid item xs={12} sm={6} />
        </Grid>
      </div>
    </React.Fragment>
  );
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
