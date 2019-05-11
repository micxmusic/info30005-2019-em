import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { List } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DropDetails from './DropDetails';
import Comment from './Comments';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
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
  commentBox: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Drop(props) {
  const {
    match: { params },
    classes,
  } = props;

  const [dropData, setDropData] = useState({ details: {}, comments: [] });
  const { user, token } = useContext(AuthContext);
  // equivalent to React lifecycle method componentDidMount
  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    };
    (async () => {
      try {
        // await the result for all API calls run asynchronously (Promise.all)
        const [details, comments] = await Promise.all([
          axios.get(`/api/drops/byID/${params.dropId}`, config),
          axios.get(`/api/comments/${params.dropId}`, config),
        ]);
        setDropData({ details: details.data, comments: comments.data });
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
        }
      }
    })();
    // equivalent to componentDidUnmount
    return () => {
      // cancel API requests when component unmounted
      source.cancel();
    };
    // only update if params.dropID (/drops/dropID in url) changes
  }, [token, params.dropId]); // shouldComponentUpdate equivalent check

  return (
    <React.Fragment>
      <Helmet>
        <title>Sustineo - Drops</title>
      </Helmet>
      <div className={classes.layout}>
        {!dropData.details._id ? (
          <CenteredCircularProgress />
        ) : (
          <Grid container spacing={16}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <img
                style={{
                  maxWidth: '100%',
                  maxHeight: '50vh',
                }}
                src={dropData.details.image}
                alt="food"
              />
            </Grid>
            <Grid item xs={12}>
              <DropDetails {...dropData.details} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Comments</Typography>
              <Paper className={classes.paper}>
                {!dropData.comments ? (
                  <Typography variant="h5">No comments</Typography>
                ) : (
                  <List>
                    {dropData.comments.map(comment => (
                      <Comment {...comment} key={comment._id} />
                    ))}
                  </List>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
    </React.Fragment>
  );
}
Drop.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(Drop);
