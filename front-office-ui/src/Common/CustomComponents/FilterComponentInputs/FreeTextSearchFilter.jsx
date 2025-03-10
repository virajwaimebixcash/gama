import { useState } from "react";
import { TextField } from "@mui/material";

const FreeTextSearchFilter = ({ filter, filterValues, setFilterValues }) => {
  const [searchText, setSearchText] = useState(filterValues[filter.fieldName] || "");

  const handleTextChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    // Dynamically update filter values
    const updatedFilterValues = { ...filterValues };

    if (value.trim()) {
      // If value is not empty, update the filter
      updatedFilterValues[filter.fieldName] = value;
    } else {
      // Remove filter if the value is cleared
      delete updatedFilterValues[filter.fieldName];
    }

    setFilterValues(updatedFilterValues);
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      value={searchText}
      onChange={handleTextChange}
      placeholder={filter.placeholder || "Enter search text"}
      sx={{ marginBottom: "16px" }}
    />
  );
};

export default FreeTextSearchFilter;
