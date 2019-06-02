import axios from 'axios';
import React, { memo, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, Paper, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { AuthContext } from '../components/AuthContext';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: theme.spacing(5, 0, 5, 0),
  },
  buttonProgress: {
    color: 'black',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
});

function DropDetails(props) {
  const { token, user } = useContext(AuthContext);
  const {
    classes,
    name,
    description,
    price,
    purchaseDate,
    creator,
    participants,
    id,
    updateDropDetails,
  } = props;

  const joined = participants.includes(user.userId);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (joined) {
      try {
        await axios.post('/api/drops/leave', { id }, config);
      } catch {
        (() => {})(setLoading(false));
      }
    } else {
      try {
        await axios.post('/api/drops/join', { id }, config);
      } catch {
        (() => {})(setLoading(false));
      }
    }
    await updateDropDetails();
    setLoading(false);
  };

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">
        {name}
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography component="p">{description}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography component="p">{`Creator: ${creator}`}</Typography>
          <Typography component="p">{`Price: ${price}`}</Typography>
          <Typography component="p">
            {`Drop ends: ${Intl.DateTimeFormat().format(new Date(purchaseDate))}`}
          </Typography>
        </Grid>
        {user ? (
          <Grid item xs={12} md={4}>
            <div className={classes.wrapper}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {participants.includes(user.userId) ? 'Leave the drop' : 'Join now!'}
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  );
}

DropDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  purchaseDate: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  updateDropDetails: PropTypes.func.isRequired,
};

export default memo(withStyles(styles)(DropDetails));
