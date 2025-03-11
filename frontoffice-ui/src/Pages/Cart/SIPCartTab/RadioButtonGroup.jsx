import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RadioButtonGroup() {
  return (
    <FormControl component="fieldset">
  
      <RadioGroup row name="options" defaultValue="option1">
        <FormControlLabel
          value="option1"
          control={<Radio />}
          label="Option 1"
        />
        <FormControlLabel
          value="option2"
          control={<Radio />}
          label="Option 2"
        />
    
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtonGroup;
