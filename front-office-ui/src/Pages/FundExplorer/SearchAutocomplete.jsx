import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
 

const options = [
  { title: 'HDFC' },
  { title: 'Bajaj' },
  { title: 'Cherry' },
  { title: 'Date' },
  { title: 'Elderberry' },
  { title: 'Fig' },
  { title: 'Grape' },
];

const SearchAutocomplete = () => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search fruits"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      filterOptions={(options, { inputValue }) =>
        options.filter((option) =>
          option.title.toLowerCase().includes(inputValue.toLowerCase())
        )
      }
    />
  );
};

export default SearchAutocomplete;