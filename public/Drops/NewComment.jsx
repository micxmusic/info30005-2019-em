import axios from 'axios';
import React, { memo, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import image from '../Images/cat.jpg';
import { AuthContext } from '../components/AuthContext';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function NewComment(props) {
  const { classes, dropId, updateCommentList } = props;
  const [formData, setFormData] = useState({ comment: '' });
  const { token } = useContext(AuthContext);

  const handleChange = event => {
    setFormData({ [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(
        '/api/comments',
        {
          dropId,
          content: formData.comment,
        },
        config
      );
      setFormData({ comment: '' });
      await updateCommentList();
    } catch {
      (() => {})();
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
            <div style={{ textAlign: 'right' }}>
              <Button type="submit" variant="contained" color="primary">
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
