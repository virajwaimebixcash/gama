import React, { useEffect, useState } from "react";
import { TextField, MenuItem, FormControl, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid2";

const DropdownFilter = ({ filter, filterValues, setFilterValues, error = false, inputError = "", sx = {}, data = [] }) => {
  const fieldName = filter?.fieldName || "";
//   const selectedValue = filterValues[fieldName] || "";
  const [selectedValue, setSelectedValue] = useState(filterValues[filter?.fieldName] || null);

//   useEffect(() => {
//     if (selectedValue !== filterValues[fieldName]) {
//       setFilterValues((prev) => ({ ...prev, [fieldName]: selectedValue }));
//     }
//   }, [selectedValue, filterValues, fieldName, setFilterValues]);

//   const handleChange = (event) => {
//     const value = event.target.value;
//     setFilterValues((prev) => {
//       const updatedValues = { ...prev };
//       if (value) {
//         updatedValues[fieldName] = value;
//       } else {
//         delete updatedValues[fieldName];
//       }
//       return updatedValues;
//     });
//   };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    // Dynamically update filter values
    const updatedFilterValues = { ...filterValues };

    if (event.target.value) {
      updatedFilterValues[filter.fieldName] = event.target.value;
    } else {
      delete updatedFilterValues[filter.fieldName];
    }

    setFilterValues(updatedFilterValues);
  };

  return (
    <Grid container>
      <FormControl sx={{ width: "100%" }} error={error}>
        <TextField
          select
          id={fieldName}
          value={selectedValue}
          onChange={handleChange}
          sx={{ width: "100%", ...sx }}
          size="small"
        >
          <MenuItem value="">Select {filter.label || "Option"}</MenuItem>
          {data.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </TextField>
        {error && <FormHelperText>{inputError}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

export default DropdownFilter;
