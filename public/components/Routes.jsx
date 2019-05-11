import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CenteredCircularProgress from './CenteredCircularProgress';
import PrivateRoute from './PrivateRoute';
import Drop from '../Drops/Drop';

const Home = React.lazy(() => import('../Home/Home'));
const Marketplace = React.lazy(() => import('../Marketplace/Marketplace'));
const Profile = React.lazy(() => import('../Profile/Profile'));
const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));
const NewDrop = React.lazy(() => import('../NewDrop/NewDrop'));

function Routes() {
  return (
    <Suspense fallback={<CenteredCircularProgress />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/marketplace" component={Marketplace} />
        <PrivateRoute exact path="/drop/:dropId" component={Drop} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route exact path="/newdrop" component={NewDrop} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
