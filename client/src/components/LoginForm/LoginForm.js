import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import TextInput from '../TextInput/TextInput';


const LoginForm = ({ onSubmit, servError }) => {
  const { register, handleSubmit, watch, errors, control, setError } = useForm({
    defaultValues: {
      date: new Date()
    },
  });
  const onFormSubmit = data => {
    onSubmit(data, setError);
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} style={{ marginTop: 10 }}>

      <Grid container spacing={3} >

        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Login
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
              required: 'Password is Required'
            })}
            error={!!errors.password}
            helperText={errors?.password?.message}
            type="password"
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth name="submit" variant="contained" color="primary" disableElevation>
            Login
          </Button>
        </Grid>

        {
          servError && <Grid item xs={12} align="center" style={{ color: 'red' }}>
            {servError}
          </Grid>
        }

        <Grid item xs={12} align="center">
          Need an account? <Link to="/register">Register</Link>
        </Grid>


      </Grid>
    </form>
  );
};

export default LoginForm;