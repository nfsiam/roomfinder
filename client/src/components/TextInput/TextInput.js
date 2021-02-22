import React, { forwardRef } from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = forwardRef((props, ref) => {
  return <TextField label="default label" variant="outlined" size="small" fullWidth inputRef={ref} {...props} />;
});
TextInput.displayName = 'TextInput';

export default TextInput;
