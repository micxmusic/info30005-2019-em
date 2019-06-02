import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import FullWidthTabs from './FullWidthTabs';
import TitleBarGridList from './TitleBarGridList';
import image from './Pictures/hamburg.png';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing(2, 0, 2, 0),
    margin: theme.spacing(5, 0, 5, 0),
  },
  layout: {
    ...theme.mixins.gutters(),
    width: 'auto',
    margin: '0 auto 0 auto',
    padding: theme.spacing(6, 0, 6, 0),
    [theme.breakpoints.up(1100 + theme.spacing(3 * 2))]: {
      width: 1100,
      marginTop: theme.spacing(10),
    },
    Picture: {
      paddingLeft: theme.spacing.unit * 10,
    },
  },
});

function LandingPage(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Helmet title="Sustineo" />
      <div className={classes.layout}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3">Welcome to Sustineo!</Typography>
            <br />
            <Typography variant="body1">
              Our goal is to redefine the way people look at buying and using foods, so that we can
              create a less wasteful, communal way of eating for everyone.
            </Typography>
            <br />
            <br />
            <Typography variant="h4">Some of our latest drops!</Typography>
            <TitleBarGridList />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FullWidthTabs tabOneText="Sign In" tabTwoText="Register" zIndex="modal" />
            <img className={classes.Picture} src={image} width="80%" flexDirection="row-reverse" />
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
