import axios from 'axios';
import React, { memo, useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
  Typography,
} from '@material-ui/core';
import { CheckCircle, Close, Error, Info, Warning } from '@material-ui/icons';
import { amber, green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import isAfter from 'validator/lib/isAfter';
import isCurrency from 'validator/lib/isCurrency';
import isLength from 'validator/lib/isLength';
import ReactS3Uploader from 'react-s3-uploader';
import { AuthContext } from '../components/AuthContext';
import image from './Pictures/upload1.png';
const styles = theme => ({
  layout: {
    width: 'auto',
    padding: theme.spacing(5, 0, 6, 0),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(3 * 2))]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 16,
  },
  button: {
    marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    marginTop: 16,
  },
  progress: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  Picture: {
    marginLeft: theme.spacing.unit * 80,
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
    marginRight: theme.spacing(1),
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
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
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

  const [errorFlag, setErrorFlag] = useState({
    name: false,
    description: false,
    price: false,
    purchaseDate: false,
  });
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
    switch (event.target.name) {
      case 'price':
        setErrorFlag({
          ...errorFlag,
          price: !isCurrency(event.target.value, { allow_negatives: false }),
        });
        break;
      case 'name':
        setErrorFlag({ ...errorFlag, name: !isLength(event.target.value, { max: 100 }) });
        break;
      case 'purchaseDate':
        setErrorFlag({
          ...errorFlag,
          purchaseDate: !isAfter(event.target.value.toString()),
        });
        break;
      case 'description':
        setErrorFlag({
          ...errorFlag,
          description: !isLength(event.target.value, { max: 500 }),
        });
        break;
      default:
        break;
    }
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validate = {
      name: !isLength(formData.name, { max: 100 }),
      description: !isLength(formData.description, { max: 500 }),
      purchaseDate: !isAfter(formData.purchaseDate.toString()),
      price: !isCurrency(formData.price, { allow_negatives: false }),
    };
    const invalid = !Object.keys(validate).every(k => !validate[k]);
    setErrorFlag(validate);
    if (invalid) {
      setSnackbarMessage({ message: 'Please check the form details', variant: 'warning' });
      toggleSnackbar(true);
      return;
    }
    if (formData.image && progress !== 100) {
      setSnackbarMessage({ message: 'Image upload still in progress', variant: 'warning' });
      toggleSnackbar(true);
      return;
    }
    if (!formData.image) {
      setSnackbarMessage({ message: 'Please upload an image', variant: 'warning' });
      toggleSnackbar(true);
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
      history.push(`/drop/${newDrop.data.id}`);
    } catch (err) {
      (() => {})();
    }
  };

  const getSignedUrl = async (file, callback) => {
    try {
      const res = await axios.post('/api/drops/signUpload', { fileType: file.type }, config);
      setFormData({ ...formData, image: res.data.url });
      return callback(res.data);
    } catch {
      return null;
    }
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
  const onUploadFinish = () => {
    setSnackbarMessage({ message: 'Image upload complete', variant: 'success' });
    setUploadDone('primary');
    setProgress(100);
  };

  return (
    <React.Fragment>
      <Helmet title="Sustineo - New Drop" />
      <Grid container className={classes.layout}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2">Add New Drop</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-dense"
                name="name"
                label="Item Name"
                fullWidth
                required
                error={errorFlag.name}
                helperText={errorFlag.name ? 'Item name has to be less than 100 characters' : null}
                className={clsx(classes.textField, classes.dense)}
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
                error={errorFlag.price}
                helperText={errorFlag.price ? 'Price invalid' : null}
                value={formData.price}
                className={clsx(classes.textField, classes.dense)}
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
                error={errorFlag.purchaseDate}
                helperText={errorFlag.purchaseDate ? 'Purchase date has to be in the future' : null}
                className={clsx(classes.textField, classes.dense)}
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
              error={errorFlag.description}
              helperText={
                errorFlag.description ? 'Item description has to be less than 500 characters' : null
              }
              className={clsx(classes.textField, classes.dense)}
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
          <Grid item direction="row">
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Submit
            </Button>
            <img className={classes.Picture} src={image} width="45%" />
          </Grid>
        </form>
        <Grid item>{/* <img className={classes.Picture1} src={image1} width="25%" /> */}</Grid>
      </Grid>
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
