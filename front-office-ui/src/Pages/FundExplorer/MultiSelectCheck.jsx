import React, { useState } from "react";
import { Select, MenuItem, Checkbox, ListItemText, Box } from "@mui/material";
import selected from '../../images/selected.png';
import unselected from '../../images/unselected.png';
const options = [
  { label: "WatchList1", value: "Watch List 1", img: selected },
  { label: "WatchList2", value: "Watch List 2", img: unselected },
 
];

const MultiSelectCheck = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Set background image based on first selected option
  const backgroundImage = selectedOptions.length
    ? options.find((opt) => opt.value === selectedOptions[0])?.img
    : unselected; // Default background

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <Box 
      sx={{
        width: "15px",
        height: "19px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize:"12px"
      }}
    >
      <Select className="multifordash"
        multiple
        value={selectedOptions}
        onChange={handleChange}
        displayEmpty
        // sx={{ width: 30, bgcolor: "transperant", borderRadius: 2 , border: 'none'}}
        renderValue={(selected) =>
         <span>selected.length ? `(${selected.length})` : ""</span> 
        }
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} className="styfordrop">
            <Checkbox checked={selectedOptions.includes(option.value)}/>
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default MultiSelectCheck;
