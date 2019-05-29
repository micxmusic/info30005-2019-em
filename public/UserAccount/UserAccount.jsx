import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Avatar from './Avatar';
import Chip from '@material-ui/core/Chip';
import ProfileTabs from './ProfileTabs';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 7}px ${theme.spacing.unit *
      5}px  ${theme.spacing.unit * 10}px`,
  },
  layout: {
    ...theme.mixins.gutters(),
    width: 'auto',
    margin: '0 auto 0 auto',
    padding: `${theme.spacing.unit * 6}px 0 ${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginTop: theme.spacing.unit * 10,
    },
    avatar: {
      margin: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 10}px ${theme.spacing.unit *
        5}px  ${0}px`,
      width: 100,
    },
    chip: {
      margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px ${theme.spacing.unit *
        3}px  ${theme.spacing.unit * 11}px`,
    },
    Paper: {
      margin: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 1}px ${0}px  ${theme.spacing
        .unit * 5}px`,
    },
    Profile: {
      margin: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 1}px ${0}px  ${theme.spacing
        .unit * 5}px`,
    },
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
        <Grid container spacing={16} direction="row">
          <Grid item xs={12} sm={4}>
            <Avatar className={classes.avatar} />
            {/* <Chip label="User name goes here" className={classes.chip} />
            <Chip label="user email goes here" className={classes.chip} /> */}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography align="center" variant="h2" className={classes.typography}>
              Account Settings
            </Typography>
            <ProfileTabs className={classes.Profile} />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
