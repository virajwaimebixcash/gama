import React, { useState } from "react";
import { Tabs, Tab, Box, TextField, RadioGroup, FormControlLabel, Radio, Typography, InputAdornment } from "@mui/material";
import SearchAutocomplete from '../../Pages/Security/SearchAutocomplete';
import SearchIcon from '@mui/icons-material/Search';
const MainRebalancings = ({ setRadioValues, radioValues, setPayload, modelListingData, payload }) => {
  const [searchValues, setSearchValues] = useState(''); // One search value per tab
  // One radio selection per tab

  const handleTabChange = (_, newValue) => {
    setPayload((payload) => ({ ...payload, modelType: newValue + 1, pageNum: 1, searchModelName: '' }))
    setSearchValues('')
  };

  const handleSearchChange = (e) => {
    // const newSearchValues = [...searchValues];
    // newSearchValues[index] = e.target.value;
    // setSearchValues(newSearchValues);
    setSearchValues(e.target.value);
    // setPayload((payload) => ({ ...payload, searchModelName: e.target.value }));
  };

  const handleRadioChange = (e, index) => {
    // const newRadioValues = [...radioValues];
    // newRadioValues[index] = e.target.value;
    setRadioValues(e.target.value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Tabs value={payload.modelType - 1} onChange={handleTabChange} variant="">
        <Tab label="Parent Mode" />
        <Tab label="Child Mode" />
      </Tabs>

      <Box sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
        <TabContent
          index={0}
          searchValue={searchValues}
          radioValue={radioValues}
          handleSearchChange={handleSearchChange}
          handleRadioChange={handleRadioChange}
          modelListingData={modelListingData}
          setPayload={setPayload}
        />

      </Box>

    </Box>
  );
};

// Component for search box and radio buttons inside each tab
const TabContent = ({ index, modelListingData, searchValue, setPayload, radioValue, handleSearchChange, handleRadioChange }) => (
 
 <Box>
  { console.log(radioValue, "modelListingData")}
    {/* Search Box */}
    {/* <div className='searchbxleft'><SearchAutocomplete ></SearchAutocomplete></div> */}
    <div className='searchbxleft'>
      <TextField
        // onClick={(e) => {console.log("wkendfb hejrfbhjbu")}}
        value={searchValue}
        onChange={handleSearchChange}
        label="Search Schemes"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div style={{ cursor: 'pointer' }} onClick={(e) => { setPayload((payload) => ({ ...payload, searchModelName: searchValue })); }}>
                <SearchIcon />
              </div>
            </InputAdornment>
          ),
        }} /></div>

    {/* Radio Buttons */}
    <RadioGroup value={radioValue} onChange={(e) => handleRadioChange(e, index)}>
      {modelListingData.records.map((data, index) => <FormControlLabel key={index} value={data.modelPortfolioId} control={<Radio />} label={data.modelName} />)}
      {/* <FormControlLabel value="option2" control={<Radio />} label="Edelweiss Large Cap Fund Growth" />
      <FormControlLabel value="option3" control={<Radio />} label="Baroda BNP Paribas Large Cap Fund Direct Growth " />
      <FormControlLabel value="option4" control={<Radio />} label="Aditya Birla Sun Life Frontline Equity Fund Direct Growth" /> */}
    </RadioGroup>


  </Box>
);


export default MainRebalancings;

