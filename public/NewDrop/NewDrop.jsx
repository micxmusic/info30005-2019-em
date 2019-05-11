import axios from 'axios';
import React, { memo, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/styles';
import { Button, Grid, InputAdornment, LinearProgress, TextField } from '@material-ui/core';
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
});

function NewDrop(props) {
  const { classes, history } = props;
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    purchaseDate: '',
    description: '',
  });
  const [errorFlag, setErrorFlag] = useState(false);
  const [progress, setProgress] = useState(undefined);
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
  const onUploadProgress = event => {
    setProgress(event);
  };
  const onUploadFinish = event => {
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
          {progress === undefined ? null : (
            <LinearProgress variant="determinate" value={progress} />
          )}
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
    </React.Fragment>
  );
}

NewDrop.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default memo(withStyles(styles)(NewDrop));
