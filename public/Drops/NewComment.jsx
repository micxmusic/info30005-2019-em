import axios from 'axios';
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ListItem } from '@material-ui/core';
import image from '../Images/cat.jpg';

const styles = theme => ({
  root: {
    // ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function NewComment(props) {
  const { classes, dropId, updateCommentList } = props;
  const [formData, setFormData] = useState({ comment: '' });

  const handleChange = event => {
    setFormData({ [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post('/api/comments', {
        userId: '5ca1b58d1c9d440000c6d7e1',
        dropId,
        content: formData.comment,
      });
      setFormData({ comment: '' });
      await updateCommentList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ListItem>
      <Grid container>
        <Grid item>
          <ListItemIcon className={classes.root}>
            <ListItemAvatar>
              <Avatar src={image} alt="cat" />
            </ListItemAvatar>
          </ListItemIcon>
        </Grid>
        <Grid item xs={12} sm={9}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="comment-box"
              name="comment"
              multiline
              fullWidth
              required
              rows="4"
              placeholder="Type your comment here"
              value={formData.comment}
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            <div align="right">
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Post
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </ListItem>
  );
}

NewComment.propTypes = {
  classes: PropTypes.object.isRequired,
  dropId: PropTypes.string.isRequired,
  updateCommentList: PropTypes.func.isRequired,
};

export default memo(withStyles(styles)(NewComment));
