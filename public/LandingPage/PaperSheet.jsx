import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core';

// start of paper code
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function PaperSheet(props) {
  const { classes, titleText, bodyText } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {titleText}
        </Typography>
        <Typography component="p">{bodyText}</Typography>
      </Paper>
    </div>
  );
}
PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  titleText: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
};

export default withStyles(styles)(PaperSheet);
