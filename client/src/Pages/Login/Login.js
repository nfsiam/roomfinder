import { makeStyles, Paper } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import LoginForm from '../../components/LoginForm/LoginForm';
import LinearProgress from '@material-ui/core/LinearProgress';
import { SERVER_URL } from '../../variables';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    maxWidth: 350,
    minWidth: 350,
  },
  form: {
    padding: 20,
  }

}));

const Login = () => {
  const classes = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const [servError, setServError] = useState('');
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/home" } };

  const onSubmit = (data, setError) => {
    setSubmitting(true);
    setServError('');
    // console.log(data)
    const { username, password } = data;

    fetch(`${SERVER_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(async res => {
        return { status: res.status, data: await res.json() };
      })
      .then(({ status, data }) => {
        if (status === 200) {
          setLoggedInUser(data);
          sessionStorage.setItem('user', JSON.stringify(data));
          setSubmitting(false);
          history.replace(from);
        }
        else if (status === 404) {
          setServError(data.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        alert('Something went wrong');
        setSubmitting(false);
      })
      ;
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.formContainer}>
        {submitting && <LinearProgress />}
        <div className={classes.form} >
          <LoginForm onSubmit={onSubmit} servError={servError} />
        </div>
      </Paper>
    </div>
  );
};

export default Login;