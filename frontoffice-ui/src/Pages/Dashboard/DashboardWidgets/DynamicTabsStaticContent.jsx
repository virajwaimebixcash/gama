import { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  IconButton,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from '../../../Common/FormComponent/SearchBar';
import DragAndDropList from '../../../Common/FormComponent/DragAndDropList';
import CustomAlert from "../../../Common/CustomComponents/CustomAlert";
import { useDispatch } from "react-redux";
import WatchListPopup from "./WatchListPopup";
import api from "../../../APIs/interceptor";
import { actionCreators } from "../../../redux/actions/actionCreators";

const DynamicTabsStaticContent = ({ WatchListTabData, WatchListFieldData, ParameterListData }) => {
  const [tabs, setTabs] = useState([]);
  const dispatch = useDispatch();
  const UserId = import.meta.env.VITE_USER_ROLE_ID
  const [activeTab, setActiveTab] = useState(0);
  const [editingTab, setEditingTab] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [maxTabs, setMaxTabs] = useState(0);
  const [maxList, setmaxList] = useState(0);
  const [alertOpen, setAlertOpen] = useState({ show: false, msg: '', type: 'success' });
  const [tabList, setTabList] = useState([]);

  const [resetSearch, setResetSearch] = useState(false);

  useEffect(() => {
    const maxTabParameter = ParameterListData.find(
      (param) => param.paraName === "maximumTotalNumberOfWatchlist"
    );
    const maxListParameter = ParameterListData.find(
      (param) => param.paraName === "maximumTotalSecurityInWatchlist"
    );
    if (maxTabParameter) {
      setmaxList(parseInt(maxListParameter.paraValue)); // Set max tabs value
    }
    if (maxTabParameter) {
      setMaxTabs(parseInt(maxTabParameter.paraValue)); // Set max tabs value
    }
  }, [ParameterListData]);

  useEffect(() => {
    if (WatchListTabData && WatchListTabData.length > 0) {
      // Sort the tabs by sequence
      const sortedTabs = WatchListTabData.sort((a, b) => a.tabSequence - b.tabSequence).map((tab) => ({
        id: tab.watchlistTabId,
        label: tab.tabDisplayName,
        dispatcherName: tab.tabDispatcherName,
        tabSequence: tab.tabSequence,
      }));

      // Update the tabs state
      setTabs(sortedTabs);
    }
  }, [WatchListTabData]);




  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Add a new tab
  const handleAddTab1 = () => {
    if (tabs.length >= maxTabs) {
      setAlertOpen({ show: true, msg: `Maximum ${maxTabs} watchlists allowed.`, type: "error" });
      return;
    }
    const newId = tabs.length > 0 ? Math.max(...tabs.map((tab) => Number(tab.id))) + 1 : 1;
    const newTab = {
      id: newId.toString(),
      label: `Watchlist ${tabs.length + 1}`,
      dispatcherName: `newWatchList${tabs.length + 1}`,
    };
    const body = [
      {
        // tabDispatcherName: newTab.label?.replace(/\s+/g, "")?.toLowerCase(),
        tabDispatcherName: newTab.label,
        tabDisplayName: newTab.label,
        tabSequence: newTab.id,
        userId: UserId,
      },
    ];

    dispatch(actionCreators.AddWatchListTab(body))
      .then((res) => {
        setTabs((prevTabs) => [...prevTabs, newTab]);
        setActiveTab(tabs.length);
        setAlertOpen({ show: true, msg: res.data.message, type: "success" });
      })
      .catch((error) => {
        setAlertOpen({ show: true, msg: error.message || "Error occurred", type: "error" });
      });
  };

  //update a tab
  const handleRenameTab1 = (id) => {

    // Prepare payload
    const payload = tabs
      .map((tab) => {
        if (tab.id === id) {
          const updatedLabel = editedValue || tab.label;
          return {
            watchlistTabId: parseInt(tab.id, 10), // Convert ID to integer
            tabDisplayName: updatedLabel,
            tabDispatcherName: updatedLabel,
            // tabDispatcherName: updatedLabel.replace(/\s+/g, "").toLowerCase(),
            tabSequence: tabs.indexOf(tab) + 1, // Sequence based on index
            "userId": UserId,
          };
        }
        return null; // Only update the tab being renamed
      })
      .filter((item) => item !== null); // Remove null values


    // Call API
    api
      .post("/dashboard/updateDashWatchListTab", payload)
      .then((res) => {

        // Update the tabs state after successful API call
        setTabs((prevTabs) =>
          prevTabs.map((tab) =>
            tab.id === id
              ? { ...tab, label: editedValue || tab.label }
              : tab
          )
        );

        setAlertOpen({ show: true, msg: res.data.message, type: "success" });
      })
      .catch((error) => {
        console.error("API Error:", error.message);
        setAlertOpen({ show: true, msg: error.message || "Error occurred", type: "error" });
      });

    // Reset editing state
    setEditingTab(null);
    setEditedValue("");
  };

  const handleDeleteTab1 = (id) => {
    const payload = [{
      watchlistTabId: id.toString(),
    },
    ];
    api.post("/dashboard/removeDashWatchListTab", payload)
      .then((res) => {
        setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
        if (activeTab >= tabs.length - 1 && tabs.length > 1) {
          setActiveTab((prevActiveTab) => Math.max(0, prevActiveTab - 1));
        }
        setAlertOpen({ show: true, msg: res.data.message, type: "success" });
      })
      .catch((error) => {
        console.error("API Error:", error.message);
        setAlertOpen({ show: true, msg: error.message || "Error occurred", type: "error" });
      });
  };

  const handleCloseAlert = () => {
    setAlertOpen({ show: false, msg: '' });
  };

  const getWatchListTabsSchemeList = () => {
    api.post("/dashboard/getDashWatchListTabDataDetails", { "watchlistTabId": tabs[activeTab].id })
      .then((res) => {
        getWatchListTabsSchemeListDataToBind(res.data.data);

        // setTabList(res.data.data.sort((a, b) => a.itemSequence - b.itemSequence));
        setTabList(res.data.data.sort((a, b) => a.itemSequence - b.itemSequence));

        // Reset search bar input after adding security
        setResetSearch(true);
        setTimeout(() => setResetSearch(false), 500); // Prevent continuous resets
      })
      .catch((error) => {
        setTabList([]);
        console.error("API Error:", error.message);
      });
  }

  const getWatchListTabsSchemeListDataToBind = (listData = []) => {
    // listData.map(list => list.schemeCodeToDisplay)
    api.post("/schemes", {
      "clientCode": "35",
      "userId": "integra",
      "transactionType": 2, //pass value which is used in string search api for scheme
      "searchString": "",
      "lastBusinessDate": "2024-11-06T10:15:22.215Z",
      "getData": 0,
      "schemeCode": "",
      "multipleSchemeCode": listData.map(list => list.schemeCodeToDisplay).join(","),

    })
      .then((res) => {
        const updatedList = listData.map(items => {
          const result = res.data.find(item => item.SchemeCode === items.schemeCodeToDisplay)
          return {
            ...items,
            "SchemeName": result.SchemeName,
            "latestnav": result.LatestNAV,
            "schemeCode": items.SchemeCode,
            "trackingPercentage": (Number(result.LatestNAV) - Number(items?.navOnCreatedDate)) / Number(items?.navOnCreatedDate),
            Returns3Month: result.Returns3Month,
            Returns1Year: result.Returns1Year,
            Returns6Month: result.Returns6Month,

          }
        })

        setTabList(updatedList.sort((a, b) => a.itemSequence - b.itemSequence));
      }).catch((error) => {
        setTabList([]);
        console.error("API Error:", error.message);
      });
  }

  useEffect(() => {
    try {
      const CurrentTab = tabs[activeTab]
      if (CurrentTab) {
        getWatchListTabsSchemeList();
      }
    } catch (error) {
      console.log(error);
    }

  }, [activeTab, tabs]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        mt: 1,
        flexDirection: "column",
        gap: 0,
      }}
    >
      <SearchBar totalList={tabList.length}
        maxList={maxList} setAlertOpen={setAlertOpen}
        getWatchListTabsSchemeList={getWatchListTabsSchemeList}
        CurrentTab={tabs[activeTab]} tabList={tabList}
        resetSearch={resetSearch}
      />
      {/* Tabs and Add Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {/* Tabs */}
        <Tabs
          className="tabsborder"
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            flex: 1,
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              label={
                editingTab === tab.id ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
                    <TextField
                      defaultValue={tab.label}
                      onChange={(e) => setEditedValue(e.target.value)}
                      size="small"
                      autoFocus
                      sx={{ maxWidth: "100px" }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleRenameTab1(tab.id)}
                    >
                      Save
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0 }} className="tabname">
                    {tab.label}
                    <IconButton className="closewathnew"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTab1(tab.id);
                      }}
                    >
                      x
                    </IconButton>
                  </Box>
                )
              }
              onDoubleClick={() => setEditingTab(tab.id)}
              sx={{
                minWidth: "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
          ))}
        </Tabs>

        {/* Add Tab Button */}
        <IconButton
          onClick={handleAddTab1}
          color="primary"
          sx={{ ml: 1 }}
          className="pluscol"
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Tab Content */}
      <Box
        sx={{
          mt: 0,
          p: 0,

          borderRadius: "4px",
          minHeight: "50px",
        }}
      >
        <Typography variant="body1">
          <DragAndDropList getWatchListTabsSchemeList={getWatchListTabsSchemeList} setTabList={setTabList} CurrentTab={tabs[activeTab]} tabListData={tabList.slice(0, 2)} WatchListFieldData={WatchListFieldData} />
        </Typography>
      </Box>
      <CustomAlert
        open={alertOpen.show}
        onClose={handleCloseAlert}
        text={alertOpen.msg}
        icon={alertOpen.type}
        confirmButtonText="OK"
        cancelButtonText="Cancel"
        allowOutsideClick={false}
        width="40vw"
      />
      {tabList.length > 2 && <WatchListPopup tabListData={tabList} WatchListFieldData={WatchListFieldData} getWatchListTabsSchemeList={getWatchListTabsSchemeList} />}
    </Box>

  );
};
export default DynamicTabsStaticContent;

