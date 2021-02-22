import { Button, Grid, Typography } from '@material-ui/core';
import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import TextInput from '../TextInput/TextInput';


const RegistrationForm = ({ onSubmit }) => {
  const { register, handleSubmit, watch, errors, control, setError } = useForm({});

  const password = useRef({});
  password.current = watch("password", "");

  const onFormSubmit = data => {
    onSubmit(data, setError);
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} style={{ marginTop: 10 }}>

      <Grid container spacing={3} >

        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Registration
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextInput
            label="Username"
            name="username"
            ref={register({
              required: 'Username is Required'
            })}
            error={!!errors.username}
            helperText={errors?.username?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextInput
            label="Password"
            name="password"
            ref={register({
              required: 'Password is Required',
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters"
              },
              validate: value =>
                !(value.match(/^[a-zA-Z0-9 ]*$/)) || "Password must contain at least one symbol",
            })}
            error={!!errors.password}
            helperText={errors?.password?.message}
            type="password"
          />
        </Grid>

        <Grid item xs={12}>
          <TextInput
            label="Confirm Password"
            name="cpassword"
            ref={register({
              required: 'Password is Required',
              validate: value =>
                value === password.current || "The passwords do not match"
            })}
            error={!!errors.cpassword}
            helperText={errors?.cpassword?.message}
            type="password"
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth name="submit" variant="contained" color="primary" disableElevation>
            Register
          </Button>
        </Grid>

        <Grid item xs={12} align="center">
          Already have an account? <Link to="/login">Login</Link> instead.
        </Grid>


      </Grid>
    </form>
  );
};

export default RegistrationForm;