import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core';

// start of paper code
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 9}px ${theme.spacing.unit * 20}px ${theme.spacing.unit *
      9}px  ${theme.spacing.unit * 14}px`,
  },
});
// Defines a paper sheet where text can be placed
function PaperSheet(props) {
  const { classes, titleText, bodyText } = props;
  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {titleText}
        </Typography>
        <Typography component="p">{bodyText}</Typography>
      </Paper>
    </React.Fragment>
  );
}
PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  titleText: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
};

export default withStyles(styles)(PaperSheet);
