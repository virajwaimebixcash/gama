import { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  Box,
  OutlinedInput,
} from "@mui/material";

const MultiSelectDropdown = ({ filter, filterValues, setFilterValues }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "subscription", label: "Subscription" },
    { value: "redemption", label: "Redemption" },
    { value: "sip", label: "SIP" },
    { value: "swp", label: "SWP" },
    { value: "stp", label: "STP" },
  ];

  // Ensure the initial selected options are properly set based on filterValues
  useEffect(() => {
    if (filterValues[filter.fieldName]) {
      setSelectedOptions(filterValues[filter.fieldName]);
    }
  }, [filterValues, filter.fieldName]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(value);

    // Update the filter values with the selected options
    const updatedFilterValues = { ...filterValues };

    if (value.length > 0) {
      updatedFilterValues[filter.fieldName] = value;
    } else {
      delete updatedFilterValues[filter.fieldName];
    }

    setFilterValues(updatedFilterValues);
  };

  return (
    <FormControl fullWidth>
      <Select
        multiple
        value={selectedOptions}
        onChange={handleChange}
        input={<OutlinedInput label="Select Options" />}
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              maxHeight: "100px",
              overflowY: "auto",
            }}
          >
            {selected.map((value) => (
              <Chip
                key={value}
                label={
                  options.find((option) => option.value === value)?.label
                }
              />
            ))}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200, // Limit height of dropdown options
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={selectedOptions.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectDropdown;
