import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Dropdown = forwardRef((props, ref) => {

  const { options, label, error, helperText, ...rest } = props;
  const classes = useStyles();

  return (
    <FormControl variant="outlined" fullWidth size="small" className={classes.formControl} error={error}>
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select
        native
        label="default label"
        variant="outlined"
        size="small"
        fullWidth
        inputRef={ref}
        {...rest}
      >
        <option aria-label="None" value="" />
        {
          options.map(o => <option key={o._id} value={o._id}>{o.name}</option>)
        }
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
