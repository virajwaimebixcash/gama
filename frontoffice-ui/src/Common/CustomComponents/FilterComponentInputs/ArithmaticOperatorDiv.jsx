import { useState, useEffect } from "react";
import { Select, MenuItem, TextField, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ArithmaticOperatorDiv = ({ filter, filterValues, setFilterValues }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  useEffect(() => {
    // Initialize values based on filterValues
    Object?.keys(filterValues).forEach((key) => {
      if (key.startsWith(filter.fieldName)) {
        const operator = key.replace(filter.fieldName, "");

        if (operator === "From") {
          setSelectedOption("Between");
          setFromValue(filterValues[key]);
        } else if (operator === "To") {
          setSelectedOption("Between");
          setToValue(filterValues[key]);
        } else {
          setSelectedOption(operator);
          setFromValue(filterValues[key]);
        }
      }
    });
  }, [filter?.fieldName, filterValues]);

  const handleSelectChange = (event) => {
    const operator = event.target.value;
    setSelectedOption(operator);

    // Reset field values when the operator changes
    setFromValue("");
    setToValue(""); // Explicitly clear "To" value

    const updatedFilterValues = { ...filterValues };

    // Remove all filters related to the field
    Object.keys(updatedFilterValues).forEach((key) => {
      if (key.startsWith(filter.fieldName)) {
        delete updatedFilterValues[key];
      }
    });

    setFilterValues(updatedFilterValues);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedFilterValues = { ...filterValues };
    const parsedValue = filter.filterDatatype === "Numeric" ? Number(value) : value;

    if (selectedOption === "Between") {
      if (name === "From") {
        updatedFilterValues[`${filter.fieldName}From`] = parsedValue;
        setFromValue(value);
      } else if (name === "To") {
        updatedFilterValues[`${filter.fieldName}To`] = parsedValue;
        setToValue(value);
      }
    } else {
      updatedFilterValues[`${filter.fieldName}${selectedOption}`] = parsedValue;
      setFromValue(value);
    }

    setFilterValues(updatedFilterValues);
  };

  const getInputType = () => {
    switch (filter.filterDatatype) {
      case "Numeric":
        return "number";
      case "Date":
        return "date";
      case "String":
      default:
        return "text";
    }
  };

  return (
    <div>
      <Select
        size="small"
        value={selectedOption}
        onChange={handleSelectChange}
        sx={{ width: "100%" }}
        displayEmpty
      >
        <MenuItem value="">
          <em>Select an operator</em>
        </MenuItem>
        <MenuItem value="EqualTo">=</MenuItem>
        <MenuItem value="NotEqualTo">!=</MenuItem>
        <MenuItem value="LessThanEqualTo">&#x2039;=</MenuItem>
        <MenuItem value="GreaterThanEqualTo">&#x203A;=</MenuItem>
        <MenuItem value="LessThan">&#x2039;</MenuItem>
        <MenuItem value="GreaterThan">&#x203A;</MenuItem>
        <MenuItem value="Between">Between</MenuItem>
      </Select>

      <Box sx={{ marginTop: "16px" }}>
        <Grid container spacing={2}>
          {selectedOption === "Between" ? (
            <>
              <Grid xs={12} sm={6}>
                <TextField
                  name="From"
                  variant="outlined"
                  size="small"
                  label="From"
                  fullWidth
                  value={fromValue || ""}
                  onChange={handleInputChange}
                  type={getInputType()}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  name="To"
                  variant="outlined"
                  size="small"
                  label="To"
                  fullWidth
                  value={toValue || ""}
                  onChange={handleInputChange}
                  type={getInputType()}
                />
              </Grid>
            </>
          ) : selectedOption && (
            <Grid xs={12} sm={6}>
              <TextField
                name="From"
                variant="outlined"
                size="small"
                label="Value"
                fullWidth
                value={fromValue || ""}
                onChange={handleInputChange}
                type={getInputType()}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default ArithmaticOperatorDiv;