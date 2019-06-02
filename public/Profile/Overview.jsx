import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Redeem } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

import { arriving, redeem } from './data';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    width: '95%',
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  card: {
    margin: 0,
    padding: 0,
  },
});

function Overview(props) {
  const { classes } = props;
  return (
    <Grid
      container
      spacing={5}
      className={classes.root}
      alignItems="flex-start"
      justify="space-around"
    >
      <Grid container item xs={12} sm={6} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">Points</Typography>
        </Grid>
        <Grid item xs={12}>
          <List>
            {redeem.map(item => (
              <ListItem disableGutters divider key={item.name}>
                <ListItemText>{item.name}</ListItemText>
                <ListItemSecondaryAction>
                  <Button variant="contained" color="primary">
                    <Redeem className={classes.leftIcon} />
                    {item.cost}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={6} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">Arriving Soon</Typography>
        </Grid>
        {arriving.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.name}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={item.image} title={item.name} />
              <CardContent>
                <Typography>{item.name}</Typography>
                <Typography>
                  {item.date.toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview);
