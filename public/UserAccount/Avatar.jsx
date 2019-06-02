import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import img from '../Images/cat.jpg';

const styles = {
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200,
  },
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar alt="User Avatar" src={img} className={classes.bigAvatar} />
    </Grid>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);
