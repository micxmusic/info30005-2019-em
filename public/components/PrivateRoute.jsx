import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
  location: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

PrivateRoute.defaultProps = {
  location: '/',
};
