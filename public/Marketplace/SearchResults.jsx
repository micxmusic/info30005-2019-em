import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { AuthContext } from '../components/AuthContext';
import image from './Pictures/market.png';
import MarketplaceResults from './MarketplaceResults';

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
  Picture: {
    paddingLeft: theme.spacing(8),
    align: 'center',
    width: '90%',
  },
});

function Marketplace(props) {
  const {
    classes,
    match: { params },
  } = props;

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
        // await the result for all API calls run asynchronously
        const allDrops = await axios.get(`/api/drops/byName/${params.searchTerm}`, config);
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
  }, [params.searchTerm, token]); // shouldComponentUpdate equivalent check

  function marketPlaceHeader() {
    return (
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <img className={classes.Picture} alt="Marketplace" src={image} />
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Marketplace
          </Typography>
          <Typography variant="h6" style={{ textAlign: 'center' }} color="textSecondary" paragraph>
            Welcome to the Marketplace
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Helmet title="Sustineo - Marketplace" />
      {marketPlaceHeader()}
      <MarketplaceResults cardsData={cardsData} />
    </React.Fragment>
  );
}

Marketplace.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(Marketplace);
