import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import image from '../Images/cat.jpg';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  listItemPrimaryText: {
    fontSize: '0.7em',
    color: 'grey',
  },
  listItemSecondaryText: {
    fontSize: '1em',
    color: 'black',
  },
});

function Comment(props) {
  const { classes, name, timeOfPost, content } = props;
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <ListItem key={timeOfPost}>
      <Grid container>
        <ListItemIcon>
          <ListItemAvatar>
            <Avatar src={image} alt="cat" />
          </ListItemAvatar>
        </ListItemIcon>
        <Grid item xs={12} sm={9}>
          <ListItemText
            classes={{
              primary: classes.listItemPrimaryText,
              secondary: classes.listItemSecondaryText,
            }}
            primary={name}
            secondary={content}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography component="p" style={{ textAlign: 'right' }}>
            {Intl.DateTimeFormat('en-AU', options).format(new Date(timeOfPost))}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  timeOfPost: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default memo(withStyles(styles)(Comment));
