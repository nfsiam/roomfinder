import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import CapacityForm from '../CapacityForm/CapacityForm';
import { UserContext } from '../../App';
import { SERVER_URL } from '../../variables';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20
  }
}));


const CapacityPanel = () => {
  const classes = useStyles();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [percent, setPercent] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (data) => {
    setSubmitting(true);
    setPercent('');
    // console.log(data)
    const { date } = data;

    fetch(`${SERVER_URL}/api/bookings/get-capacity`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + loggedInUser.token
      },
      body: JSON.stringify({
        date: date.toDateString(),
      })
    })
      .then(async res => {
        return { status: res.status, data: await res.json() };
      })
      .then(({ status, data }) => {
        setSubmitting(false);
        if (status === 403 || status === 401) {
          sessionStorage.removeItem('user');
          setLoggedInUser({});
        }
        else if (status === 200) {
          const { spaces, bookingCount } = data;
          const p = (100 - ((100 / spaces) * bookingCount));
          const msg = `The capacity of free working places on ${date.toDateString()} is ${p.toFixed(2)}%`;
          setPercent(msg);
          // console.log(data);
        }
      })
      .catch(err => {
        setSubmitting(false);
        setPercent('Something Went Wrong');
      })
      ;
  }
  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          {submitting && <LinearProgress />}
          <CapacityForm onSubmit={onSubmit} />
        </Grid>
        <Grid item xs={12} sm={6} lg={8} style={{ paddingTop: 20 }}>
          {
            percent &&
            <div>
              {percent}
            </div>
          }
        </Grid>

      </Grid>
    </Paper>
  );
};

export default CapacityPanel;