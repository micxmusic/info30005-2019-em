import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CenteredCircularProgress from './CenteredCircularProgress';

// import Home from '../Home/Home';
// import About from '../About/About';
// import Drops from '../Drops/Drops';
// import Profile from '../Profile/Profile';

const Home = React.lazy(() => import('../Home/Home'));
const About = React.lazy(() => import('../About/About'));
const Drops = React.lazy(() => import('../Drops/Drops'));
const Profile = React.lazy(() => import('../Profile/Profile'));

function Routes() {
  return (
    <Suspense fallback={<CenteredCircularProgress />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/drops" component={Drops} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
