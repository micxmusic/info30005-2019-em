import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { Grid, List, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import DropDetails from './DropDetails';
import Comment from './Comments';
import NewComment from './NewComment';
import CenteredCircularProgress from '../components/CenteredCircularProgress';
import { AuthContext } from '../components/AuthContext';

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
  commentBox: {
    marginTop: theme.spacing(2),
  },
});

function Drop(props) {
  const {
    history,
    match: { params },
    classes,
  } = props;

  const [dropDetails, setDropDetails] = useState(null);
  const [commentList, setCommentList] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const updateCommentList = useCallback(async () => {
    const comments = await axios.get(`/api/comments/${params.dropId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCommentList(comments.data);
  }, [token, params.dropId]);

  const updateDropDetails = useCallback(async () => {
    const details = await axios.get(`/api/drops/byID/${params.dropId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDropDetails(details.data);
  }, [token, params.dropId]);

  // equivalent to React lifecycle method componentDidMount
  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    (async () => {
      try {
        // await the result for all API calls run asynchronously (Promise.all)
        const [details, comments] = await Promise.all([
          axios.get(`/api/drops/byID/${params.dropId}`, config),
          axios.get(`/api/comments/${params.dropId}`, config),
        ]);
        setDropDetails(details.data);
        setCommentList(comments.data);
        setLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          history.push('/');
        }
      }
    })();
    // equivalent to componentDidUnmount
    return () => {
      // cancel API requests when component unmounted
      source.cancel();
    };
    // only update if params.dropID (/drops/dropID in url) changes
  }, [history, token, params.dropId]); // shouldComponentUpdate equivalent check

  return (
    <React.Fragment>
      <Helmet title={`Sustineo - Drop${dropDetails ? ' - '.concat(dropDetails.name) : ''}`} />
      <div className={classes.layout}>
        {loading ? (
          <CenteredCircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <img
                style={{
                  maxWidth: '100%',
                  maxHeight: '50vh',
                }}
                src={dropDetails.image}
                alt="food"
              />
            </Grid>
            <Grid item xs={12}>
              <DropDetails {...dropDetails} updateDropDetails={updateDropDetails} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Comments</Typography>
              <Paper className={classes.paper}>
                {token ? (
                  <NewComment dropId={params.dropId} updateCommentList={updateCommentList} />
                ) : null}
                {!commentList ? (
                  <Typography variant="h5">No comments</Typography>
                ) : (
                  <List>
                    {commentList.map(comment => (
                      <Comment {...comment} key={comment.id} />
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
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Drop);
