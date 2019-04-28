import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import Marketplace from '../Marketplace/Marketplace';

function Routes() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Home} />
      <Route exact path="/marketplace" component={Marketplace} />
    </React.Fragment>
  );
}

export default Routes;
