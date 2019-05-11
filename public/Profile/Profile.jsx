import React, { memo, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { Hidden, Paper, Tab, Tabs } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import BottomNav from './BottomNav';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

const Overview = React.lazy(() => import('./Overview'));

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 64,
  },
  tab: {
    '&:hover': {
      'background-color': '#f0f0f0',
      opacity: 1,
    },
  },
  tabContainer: {
    'max-width': 1100,
    margin: `${theme.spacing.unit * 2}px auto ${theme.spacing.unit * 2}px auto`,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down('md')]: {
      width: '90%',
      paddingBottom: '64px',
    },
  },
});

function TabContainer({ classes, children }) {
  return (
    <div className={classes.tabContainer}>
      <Paper>{children}</Paper>
    </div>
  );
}

TabContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

class Profile extends React.Component {
  state = {
    tab: 0,
  };

  handleChange = (event, value) => {
    this.setState({ tab: value });
  };

  handleChangeIndex = index => {
    this.setState({ tab: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { tab } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Sustineo - Profile</title>
        </Helmet>
        <Hidden mdDown>
          <Paper className={classes.root}>
            <Tabs
              value={tab}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab classes={{ root: classes.tab }} label="Overview" />
              <Tab classes={{ root: classes.tab }} label="Creator" />
              <Tab classes={{ root: classes.tab }} label="Volunteer" />
              <Tab classes={{ root: classes.tab }} label="Participant" />
            </Tabs>
          </Paper>
        </Hidden>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tab}
          onChangeIndex={this.handleChangeIndex}
        >
          <Suspense fallback={<CenteredCircularProgress />}>
            <TabContainer classes={classes}>
              <Overview />
            </TabContainer>
          </Suspense>

          <Suspense fallback={<CenteredCircularProgress />}>
            <TabContainer classes={classes}>
              <Overview />
            </TabContainer>
          </Suspense>

          <Suspense fallback={<CenteredCircularProgress />}>
            <TabContainer classes={classes}>
              <Overview />
            </TabContainer>
          </Suspense>

          <Suspense fallback={<CenteredCircularProgress />}>
            <TabContainer classes={classes}>
              <Overview />
            </TabContainer>
          </Suspense>
        </SwipeableViews>
        <Hidden lgUp>
          <BottomNav tab={tab} handleChange={this.handleChange} />
        </Hidden>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default memo(withStyles(styles, { withTheme: true })(Profile));
