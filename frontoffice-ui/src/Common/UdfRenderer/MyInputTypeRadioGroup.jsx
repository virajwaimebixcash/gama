/* eslint-disable react/prop-types */
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormControlLabel } from "@mui/material";
import Grid from '@mui/material/Grid2';

const MyInputTypeRadioGroup = ({
  multilanguage,
  id = "",
  sx = {},
  row = false,
  name = "",
  TextFieldLabel,
  allprops,
  defaultValue = null,
  onChange,
  data = [{ option1: "", optionlabel: "" }],
  disabled,
  isTable

}) => {
  return (

    <Grid container>

      {/* <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} > */}
      {!isTable && <p>{multilanguage(TextFieldLabel)}</p>}
      <FormControl sx={{
        width: "100%"

        // , alignItems: "flex-start"
      }}>
        <RadioGroup
          row={row}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name={name}
          value={defaultValue}
          onChange={onChange}
          sx={{ width: '100%', ...sx }}
        >
          {data.map((item, index) => (
            <FormControlLabel
              {...allprops}
              disabled={disabled}
              key={index}
              value={item.option1}
              control={<Radio />}
              label={multilanguage(item.optionlabel)}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {/* </Grid> */}
    </Grid>
  );
};
export default MyInputTypeRadioGroup;
