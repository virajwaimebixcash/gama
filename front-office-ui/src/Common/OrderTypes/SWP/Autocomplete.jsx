import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

function DebouncedAutocomplete() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (inputValue === '') {
      setOptions([]);
      return;
    }

    setLoading(true);

    // Clear any existing debounce timeouts
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      // Fetch data with debounced input value
      fetch(`https://api.example.com/search?q=${inputValue}`)
        .then((response) => response.json())
        .then((data) => {
          setOptions(data.results || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, 500); // Adjust debounce time as needed

    setDebounceTimeout(timeout);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option.name || ''}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
        size='small' 
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export default DebouncedAutocomplete;
