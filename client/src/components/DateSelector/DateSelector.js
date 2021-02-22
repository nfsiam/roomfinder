import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Controller } from 'react-hook-form';

const DateSelector = (props) => {
  const { label, error, helperText, ...rest } = props;
  return (
    <Controller
      {...rest}
      render={({ onChange, value }) => (
        <>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              inputVariant="outlined"
              size="small"
              margin="none"
              format="dd/MM/yyyy"
              style={{ marginTop: 0 }}
              value={value}
              variant="inline"
              onChange={onChange}
              autoOk
              label={label}
              error={error}
              helperText={helperText}
            />
          </MuiPickersUtilsProvider>
        </>
      )}
    />
  );
};

export default DateSelector;
