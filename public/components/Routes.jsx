import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';
import Drops from '../Drops/Drops';

function Routes() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/drops" component={Drops} />
    </React.Fragment>
  );
}

export default Routes;
