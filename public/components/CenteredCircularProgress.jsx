import React, { memo } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    height: '100vh',
  },
};

export default memo(
  withStyles(styles)(function CenteredCircularProgress(props) {
    const { classes } = props;
    return (
      <Grid className={classes.root} container alignItems="center" justify="center">
        <CircularProgress />
      </Grid>
    );
  })
);
