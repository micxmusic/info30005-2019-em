import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Avatar from './Avatar';
import ProfileTabs from './ProfileTabs';
import { AuthContext } from '../components/AuthContext';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: theme.spacing(5, 7, 5, 10),
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
  },
  avatar: {
    margin: theme.spacing(5, 10, 5, 0),
    width: 100,
  },
  Profile: {
    margin: theme.spacing(5, 1, 0, 5),
  },
  typography: {
    textAlign: 'center',
  },
});

function UserAccount(props) {
  const { classes } = props;
  const { user } = useContext(AuthContext);
  return (
    <React.Fragment>
      <Helmet title={'Sustineo - Account Settings - '.concat(user.name)} />
      <div className={classes.layout}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Avatar className={classes.avatar} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h2" className={classes.typography}>
                  Account Settings
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ProfileTabs className={classes.Profile} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

UserAccount.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAccount);
