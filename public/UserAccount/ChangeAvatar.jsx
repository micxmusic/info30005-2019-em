import React, { useState } from 'react';
import PropTypes, { func } from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactS3Uploader from 'react-s3-uploader';
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
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
      <CssBaseline />
      <Grid container className={classes.root} spacing={16}>
        <Grid item>
          <Typography component="body1">Upload new Avatar</Typography>
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
      {/* </Paper> */}
    </main>
  );
}

ChangeAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangeAvatar);
