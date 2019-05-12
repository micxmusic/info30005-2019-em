import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet/es/Helmet';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import PaperSheet from './PaperSheet';
import FullWidthTabs from './FullWidthTabs';
import TitleBarGridList from './TitleBarGridList';

var bg = require('./Pictures/background.jpg');

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 5}px ${0}px ${theme.spacing.unit * 0}px  ${0}px`,
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
});
function LandingPage(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <div
        className="background-image"
        style={{
          backgroundImage: 'url(' + bg + ')',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* <Paper style={styles.paperContainer}> */}
        <Helmet>
          <meta charset="utf-8" />
          <title>Sustineo</title>
        </Helmet>
        <div className={classNames(classes.layout)}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <PaperSheet
                titleText="Welcome to Sustineo!"
                bodyText="Our goal is to redefine the way people look at buying and using foods, so that we can create a less wasteful, communal way of eating for everyone."
              />
              <TitleBarGridList />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FullWidthTabs tabOneText="Sign In" tabTwoText="Register" zIndex="modal" />
            </Grid>
          </Grid>
        </div>
        {/* </Paper> */}
      </div>
    </React.Fragment>
  );
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
