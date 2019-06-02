import React, { Suspense, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import CenteredCircularProgress from './CenteredCircularProgress';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './AuthContext';

const LandingPage = React.lazy(() => import('../LandingPage/LandingPage'));
const Marketplace = React.lazy(() => import('../Marketplace/Marketplace'));
const Profile = React.lazy(() => import('../Profile/Profile'));
const Login = React.lazy(() => import('../LandingPage/Login'));
const Register = React.lazy(() => import('../LandingPage/Register'));
const Drop = React.lazy(() => import('../Drops/Drop'));
const NewDrop = React.lazy(() => import('../NewDrop/NewDrop'));
const UserAccount = React.lazy(() => import('../UserAccount/UserAccount'));

function Routes() {
  const { token } = useContext(AuthContext);
  return (
    <Suspense fallback={<CenteredCircularProgress />}>
      <Switch>
        <Route exact path="/" component={token ? Marketplace : LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/drop/:dropId" component={Drop} />
        <PrivateRoute exact path="/marketplace" component={Marketplace} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/newdrop" component={NewDrop} />
        <PrivateRoute exact path="/account" component={UserAccount} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
