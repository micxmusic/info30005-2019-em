import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Link from '@material-ui/core/Link';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

// Theme settings in order to keep the title bar spaced appropriately
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 9}px ${theme.spacing.unit * 5}px ${theme.spacing.unit *
      9}px  ${theme.spacing.unit * 20}px`,
  },
  gridList: {
    width: 500,
    height: 450,
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
const tileData = [];

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
    <div className={classes.root}>
      {/* Creating the grid */}
      <GridList cellHeight={160} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader color="inherit" component="div" align="right">
            Some of our latest drops!
          </ListSubheader>
        </GridListTile>
        {/*  Show a loading symbol if drops don't load else, if drop array loads, feed it into the tiles */}
        {!dropData ? (
          <CenteredCircularProgress />
        ) : (
          dropData.details.map(tile => (
            <GridListTile key={tile.image}>
              <img src={tile.image} alt={tile.name} />
              {/* Feed relevant drop details in from data base, and link tile to the drop's page */}
              <Link href={`/drop/${tile._id}`} className={classes.link}>
                <GridListTileBar
                  title={tile.name}
                  subtitle={<span>by: {tile.creator}</span>}
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </Link>
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
