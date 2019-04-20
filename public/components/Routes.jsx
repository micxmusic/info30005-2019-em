import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import About from '../About/About';
import Drops from '../Drops/Drops';

function Routes() {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/drops" component={Drops} />
    </React.Fragment>
  );
}

export default Routes;
