import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useForm } from "react-hook-form";
import DateSelector from '../DateSelector/DateSelector';
import Dropdown from '../Dropdown/Dropdown';
import TextInput from '../TextInput/TextInput';


const BookingForm = ({ onSubmit, roomOptions }) => {
  const { register, handleSubmit, watch, errors, control } = useForm({
    defaultValues: {
      date: new Date()
    },
  });
  const onFormSubmit = data => {
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} style={{ marginTop: 10 }}>

      <Grid container spacing={1} >

        <Grid item xs={12}>
          <Dropdown
            label="Room"
            name="room"
            defaultValue={''}
            options={roomOptions}
            ref={register({
              required: 'Room is Required'
            })}
            error={!!errors.room}
            helperText={errors?.room?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <DateSelector
            name="date"
            label="Date"
            control={control}
            rules={{ required: 'Date is Required' }}
            error={!!errors.date}
            helperText={errors?.date?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextInput
            label="Your Name"
            name="name"
            ref={register({
              required: 'Name is Required'
            })}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" name="submit" variant="contained" color="primary" disableElevation>
            Book Workspace
            </Button>
        </Grid>

      </Grid>
    </form>
  );
};

export default BookingForm;