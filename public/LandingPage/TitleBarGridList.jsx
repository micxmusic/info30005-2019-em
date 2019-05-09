import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import image from './Pictures/tomatos.jpg';
import image1 from './Pictures/carrots.jpg';
import image2 from './Pictures/cherries.jpg';
import image3 from './Pictures/onion.jpg';
import Link from '@material-ui/core/Link';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 9}px ${theme.spacing.unit * 9}px ${theme.spacing.unit *
      5}px  ${theme.spacing.unit * 1}px`,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

/**
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
const tileData = [
  {
    img: image,
    title: 'Fresh Tomatoes at Vic Market',
    author: 'freshfoodie48',
  },
  {
    img: image1,
    title: 'Carrots at local Sunday Market',
    author: 'sallyM',
  },
  {
    img: image2,
    title: 'Cherries for sale',
    author: 'test',
  },
];

function TitlebarGridList(props) {
  const { classes } = props;

  const [dropData, setDropData] = useState(null);
  // getting stuff
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
      {/* <Paper className={classes.paper}> */}
      <GridList cellHeight={180} className={classes.gridList}>
        {!dropData ? (
          <CenteredCircularProgress />
        ) : (
          dropData.details.map(tile => (
            <GridListTile key={tile.image}>
              <img src={tile.image} alt={tile.name} />
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
      {/* </Paper> */}
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
