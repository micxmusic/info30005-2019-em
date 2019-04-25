import React from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import { useTheme } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Multiplying from './Multiplying';

function Home() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Helmet>
        <meta charset="utf-8" />
        <title>Sustineo</title>
      </Helmet>
      <Grid
        container
        spacing={24}
        style={{
          width: '100%',
          margin: 0,
          padding: theme.spacing.unit * 2,
        }}
        justify="center"
      >
        <Grid item>
          <Multiplying aboveButtonText="This is above" buttonText="button 1" />
        </Grid>
        <Grid item>
          <Multiplying aboveButtonText="so is this!" buttonText="button 2" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Home;
