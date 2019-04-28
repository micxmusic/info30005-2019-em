import React from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import { Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import Multiplying from './Multiplying';

function Home() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Helmet>
        <meta charset="utf-8" />
        <title>Sustineo</title>
      </Helmet>
      <div className={theme.layout}>
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

export default Home;
