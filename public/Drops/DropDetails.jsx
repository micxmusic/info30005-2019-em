import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import DropInformation from './DropInformation';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 5}px ${0}px ${theme.spacing.unit * 5}px  ${0}px`,
  },
});

function PaperSheet(props) {
  const { classes, name, description, price, purchaseDate, creator } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">
        {name}
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Typography component="p">{description}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography component="p">{`Creator: ${creator}`}</Typography>
          <Typography component="p">{`Price: ${price}`}</Typography>
          <Typography component="p">{`Drop ends: ${purchaseDate}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography component="p">INSERT LIST OF VOLUNTEERS HERE</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
  description: PropTypes.object.isRequired,
  price: PropTypes.object.isRequired,
  purchaseDate: PropTypes.object.isRequired,
  creator: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
