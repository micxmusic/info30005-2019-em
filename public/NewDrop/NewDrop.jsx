import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  layout: {
    width: 'auto',
    padding: `${theme.spacing.unit * 5}px 0 ${theme.spacing.unit * 6}px`,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 16,
  },
});

function NewDrop(props) {
  const { classes, name, price, purchaseDate, creator, description, image } = props;
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <React.Fragment>
      <form>
        <Grid container className={classes.layout}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-dense"
                label="Item Name"
                fullWidth
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-dense"
                label="Price"
                fullWidth
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-dense"
                label="Purchase Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-dense"
              label="Description"
              multiline
              rows="4"
              fullWidth
              className={classNames(classes.textField, classes.dense)}
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" className={classes.button}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default withStyles(styles)(NewDrop);
