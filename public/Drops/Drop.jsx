import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { List } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DropDetails from './DropDetails';
import Comment from './Comments';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

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

  const [dropData, setDropData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const detailsRes = await fetch(`http://localhost:3000/api/comments/${params.dropId}`);
      const commentsRes = await fetch(`http://localhost:3000/api/drops/byID/${params.dropId}`);
      const details = await detailsRes.json();
      const comments = await commentsRes.json();
      const data = [details, comments];
      await setDropData(data);
    }
    fetchData();
  }, [params.dropId]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Sustineo - Drops</title>
      </Helmet>
      <div className={classes.layout}>
        {!Object.keys(dropData).length ? (
          <CenteredCircularProgress />
        ) : (
          <Grid container spacing={16}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <img
                style={{
                  maxWidth: '100%',
                  maxHeight: '50vh',
                }}
                src={dropData[1].image}
                alt="food"
              />
            </Grid>
            <Grid item xs={12}>
              <DropDetails {...dropData[1]} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Comments</Typography>
              <Paper className={classes.paper}>
                {!dropData[0] ? (
                  <Typography variant="h5">No comments</Typography>
                ) : (
                  <List>
                    {dropData[0].map(comment => (
                      <Comment {...comment} key={comment.timeOfPost} />
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
