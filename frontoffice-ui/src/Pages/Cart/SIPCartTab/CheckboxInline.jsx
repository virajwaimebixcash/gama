import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

function CheckboxInline() {
  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox />}
        label="Option 1"
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Option 2"
      />
    </FormGroup>
  );
}

export default CheckboxInline;
