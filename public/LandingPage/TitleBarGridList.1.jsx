import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import image from './Pictures/tomatos.jpg';
import image1 from './Pictures/carrots.jpg';
import image2 from './Pictures/cherries.jpg';
import image3 from './Pictures/onion.jpg';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingBottom: theme.spacing.unit * 2,
    margin: `${theme.spacing.unit * 9}px ${theme.spacing.unit * 9}px ${theme.spacing.unit *
      5}px  ${theme.spacing.unit * 3}px`,
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
  {
    img: image3,
    title: 'Onions for sale',
    author: 'test1',
  },
];
function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {/* <Paper className={classes.paper}> */}
      <GridList cellHeight={180} className={classes.gridList}>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      {/* </Paper> */}
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
