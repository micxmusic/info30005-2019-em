import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet/es/Helmet';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import GlobalStyle from '../GlobalStyle';
import Multiplying from './Multiplying';
import PaperSheet from './PaperSheet';
import SignIn from './SignIn';
import FullWidthTabs from './FullWidthTabs';
function LandingPage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Helmet>
        <meta charset="utf-8" />
        <title>Sustineo</title>
      </Helmet>
      <div className={classNames(classes.layout)}>
        <Grid container spacing={16} justify="space-around" direction="row" alignItems="center">
          <Grid item xs={7}>
            <PaperSheet
              titleText="Welcome to Sustineo!"
              bodyText="Our goal is to redefine the way people look at buying and using foods, so that we can create a less wasteful, communal way of eating for everyone."
            />
          </Grid>
          <Grid item xs={5}>
            <FullWidthTabs tabOneText="Sign In" tabTwoText="Register" />
          </Grid>
          {/* Unused buttons } <Grid item xs={3}>
            <Multiplying aboveButtonText="This is above" buttonText="button 1" />
          </Grid>
          <Grid item xs={2}>
            <Multiplying aboveButtonText="so is this!" buttonText="button 2" />
          </Grid> */}
        </Grid>
      </div>
    </React.Fragment>
  );
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(GlobalStyle)(LandingPage);
