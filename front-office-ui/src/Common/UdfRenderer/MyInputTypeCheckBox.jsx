import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid2';

const MyInputTypeCheckBox = ({
  multilanguage,
  TextFieldLabel,
  sx = {},
  allprops,
  defaultChecked = false,
  onChange,
  name = "",
  checkboxtext = "",
  isTable
}) => {
  return (
    <Grid container>
      {!isTable && <p>{multilanguage(TextFieldLabel)}</p>}
      <FormGroup sx={{ width: "100%" }}>
        <FormControlLabel
          control={<Checkbox defaultChecked={defaultChecked} {...allprops} />}
          // label={multilanguage(TextFieldLabel)}
          onChange={onChange}
          name={name}
          label={multilanguage(checkboxtext)}
        />
      </FormGroup>
    </Grid>
  )
};
export default MyInputTypeCheckBox;





