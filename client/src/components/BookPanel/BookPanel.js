import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import BookingForm from '../BookingForm/BookingForm';
import LinearProgress from '@material-ui/core/LinearProgress';
import { UserContext } from '../../App';
import { SERVER_URL } from '../../variables';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20
  }
}));


const BookPanel = () => {
  const classes = useStyles();
  const [unavailable, setUnavailable] = useState(null);
  const [booked, setBooked] = useState('');

  const [roomOptions, setRoomOptions] = useState([]);

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${SERVER_URL}/api/rooms`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + loggedInUser.token
      }
    })
      .then(async res => {
        return { status: res.status, data: await res.json() };
      })
      .then(({ status, data }) => {
        if (status === 403 || status === 401) {
          sessionStorage.removeItem('user');
          setLoggedInUser({});
        }
        else if (status === 200) {
          setRoomOptions(data);
        }
      });
  }, [])

  const onSubmit = (data) => {
    setSubmitting(true);
    setUnavailable(null);
    setBooked('');
    // console.log(data)
    const { room, date, name } = data;

    fetch(`${SERVER_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + loggedInUser.token
      },
      body: JSON.stringify({
        roomId: room,
        date: date.toDateString(),
        name: name,
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
        else if (status === 406) {
          setBooked('');
          setUnavailable(data);
        }
        else if (status === 201) {
          const msg = `We booked successfully a place in ${data.room.name} on ${data.date} for you`;
          setUnavailable(null);
          setBooked(msg);
        }
      });
  }
  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          {submitting && <LinearProgress />}
          <BookingForm onSubmit={onSubmit} roomOptions={roomOptions} />
        </Grid>
        <Grid item xs={12} sm={6} lg={8} style={{ paddingTop: 20 }}>
          {
            unavailable &&
            <div>
              Room is already booked on this day by:
              <ul>
                {
                  unavailable.bookings.map(b => <li>{b.name}</li>)
                }
              </ul>
              Try Room(s):
              <ul>
                {
                  unavailable.availableRoomInfo.map(r => <li>{r.name} with open places {r.available}</li>)
                }
              </ul>
            </div>
          }
          {
            booked &&
            <div>
              {booked}
            </div>
          }
        </Grid>

      </Grid>
    </Paper>
  );
};

export default BookPanel;