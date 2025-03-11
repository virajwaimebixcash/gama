import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const RebalanceSelect1 = () => {
  const [value, setValue] = useState("Portfolio"); // Default selected value

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl className="xirrdrop"
     size="small"
    
    >
        <table>
            <tr>
              
                <td>  <Select
        labelId="dropdown-label"
        value={value}
        onChange={handleChange}
         sx={{
          height: "32px",
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
        <MenuItem value="" >Select</MenuItem>
        <MenuItem value="Account" >Account</MenuItem>
        <MenuItem value="Portfolio">Portfolio</MenuItem>
      </Select></td>
            </tr>
        </table>
      
    
    </FormControl>
 
  );
};

export default RebalanceSelect1;
