import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 0}px ${theme.spacing.unit * 10}px ${theme.spacing.unit * 10}px  ${theme.spacing.unit * 10}px`,
  },
});

function PaperSheet(props) {
  const { classes, dropName, dropDetails } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {dropName}
        </Typography>
        <Typography component="p">{dropDetails}</Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  dropName: PropTypes.string.isRequired,
  dropDetails: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
