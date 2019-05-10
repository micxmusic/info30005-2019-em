import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function MarketplaceDrop(props) {

  const { classes} = props;
  const dropId= props.dropId;
  const name= props.name;
  const creator= props.creator;
  const price = props.price;

 // const {price}= props.price;


  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="p">{`Name: ${name}`}</Typography>
        <Typography component="p">{`Creator: ${creator}`}</Typography>
         <Typography component="p">{`Price: ${price}`}</Typography>
        
        
      </CardContent>
      <CardActions>
        <Button size="small">Go to Drop</Button>
      </CardActions>
    </Card>
  );
}

MarketplaceDrop.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  
  creator: PropTypes.string.isRequired,
  
};

export default withStyles(styles)(MarketplaceDrop);