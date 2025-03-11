import React, { memo } from "react";
import { Box, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid2';

const MyInputTypeText = ({
  multilanguage,
  allprops,
  TextFieldLabel,
  placeholder,
  error,
  helperText,
  autoComplete = "off",
  type = "text",
  onChange,
  name = "",
  sx = {},
  defaultValue,
  isTable
}) => {
  return (
    <Grid container>
     {!isTable&& <p>{multilanguage(TextFieldLabel)}</p>}
      <FormControl sx={{ width: "100%" }}>
        <TextField
          // label={multilanguage(TextFieldLabel)}
          defaultValue={defaultValue}
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={multilanguage(placeholder)}
          error={error}
          helperText={helperText}
          {...allprops}
          onChange={onChange}
          sx={{ width: '100%', ...sx }}
          fullWidth
          id="outlined-size-small"
          size="small"
        />
      </FormControl>
      </Grid>
  );
};

export default  memo( MyInputTypeText);


// import React from "react";
// import { FormControl } from "@mui/material";
// import TextField from "@mui/material/TextField";
// const MyInputTypeText = ({
//   multilanguage,
//   allprops,
//   TextFieldLabel,
//   placeholder,
//   error,
//   helperText,
//   autoComplete = "off",
//   type = "text",
//   onChange,
//   name="",
//   sx={},
//   defaultValue
// }) => {
   
//   return (
//     <FormControl sx={{ width: "100%" }}>
//       <TextField
//         label={multilanguage(TextFieldLabel)}
//         defaultValue={defaultValue}
//         type={type}
//         name={name}
//         autoComplete={autoComplete}
//         placeholder={multilanguage(placeholder)}
//         error={error}
//         helperText={helperText}
//         {...allprops}
//         onChange={onChange}
//         sx={sx}
//         fullWidth
//       />
//     </FormControl>
//   );
// };

// export default MyInputTypeText;
