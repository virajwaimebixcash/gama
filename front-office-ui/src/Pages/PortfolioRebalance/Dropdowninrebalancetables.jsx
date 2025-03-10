import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Dropdowninrebalancetables = () => {
  const [value, setValue] = useState("value1"); // Default selected value

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl className=""
     size="small"
    
    >
        <table>
            <tr>
              
                <td>  <Select
        labelId="dropdown-label"
        value={value}
        onChange={handleChange} sx={{
          height: "32px",
          width:"100px",
          border:"1px solid #ddd",
          color: "#000",
          fontSize: "12px",
          backgroundColor:"#fff",
          borderRadius: "4px",
          ".MuiSelect-select": {
            padding: "0 8px",
          },
        }}
        
      
      >
        <MenuItem value="value1" >Select</MenuItem>
        <MenuItem value="value2" >XIRR</MenuItem>
        <MenuItem value="value2">TWRR</MenuItem>
      </Select></td>
            </tr>
        </table>
      
    
    </FormControl>
 
  );
};

export default Dropdowninrebalancetables;
