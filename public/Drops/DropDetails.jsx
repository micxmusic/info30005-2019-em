import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DropInformation from './DropInformation';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme.spacing.unit *
      5}px  ${theme.spacing.unit * 5}px`,
  },
});

function PaperSheet(props) {
  const { classes, dropName, dropDetails } = props;

  return (
    <React.Fragment>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h5" component="h3">
              {dropName}
            </Typography>
            {/* <DropInformation /> */}
            <Typography component="p">{dropDetails}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  dropName: PropTypes.string.isRequired,
  dropDetails: PropTypes.object.isRequired,
  // dropDetails: PropTypes.Dropinformation.isRequired,
};

export default withStyles(styles)(PaperSheet);
