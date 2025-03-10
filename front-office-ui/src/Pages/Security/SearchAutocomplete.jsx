import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { actionCreators } from '../../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';

const SearchAutocomplete = React.memo(({ setIsLoading, SchemeCode = '', SchemeName = '' }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]); // Store fetched options
  const [searchString, setSearchString] = useState(SchemeName);
  const debounceTimeout = useRef(null);
  const [selectedScheme, setSelectedScheme] = useState(null); // Track selected option

  // Function to fetch data with optimized parameters
  const fetchSchemeList = useCallback((searchStr, selectedSchemeCode = null) => {
    const body = {
      // clientCode: "35",
      clientCode: import.meta.env.VITE_CLIENT_CODE,
      userId: "integra",
      transactionType: 2,
      searchString: searchStr,
      lastBusinessDate: new Date().toISOString(),
      getData: selectedSchemeCode ? 1 : 0,
      schemeCode: selectedSchemeCode || undefined
    };

    setIsLoading(true);
    dispatch(actionCreators.GetSchemeList(body))
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
      .finally(() => setIsLoading(false));
  }, [dispatch, setIsLoading]);

  // Debounce function
  const debounceFetch = useCallback((inputValue) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      if (inputValue.length >= 3) {
        fetchSchemeList(inputValue);
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
    if (SchemeCode && SchemeName) {
      setSearchString(SchemeName);
      fetchSchemeList("", SchemeCode); // Fetch data for selected SchemeCode
      setSelectedScheme({ SchemeCode: SchemeCode, SchemeName: SchemeName });
    }
    return () => {
      setSelectedScheme(null);
      dispatch(actionCreators.GetSchemeList(null, true))
    };
  }, [SchemeCode,SchemeName]);

  // Memoize options to avoid re-rendering on every key press
  const memoizedOptions = useMemo(() => options, [options]);

  return (
    <Autocomplete
      options={memoizedOptions}
      getOptionLabel={(option) => option.SchemeName || ''}
      onInputChange={(event, newInputValue) => {
        setSearchString(newInputValue);
        setSelectedScheme(null); // Reset selectedScheme when typing
      }}
      onChange={(event, newValue) => {
        if (newValue) {
          setSearchString(newValue.SchemeName);
          fetchSchemeList("", newValue.SchemeCode); // Fetch data for selected SchemeCode
          setSelectedScheme(newValue); // Mark option as selected
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Schemes"
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
          option.SchemeName?.toLowerCase().includes(inputValue.toLowerCase())
        )
      }
    />
  );
});

// Set the displayName property for better debugging and to satisfy ESLint
SearchAutocomplete.displayName = 'SearchAutocomplete';

export default SearchAutocomplete;