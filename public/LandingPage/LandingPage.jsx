import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import FullWidthTabs from './FullWidthTabs';
import TitleBarGridList from './TitleBarGridList';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 5}px ${0}px ${theme.spacing.unit * 5}px  ${0}px`,
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
            <Typography variant="h3">Welcome to Sustineo!</Typography>
            <br />
            <Typography variant="body1">
              Our goal is to redefine the way people look at buying and using foods, so that we can
              create a less wasteful, communal way of eating for everyone.
            </Typography>
            <br />
            <br />
            <Typography variant="h4">Some of our latest drops!</Typography>
            {/*<PaperSheet
              titleText="Welcome to Sustineo!"
              bodyText="Our goal is to redefine the way people look at buying and using foods, so that we can create a less wasteful, communal way of eating for everyone."
            />*/}
            <TitleBarGridList />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FullWidthTabs tabOneText="Sign In" tabTwoText="Register" zIndex="modal" />
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
