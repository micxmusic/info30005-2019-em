import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';
import Drop from '../Drops/Drop';

function Routes() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/drop" component={Drop} />
    </React.Fragment>
  );
}

export default Routes;
