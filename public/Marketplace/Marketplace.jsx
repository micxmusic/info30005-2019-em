import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Popover from './PopOver';
import axios from 'axios';

import { Helmet } from 'react-helmet/es/Helmet';
import Paper from '@material-ui/core/Paper';
import { List } from '@material-ui/core';
import MarketplaceDrop from './MarketplaceDrop';
import DropDetails from 'C:/Users/meagh/Desktop/info30005-2019-em/public/Drops/DropDetails.jsx'
import PopOver from './PopOver';
import { Description } from '@material-ui/icons';
import CenteredCircularProgress from '../components/CenteredCircularProgress';


const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Marketplace(props) {
  const {
    match: { params },
    classes,
  } = props;

  const [dropData,name, description, price, purchaseDate, creator] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        // await the result for all API calls run asynchronously (Promise.all)
        const [details] = await Promise.all([
          axios.get(`/api/drops/mostRecent`, { cancelToken: source.token }),
        ]);
        name = details.name;
        description = details.description;
        price = details.price;
        purchaseDate = details.purchaseDate;
        creator = details.creator;
        
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
        }
      }
    })();
    // equivalent to componentDidUnmount
    return () => {
      // cancel API requests when component unmounted
      source.cancel();
    };
    // only update if params.dropID (/drops/dropID in url) changes
  }, [params.dropId]); // shouldComponentUpdate equivalent check


  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Marketplace
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Welcome to the Marketplace
            </Typography>
            

            <div className={classes.heroButtons} />
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
          
            {cards.map(card => (
              <Grid item key={card} sm={6} md={4} lg={3}>
              {!dropData ? (
          <CenteredCircularProgress />
        ) : (
                <MarketplaceDrop {...creator} {...name} {...price} {...description}/>
        )}
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
    </React.Fragment>
  );
}

Marketplace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Marketplace);