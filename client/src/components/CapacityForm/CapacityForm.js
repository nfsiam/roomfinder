import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useForm } from "react-hook-form";
import DateSelector from '../DateSelector/DateSelector';


const CapacityForm = ({ onSubmit }) => {
  const { handleSubmit, errors, control } = useForm({
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
          <Button type="submit" name="submit" variant="contained" color="primary" disableElevation>
            Get Capacity
            </Button>
        </Grid>

      </Grid>
    </form>
  );
};

export default CapacityForm;