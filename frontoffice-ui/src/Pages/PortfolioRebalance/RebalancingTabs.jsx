import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import Sorting from '../../Pages/ModelPortfolio/Sorting';
import Checkbox from '@mui/material/Checkbox';
import excla from "../../images/excla.png";
import { Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import FilterComponent from '../../Common/CustomComponents/FilterComponent';
import { useSelector } from 'react-redux';


function RebalancingTabs({ tabHeaders, tabs, rowData, rebalancingUpperData, sortingState, setSortingState }) {

  const [activeTab, setActiveTab] = useState(0); // Active tab index
  const [checkedRows, setCheckedRows] = useState({});
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [filterValues, setFilterValues] = useState({});
  const getApprovedValue = useSelector((state) => state.createRebalanceDetailData.data);
console.log(getApprovedValue.data,">>>>>");

  // //  Extract the current active tab headers
  //  const currentTabHeaders = tabHeaders[tabs[activeTab]?.tabId] || [];

  //  // Check if all rows have approvedValue as truthy
  //  const allChecked = rowData.length > 0 && rowData.every(row => 
  //    currentTabHeaders.some(header => header.fieldName === "approvedValue" && row[header.fieldName])
  //  );

  // Extract the current active tab headers
  const currentTabHeaders = tabHeaders[tabs[activeTab]?.tabId] || [];

  // Update checkedRows state when rowData changes
  useEffect(() => {
    if (!rowData || !Array.isArray(rowData)) return;
  
    setCheckedRows((prevCheckedRows) => {
      const newCheckedRows = rowData.reduce((acc, row) => {
        // Preserve previous state if available, otherwise initialize based on approvedValue
        const isChecked = prevCheckedRows[row.id] !== undefined
          ? prevCheckedRows[row.id]
          : currentTabHeaders.some(header => header.fieldName === "approvedValue" && row[header.fieldName]);
        
        acc[row.id] = isChecked;
        return acc;
      }, {});
  
      return newCheckedRows;
    });
  }, [rowData, activeTab, tabHeaders, tabs]);
  

  // Check if all rows are selected
  // const allChecked = rowData.length > 0 && rowData.every(row => checkedRows[row.id]);
  const allChecked = rowData.length > 0 && rowData.every(row => checkedRows[row.id]);

  const handleDetailSectionNavigation = (selectedRow) => {
    navigate('/rebalancingdetail', {
      state: {
        selectedRow,  // The clicked row data
        rebalancingUpperData // Send the upper header information
      }
    });
  };

  const handleCheckboxChange = (rowId) => {
    setCheckedRows((prev) => ({
      ...prev,  // Keep previous state
      [rowId]: !prev[rowId] // Toggle only the selected row
    }));
  };

  // Toggle all checkboxes when header checkbox is clicked
  const handleSelectAll = () => {
    const newCheckedState = !allChecked;
    setCheckedRows((prev) => {
      const updatedCheckedRows = rowData.reduce((acc, row) => {
        acc[row.id] = newCheckedState; // Toggle all rows
        return acc;
      }, {});
      return updatedCheckedRows;
    });
  };

  const handleSort = (columnFieldName, sortOrder) => {
    if (!sortOrder) {
      // If no sortOrder, reset the sortingState
      setSortingState(null);
    } else {
      // Update the sorting state with the current column and order
      setSortingState({ sortingField: columnFieldName, sortingOrder: sortOrder.toUpperCase() });
    }
  };


  return (
    <Box sx={{ width: "100%" }} className="texttranssmal1">
      <div>
        <FilterComponent
          requireExcel={true}
          requireFilter={true}
          tableConfig={tabHeaders[tabs[activeTab]?.tabId]}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        // getData={getData}
        /></div>
      <br />
      <div>
        {/* Dynamic Tabs */}
        <Tabs value={activeTab} onChange={handleChange} aria-label="tabs example">
          {tabs.map((tab, index) => (
            <Tab key={tab.tabId}
              label={
                <div>
                  <span>{tab.tabDisplayName}</span>
                </div>
              }
            />
          ))}

        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Rendering only the active tab */}
          {tabs.length > 0 && tabHeaders[tabs[activeTab]?.tabId] && (
            <TableContainer component={Paper}>
              {/* <h3>{tabs[activeTab].tabDisplayName}</h3> */}
              <Table sx={{ padding: 2 }} className="basefortabels1">
                <TableHead>
                  <TableRow className="tabheadsinalltable">
                    <TableCell>
                    <Checkbox
                        size="small"
                        checked={allChecked}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    {/* Render Headers for Active Tab */}
                    {tabHeaders[tabs[activeTab]?.tabId].map((header) => (
                      <TableCell key={header.portfolioRebalanceFieldId}>
                        <div className="fon13nrlnew lefttxt">
                          <span className="pullleft">{header.displayName}</span>

                          {/* Check if fieldName is "securityname" and add image */}
                          {header.fieldName === "securityName" && (
                            <span className="pullleft exclnewpos">
                              <img src={excla} alt="Info" />
                            </span>
                          )}
                          {header.isSortingEnable === "Y" && (
                            <span className="pullleft sorticon newposicon forsvgico">
                              <Sorting
                                header={header}
                                isActive={sortingState?.sortingField === header.fieldName}
                                currentOrder={sortingState?.sortingField === header.fieldName ? sortingState?.sortingOrder.toLowerCase() : null}
                                onSort={(newSortOrder) => handleSort(header.fieldName, newSortOrder)}
                              />
                            </span>
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* FIX: Ensure rowData is an array before mapping */}
                  {(Array.isArray(rowData) ? rowData : []).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="lavendercolor">
                        {/* <Checkbox size="small" /> */}
                        {/* <Checkbox
                          size="small"
                          checked={
                            tabHeaders[tabs[activeTab]?.tabId].some(
                              (header) => header.fieldName === "approvedValue" && row[header.fieldName]
                            )
                          }
                        /> */}
                      <Checkbox
  size="small"
  checked={checkedRows[row.id] || false}
  onChange={() => handleCheckboxChange(row.id)}
/>

                      </TableCell>
                      {tabHeaders[tabs[activeTab]?.tabId].map((header) => (
                        <TableCell key={header.portfolioRebalanceFieldId}
                          onClick={() =>
                            header.fieldName === "securityName" ||  header.fieldName === "portfolioAccName"
                              ? handleDetailSectionNavigation(row) // Pass the entire row object
                              : null
                          }
                          style={{
                            cursor: header.fieldName === "securityName" ? "pointer" : "default",
                            color: header.fieldName === "securityName" ? "blue" : "inherit",
                            // textDecoration: header.fieldName === "securityName" ? "underline" : "none",
                          }}
                        >
                          {row[header.fieldName] || '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </div>
    </Box>

  );
}

export default RebalancingTabs;
