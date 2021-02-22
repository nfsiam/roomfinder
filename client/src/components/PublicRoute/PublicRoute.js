import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PublicRoute = ({ children, ...rest }) => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.username ?
          (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: location }
              }}
            />
          )
          :
          (
            children
          )
      }
    />
  );
};

export default PublicRoute;