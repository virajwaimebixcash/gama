import React from "react";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
const MyHiddenInput = ({
  //  multilanguage,
  allprops,
  TextFieldLabel,
  // placeholder,
  // error,
  // helperText,
  // autoComplete = "off",
  type = "hidden",
  onChange,
  name="",
  sx={},
  defaultValue,
  id="",
}) => {
   
  return (
    <FormControl sx={{ width: "100%" }}>
      <TextField
        // label={"Hidden value"}
        label={TextFieldLabel}
        defaultValue={defaultValue}
        id={id}
        type={type}
        name={name}
        sx={{display:'none'}}
        // autoComplete={autoComplete}
        // placeholder={multilanguage(placeholder)}
        // error={error}
        // helperText={helperText}
         {...allprops}
        onChange={onChange}
        // sx={sx}
        // fullWidth
      />
    </FormControl>
  );
};

export default MyHiddenInput;