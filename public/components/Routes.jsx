import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CenteredCircularProgress from './CenteredCircularProgress';

const Home = React.lazy(() => import('../Home/Home'));
const Marketplace = React.lazy(() => import('../Marketplace/Marketplace'));
const Drop = React.lazy(() => import('../Drops/Drop'));
const Profile = React.lazy(() => import('../Profile/Profile'));
const LandingPage = React.lazy(() => import('../LandingPage/LandingPage'));

function Routes() {
  return (
    <Suspense fallback={<CenteredCircularProgress />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/marketplace" component={Marketplace} />
        <Route exact path="/drop/:dropId" component={Drop} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/landing" component={LandingPage} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
