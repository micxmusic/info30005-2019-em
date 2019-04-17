import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet/es/Helmet';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import GlobalStyle from '../GlobalStyle';
import Multiplying from './Multiplying';

function Home(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Helmet>
        <meta charset="utf-8" />
        <title>Sustineo</title>
      </Helmet>
      <div className={classNames(classes.layout)}>
        <Grid container spacing={16} justify="center">
          <Grid item>
            <Multiplying aboveButtonText="This is above" buttonText="button 1" />
          </Grid>
          <Grid item>
            <Multiplying aboveButtonText="so is this!" buttonText="button 2" />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(GlobalStyle)(Home);
// export default Home;
