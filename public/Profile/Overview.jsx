import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Overview(props) {
  const { classes } = props;
  return (
    <Grid container className={classes.root} spacing={24}>
      <Grid container item xs={12} sm={6}>
        <Typography variant="h6">Points</Typography>
      </Grid>
      <Grid container item xs={12} sm={6}>
        <Typography variant="h6">Arriving Soon</Typography>
      </Grid>
    </Grid>
  );
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview);
