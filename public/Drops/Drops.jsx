import React from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import DropDetails from './DropDetails';

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
        <Grid container spacing={16} justify="center">
          <Grid item xs={12}>
            <DropDetails dropName="Carrots" dropDetails="This is a carrot" />
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
