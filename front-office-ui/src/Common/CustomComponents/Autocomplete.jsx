import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { actionCreators } from '../../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';

function DebouncedAutocomplete({ onChange=()=>{}, value='', selectedSchemeCode='', placeholder }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);
  const [selectedScheme, setSelectedScheme] = useState(value || null); // Track selected option  
  const clientCode = import.meta.env.VITE_CLIENT_CODE;
  // Function to fetch data with optimized parameters
  const fetchSchemeList = useCallback((searchStr, selectedSchemeCode = null) => {
    const body = {
      // clientCode: "35",
      clientCode: clientCode,
      userId: "integra",
      transactionType: 2,
      searchString: searchStr,
      lastBusinessDate: new Date().toISOString(),
      getData: selectedSchemeCode ? 1 : 0,
      schemeCode: selectedSchemeCode || undefined,
      multipleSchemeCode: "0"
    };

    setLoading(true);
    dispatch(actionCreators.GetSchemeListForTargetScheme(body))
      .then((res) => {
        if (res.status === 200) {
          const fetchedOptions = res.data || [];
          setOptions(fetchedOptions.slice(0, 20));
          if (selectedSchemeCode) {
            console.log("Selected scheme data:", fetchedOptions);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching schemes:", error);
      })
      .finally(() => setLoading(false));
  }, [dispatch, setLoading, selectedScheme]);

  // Debounce function
  const debounceFetch = useCallback((inputValue) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      if (inputValue.length >= 3) {
        fetchSchemeList(inputValue, selectedSchemeCode);
      }
    }, 300);
  }, [fetchSchemeList]);

  useEffect(() => {
    if (searchString.length >= 3 && !selectedScheme) {
      debounceFetch(searchString);
    }
    return () => clearTimeout(debounceTimeout.current);
  }, [searchString, selectedScheme, debounceFetch]);

  useEffect(() => {
    return () => {
      setSelectedScheme(null);
      dispatch(actionCreators.GetSchemeListForTargetScheme(null, true))
    };
  }, []);
  
  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.SchemeName || '')}
      value={value}
      inputValue={searchString}
       
      // options={memoizedOptions}
      // getOptionLabel={(option) => option.SchemeName || ''}
      // value={value} // Set the selected value
      onInputChange={(event, newInputValue) => {
        setSearchString(newInputValue);
        setSelectedScheme(null); // Reset selectedScheme when typing
      }}
      onChange={(event, newValue,data) => {
        if (newValue) {
          setSearchString(newValue.SchemeName);
          fetchSchemeList("", newValue.SchemeCode); // Fetch data for selected SchemeCode
          setSelectedScheme(newValue);
          onChange({
            SchemeName: newValue.SchemeName, SchemeCode: newValue.SchemeCode,
          }) // Mark option as selected
        }
      }}
      loading={loading}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            size='small'
            placeholder={placeholder}
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
        )
      }}
    />
  );
}

export default DebouncedAutocomplete;
