import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Chip, Box, OutlinedInput } from '@mui/material';

const MultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
{ value: 'option1', label: 'Subscription' },
    { value: 'option2', label: 'Redemption' },
    { value: 'option3', label: 'SIP' },
    { value: 'option4', label: 'SWP' },
    { value: 'option5', label: 'STP' },
  ];

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <> <FormControl fullWidth>

          <Select className='multiselectdrp'
              multiple
              value={selectedOptions}
              onChange={handleChange}
              input={<OutlinedInput label="Select Options" />}
              renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxHeight: '100px', overflowY: 'auto' }}>
                      {selected.map((value) => (
                          <Chip key={value} label={options.find(option => option.value === value).label} />
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
      </FormControl></>
  );
};

export default MultiSelect;

 

 
