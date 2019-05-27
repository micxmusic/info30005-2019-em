import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  card: {
    minWidth: 200,
    minHeight: 270,
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
};

function DropCard(props) {
  const { classes, id, name, price, creator, image } = props;

  return (
    <Link to={`/drop/${id}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.card}>
        <CardMedia className={classes.cardMedia} image={image} />
        <CardContent>
          <Typography component="p">{`Name: ${name}`}</Typography>
          <Typography component="p">{`Creator: ${creator}`}</Typography>
          <Typography component="p">{`Price: ${price}`}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

DropCard.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  creator: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default withStyles(styles)(DropCard);
