import { useState } from "react";
import { MenuItem, Select, FormControl } from "@mui/material";

const SmallDropdown = ({ fundTab ,setSelectedOption,selectedOption}) => {
  // const [value, setValue] = useState("select"); // Default selected value

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FormControl className="xirrdrop"
      size="small"
    >
      <table>
        <tr>
          <td>
            <Select
              labelId="dropdown-label"
              value={selectedOption}
              onChange={handleChange}
              sx={{
                height: "25px",
                backgroundColor: "#853FDC",
                color: "white",
                fontSize: "12px",
                borderRadius: "4px",
                ".MuiSelect-select": {
                  padding: "0 8px",
                },
              }}
            >
              <MenuItem value="select">Select</MenuItem>
              {fundTab && fundTab.map((item) => (
                <MenuItem key={item.returnMethodId} value={item.returnDispatcherName}>
                  {item.methodName}
                </MenuItem>
              ))}
            </Select></td>
        </tr>
      </table>
    </FormControl>
  );
};

export default SmallDropdown;

