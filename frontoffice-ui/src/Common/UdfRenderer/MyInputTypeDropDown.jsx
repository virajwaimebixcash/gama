
import React, { memo } from "react";
import { Box, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from '@mui/material/Grid2';
import FormHelperText from "@mui/material/FormHelperText";

const MyInputTypeDropDown = ({
  error,
  TextFieldLabel,
  multilanguage = (e) => e,
  id = "outlined-size-small",
  onChange,
  allprops = {},
  sx = {},
  data = [{ value: " ", label: "" }],
  className,
  isInvalid = false,
  inputError = "",
  name = "",
  value = "",
  isTable
}) => {  
  // console.log(data,"data")  
  return (
    <Grid container>
      {!isTable && <p>{multilanguage(TextFieldLabel)}</p>}
      <FormControl sx={{ width: "100%" }} error={error}>
        <TextField
          select
          id={id}
          onChange={onChange}
          value={value}
          {...allprops}
          sx={{ width: '100%', ...sx }}
          name={name}
          className={className}
          size="small"
        >
          <MenuItem value={""}>Select {TextFieldLabel}</MenuItem>
          {data ? data?.map((option, index) => {
            return (
              <MenuItem value={option.value} key={index}>
                {option.text}
              </MenuItem>
            );
          }) : null}
        </TextField>
        {isInvalid && <FormHelperText>{inputError}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

export default memo(MyInputTypeDropDown);