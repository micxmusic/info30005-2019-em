import React from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import DropDetails from './DropDetails';
import image from '../Images/boxed-water-is-better-1463986-unsplash.jpg';

import testDrop from './TestDropInformation.json';

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
});

function Drops(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Helmet>
        <title>Sustineo - Drops</title>
      </Helmet>
      <div className={classNames(classes.layout)}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <img style={{ 'max-width': '100%', 'max-height': '50vh' }} src={image} alt="food" />
          </Grid>
          <Grid item xs={12}>
            <DropDetails {...testDrop} />
          </Grid>
          <Grid item xs={12}>
            <Typography>comments section</Typography>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
Drops.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Drops);
