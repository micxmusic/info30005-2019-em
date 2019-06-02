import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import Login from './Login';
import Register from './Register';

// Defines a tab component where different pages can be accessed via tabs
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    // paddingBottom: theme.spacing(2),
    margin: theme.spacing(9, 12, 1, 1),
  },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  // Functions to handle changes of state
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { theme, tabOneText, tabTwoText } = this.props;
    // Start code to produce tabs and containers
    const { value } = this.state;
    return (
      // Defines tabs at the top
      <>
        <AppBar position="relative" color="default" style={{ zIndex: '0' }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label={tabOneText} />
            <Tab label={tabTwoText} />
          </Tabs>
        </AppBar>
        {/* Handles the changes of state when swiping or clicking */}
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            {/* Places the sign in form in one tab */}
            <Login />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {/* Places the register form in one tab */}
            <Register />
          </TabContainer>
        </SwipeableViews>
      </>
    );
  }
}

FullWidthTabs.propTypes = {
  tabOneText: PropTypes.string.isRequired,
  tabTwoText: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
