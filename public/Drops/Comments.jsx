import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ListItem, ListItemText } from '@material-ui/core';
import image from '../Images/cat.jpg';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `${0}px ${0}px ${0}px  ${0}px`,
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
  const { classes, user, timeOfPost, content } = props;

  return (
    <ListItem>
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
            primary={user}
            secondary={content}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography component="p" align="right">
            {timeOfPost}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  timeOfPost: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);
