import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

// Theme settings in order to keep the title bar spaced appropriately
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingTop: theme.spacing(1),
  },
  gridList: {
    width: '100%',
    height: 408,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

/** For static data, just in case
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

// Optional array for including static data
// const tileData = [];

// Beginning of the sample drops on the landing page
function TitlebarGridList(props) {
  const { classes } = props;

  const [dropData, setDropData] = useState(null);
  // getting data from the database
  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        // await the result for all API calls run asynchronously (Promise.all)
        const [details] = await Promise.all([
          axios.get(`/api/drops/mostRecent`, { cancelToken: source.token }),
        ]);
        setDropData({ details: details.data });
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
  }, []); // shouldComponentUpdate equivalent check

  return (
    <div className={classes.root}>
      {/* Creating the grid */}
      <GridList cellHeight={200} className={classes.gridList}>
        {/*  Show a loading symbol if drops don't load else, if drop array loads, feed it into the tiles */}
        {!dropData ? (
          <CenteredCircularProgress />
        ) : (
          dropData.details.map(tile => (
            <GridListTile key={tile.id} component={Link} to={`/drop/${tile.id}`}>
              <img src={tile.image} alt={tile.name} />
              {/* Feed relevant drop details in from data base, and link tile to the drop's page */}
              <GridListTileBar
                title={tile.name}
                subtitle={<span>by:{tile.creator}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <Info />
                  </IconButton>
                }
              />
            </GridListTile>
          ))
        )}
      </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
