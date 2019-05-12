import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
// import { AuthContext } from '../components/AuthContext';
import DropCard from './DropCard';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

const styles = theme => ({
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
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
});

function Marketplace(props) {
  const {
    match: { params },
    classes,
  } = props;

  // const { token } = useContext(AuthContext);

  const [cardsData, setCardsData] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = {
      // headers: {
      // Authorization: `Bearer ${token}`,
      // },
    };
    (async () => {
      try {
        // await the result for all API calls run asynchronously (Promise.all)
        const allDrops = await axios.get(`/api/drops`, { cancelToken: source.token });
        setCardsData(allDrops.data);
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
  }, []); // shouldComponentUpdate equivalent check

  return (
    <React.Fragment>
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

        <Grid container spacing={32}>
          {!cardsData ? (
            <CenteredCircularProgress />
          ) : (
            cardsData.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
                <DropCard {...card} key={card._id} />
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
