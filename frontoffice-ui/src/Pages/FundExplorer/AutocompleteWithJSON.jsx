import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

// Example JSON data
const jsonData = [
  { id: 1, name: 'Motilal Oswal Midcap Fund Direct IDCW Reinvestment' },
  { id: 2, name: 'Motilal Oswal Midcap Fund Direct-Growth' },
  { id: 3, name: 'Bandhan Infrastructure Fund Direct Plan-Growth' },
  { id: 4, name: 'Tata Small Cap Fund Direct - Growth' },
  { id: 5, name: 'SBI PSU Direct Plan-Growth' },
];

const AutocompleteWithJSON = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Autocomplete
     size="small"
      options={jsonData}
      getOptionLabel={(option) => option.name} // Adjust based on your JSON structure
      value={selectedOption}
      onChange={(event, newValue) => {
        setSelectedOption(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params}  variant="outlined" />
      )}
    />
  );
};

export default AutocompleteWithJSON;
