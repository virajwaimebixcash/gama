import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import DebouncedAutocomplete from "../CustomComponents/Autocomplete";
import api from "../../APIs/interceptor";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const SearchBar = ({ CurrentTab, tabList = [], totalList, getWatchListTabsSchemeList, maxList, setAlertOpen,resetSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchTerm, setSearchTerm] = useState("");


  const data = useSelector((state) => state.getSchemeListForTargetScheme.data);

  const formatDate = (date) => dayjs(date, 'YYYYMMDD').format('YYYY-MM-DD');

  const handleSearch = () => {
    if (totalList >= maxList) {
      return setAlertOpen({ show: true, msg: `Maximum ${maxList} watchlist are allowed`, type: 'error' });
    }

    const shortedData = tabList.sort((a, b) => b.itemSequence - a.itemSequence)
    const payLoad = [
      {
        "watchlistTabId": CurrentTab.id,
        "schemeCodeToDisplay": searchQuery.SchemeCode,
        "navOnCreatedDate": 0,
        "latestAvailableNav": data[0]?.LatestNAV,
        // "latestAvailableNavDate": data[0]?.fundInfo.NAVDate,
        "latestAvailableNavDate": formatDate(data[0]?.fundInfo.NAVDate),
        "itemSequence": shortedData[0] ? shortedData[0]?.itemSequence + 1 : 0,
      }]
    api.post("/dashboard/addDashWatchListTabDataDetails", payLoad).then(() => {
       getWatchListTabsSchemeList()
       setSearchQuery("");
       }
    ).catch((err) => { console.log(err) })
    // dispatch(actionCreators)
    // Add your search logic here
  };

  useEffect(() => {
    if (resetSearch) {
      setSearchQuery(""); // Reset search when a security is added
    }
  }, [resetSearch]);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}

    // Space between input and button
    >
      <Box sx={{
        width: "100%", // Adjust margin as needed
      }}>
        <DebouncedAutocomplete
          label="" 
          variant="outlined"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e)}
          size="small" // Adjust size (optional)
          fullWidth // Optional, depends on your design
        />

      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className="addbrnscss"
      >
        Add
      </Button>
    </Box>
  );
};

export default SearchBar;
