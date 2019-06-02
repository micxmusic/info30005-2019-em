import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import ReactS3Uploader from 'react-s3-uploader';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 3, 3, 0),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

function ChangeAvatar(props) {
  const { classes } = props;
  const getSignedUrl = (file, callback) => {
    axios
      .post('/api/drops/signUpload', { fileType: file.type }, config)
      .then(res => {
        setFormData({ ...formData, image: res.data.url });
        callback(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const onUploadStart = (file, next) => {
    setSnackbarMessage({ message: 'Uploading image', variant: 'info' });
    toggleSnackbar(true);
    next(file);
  };
  const onUploadError = () => {
    setSnackbarMessage({ message: 'Image upload failed', variant: 'error' });
    toggleSnackbar(true);
  };
  const onUploadProgress = event => {
    setProgress(event);
  };
  const onUploadFinish = event => {
    setSnackbarMessage({ message: 'Image upload complete', variant: 'success' });
    setUploadDone('primary');
    setProgress(100);
  };
  return (
    <main className={classes.main}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item>
          <Typography variant="body1">Upload new Avatar</Typography>
        </Grid>
        <Grid item sm={12} xs={12}>
          <Button
            variant="contained"
            component="label"
            color="secondary"
            className={classes.button}
          >
            Upload Image
            <ReactS3Uploader
              getSignedUrl={getSignedUrl}
              accept="image/*"
              s3path="/"
              preprocess={onUploadStart}
              onError={onUploadError}
              onProgress={onUploadProgress}
              onFinish={onUploadFinish}
              contentDisposition="auto"
              style={{ display: 'none' }}
            />
          </Button>
        </Grid>
      </Grid>
    </main>
  );
}

ChangeAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangeAvatar);
