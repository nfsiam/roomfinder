import { makeStyles, Paper } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import LinearProgress from '@material-ui/core/LinearProgress';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
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

const Register = () => {
  const classes = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/home" } };

  const onSubmit = (data, setError) => {
    setSubmitting(true);
    // console.log(data)
    const { username, password } = data;

    fetch(`${SERVER_URL}/api/users/register`, {
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
        if (status === 201) {
          setLoggedInUser(data);
          sessionStorage.setItem('user', JSON.stringify(data));
          setSubmitting(false);
          history.replace(from);
        }
        else if (status === 409) {
          setError('username', {
            type: 'validation',
            message: 'Username is already taken'
          });
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
          <RegistrationForm onSubmit={onSubmit} />
        </div>
      </Paper>
    </div>
  );
};

export default Register;