import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: theme.spacing(5, 0, 5, 0),
  },
});

function DropDetails(props) {
  const { classes, name, description, price, purchaseDate, creator } = props;
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">
        {name}
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography component="p">{description}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography component="p">{`Creator: ${creator}`}</Typography>
          <Typography component="p">{`Price: ${price}`}</Typography>
          <Typography component="p">
            {`Drop ends: ${Intl.DateTimeFormat().format(new Date(purchaseDate))}`}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

DropDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  purchaseDate: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
};

export default memo(withStyles(styles)(DropDetails));
