import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { AuthContext } from '../components/AuthContext';
import DropCard from './DropCard';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

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
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: theme.spacing(8, 0, 6, 0),
  },
});

function Marketplace(props) {
  const { classes } = props;

  const { token } = useContext(AuthContext);

  const [cardsData, setCardsData] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    };
    (async () => {
      try {
        // await the result for all API calls run asynchronously (Promise.all)
        const allDrops = await axios.get(`/api/drops`, config);
        setCardsData(allDrops.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          (() => {})();
        }
      }
    })();
    // equivalent to componentDidUnmount
    return () => {
      // cancel API requests when component unmounted
      source.cancel();
    };
    // only update if params.dropID (/drops/dropID in url) changes
  }, [token]); // shouldComponentUpdate equivalent check

  return (
    <React.Fragment>
      <Helmet title="Sustineo - Marketplace" />
      {/* Hero unit */}
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Typography
            component="h1"
            variant="h2"
            style={{ textAlign: 'center' }}
            color="textPrimary"
            gutterBottom
          >
            Marketplace
          </Typography>
          <Typography variant="h6" style={{ textAlign: 'center' }} color="textSecondary" paragraph>
            Welcome to the Marketplace
          </Typography>
        </div>
      </div>
      {/* End hero unit */}
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
    </React.Fragment>
  );
}

Marketplace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Marketplace);
