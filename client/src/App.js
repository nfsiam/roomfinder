import React, { createContext, useEffect, useState } from 'react';
import Home from './Pages/Home/Home';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './components/Navbar/Navbar';
import PublicRoute from './components/PublicRoute/PublicRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const userJSON = sessionStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setLoggedInUser(user);
    }
  }, [])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Navbar />
        <Switch>

          <PrivateRoute exact path="/">
            <Redirect to="/home" />
          </PrivateRoute>

          <PublicRoute path="/login">
            <Login />
          </PublicRoute>

          <PublicRoute path="/register">
            <Register />
          </PublicRoute>

          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
