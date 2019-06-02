import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
import DropCard from './DropCard';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(3 * 2))]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

function MarketplaceResults(props) {
  const { classes, cardsData } = props;
  return (
    <div className={classes.layout}>
      <Grid container spacing={4}>
        {!cardsData ? (
          <CenteredCircularProgress />
        ) : (
          cardsData.map(card => (
            <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
              <DropCard {...card} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}

MarketplaceResults.propTypes = {
  classes: PropTypes.object.isRequired,
  cardsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(MarketplaceResults);