// --------------------previous---------------
// Handle tab change
// const handleTabChange = (event, newValue) => {
//   setActiveTab(newValue);
// };

// // Add new tab
// const handleAddTab = () => {
//   const newTab = {
//     id: tabs.length + 1,
//     label: `Watchlist ${tabs.length + 1}`,
//     content: `This is the content for Tab ${tabs.length + 1}.`,
//   };
//   setTabs([...tabs, newTab]);
//   setActiveTab(tabs.length); // Focus on the newly added tab
// };

// // Rename a tab
// const handleRenameTab = (id) => {
//   setTabs((prevTabs) =>
//     prevTabs.map((tab) =>
//       tab.id === id ? { ...tab, label: editedValue || tab.label } : tab
//     )
//   );
//   setEditingTab(null);
//   setEditedValue("");
// };

// // Delete a tab
// const handleDeleteTab = (id) => {
//   setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
//   if (activeTab >= tabs.length - 1 && tabs.length > 1) {
//     setActiveTab(activeTab - 1); // Adjust the active tab index
//   }
// };

// const [tabs, setTabs] = useState([
//   // { id: 1, label: "Watchlist 1", content: "This is the Home content." },
//   // { id: 2, label: "Watchlist 2", content: "This is the About content." },
//   // { id: 3, label: "Watchlist 3", content: "This is the Contact content." },
//   // { id: 4, label: "Watchlist 4", content: "This is the About content." },
//   // { id: 5, label: "Watchlist 5", content: "This is the Contact content." },
// ]);