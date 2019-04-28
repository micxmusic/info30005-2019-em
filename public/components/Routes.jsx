import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CenteredCircularProgress from './CenteredCircularProgress';

const Home = React.lazy(() => import('../Home/Home'));
const About = React.lazy(() => import('../About/About'));
const Drop = React.lazy(() => import('../Drops/Drop'));
const Profile = React.lazy(() => import('../Profile/Profile'));

function Routes() {
  return (
    <Suspense fallback={<CenteredCircularProgress />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/drop" component={Drop} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
