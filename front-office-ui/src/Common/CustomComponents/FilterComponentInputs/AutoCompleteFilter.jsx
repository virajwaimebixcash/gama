import { useState } from "react";
import { FormControl, TextField, Autocomplete } from "@mui/material";

const AutocompleteFilter = ({ filter, filterValues, setFilterValues, data = [], inputValue, setInputValue }) => {
  const [selectedValue, setSelectedValue] = useState(filterValues[filter?.fieldName] || null);

  const handleChange = (event, newValue) => {
    setSelectedValue(newValue);

    // Dynamically update filter values
    const updatedFilterValues = { ...filterValues };

    if (newValue) {
      updatedFilterValues[filter.fieldName] = newValue.value;
    } else {
      delete updatedFilterValues[filter.fieldName];
    }

    setFilterValues(updatedFilterValues);
  };

  return (
    <FormControl sx={{ width: "100%", marginBottom: "16px" }}>
      <Autocomplete
        options={data}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.text || "")}
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
        value={selectedValue}
        onChange={handleChange}
        freeSolo
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={filter.placeholder || "Select an option"}
            variant="outlined"
            size="small"
          />
        )}
      />
    </FormControl>
  );
};

export default AutocompleteFilter;
