import axios from 'axios';
import React, { memo, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Snackbar,
  SnackbarContent,
  TextField,
} from '@material-ui/core';
import { CheckCircle, Close, Error, Info, Warning } from '@material-ui/icons';
import { amber, green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import validator from 'validator';
import ReactS3Uploader from 'react-s3-uploader';
import { AuthContext } from '../components/AuthContext';

const styles = theme => ({
  layout: {
    width: 'auto',
    padding: `${theme.spacing.unit * 5}px 0 ${theme.spacing.unit * 6}px`,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 16,
  },
  progress: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    flexGrow: 1,
  },
});

const snackbarStyles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
});

const iconVariants = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

function UploadStatus(props) {
  const { classes, message, onClose, variant, ...other } = props;
  const Icon = iconVariants[variant];
  return (
    <SnackbarContent
      className={classes[variant]}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <Close className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

UploadStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const UploadStatusWrapper = withStyles(snackbarStyles)(UploadStatus);

function NewDrop(props) {
  const { classes, history } = props;
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    purchaseDate: '',
    description: '',
    image: '',
  });

  const [errorFlag, setErrorFlag] = useState(false);
  const [progress, setProgress] = useState(undefined);
  const [snackbar, toggleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [uploadDone, setUploadDone] = useState('secondary');

  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    toggleSnackbar(false);
  };

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === 'price') {
      setErrorFlag(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!validator.isCurrency(formData.price, { allow_negatives: false })) {
      setFormData({ ...formData, price: '' });
      setErrorFlag(true);
      return;
    }
    if (formData.image && progress !== 100) {
      setSnackbarMessage({ message: 'Image upload still in progress', variant: 'warning' });
      return;
    }
    try {
      const newDrop = await axios.post(
        '/api/drops',
        {
          name: formData.name,
          price: formData.price,
          purchaseDate: formData.purchaseDate,
          description: formData.description,
          image: formData.image,
        },
        config
      );
      history.push(`/drop/${newDrop.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  
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

  // File upload handlers
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
    <React.Fragment>
      <Helmet title="Sustineo - New Drop" />
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container className={classes.layout}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-dense"
                name="name"
                label="Item Name"
                fullWidth
                required
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-dense"
                name="price"
                label="Price"
                type="number"
                fullWidth
                required
                error={errorFlag}
                value={formData.price}
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-dense"
                name="purchaseDate"
                label="Purchase Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-dense"
              name="description"
              label="Description"
              multiline
              rows="4"
              fullWidth
              required
              className={classNames(classes.textField, classes.dense)}
              margin="dense"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.progress}>
              {progress === undefined ? null : (
                <LinearProgress color={uploadDone} variant="determinate" value={progress} />
              )}
            </div>
          </Grid>
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
          <Grid item>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <UploadStatusWrapper {...snackbarMessage} onClose={handleClose} />
      </Snackbar>
    </React.Fragment>
  );
}

NewDrop.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default memo(withStyles(styles)(NewDrop));
