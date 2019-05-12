import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
  const { classes, _id, name, price, creator, image } = props;

  // const {price}= props.price;

  return (
    <Link to={`/drop/${_id}`} style={{ textDecoration: 'none' }}>
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
};

export default withStyles(styles)(DropCard);
