import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const SelectForGoal = () => {
  const [value, setValue] = useState("value1"); // Default selected value

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl className="fullwiselect"
     
    
    >
         <Select
        labelId="dropdown-label"
        value={value}
        onChange={handleChange} sx={{
          height: "35px",
          backgroundColor: "#fff",
          color: "#000",
          fontSize: "12px",
          borderRadius: "4px",
          textAlign:"left"
          
        }}
        
      
      >
        <MenuItem value="value1">Monthly</MenuItem>
        <MenuItem value="value2">Quarterly</MenuItem>
        <MenuItem value="value2">Yearly</MenuItem>
      </Select>
      
    
    </FormControl>
 
  );
};

export default SelectForGoal;

 