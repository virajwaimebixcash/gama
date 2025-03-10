import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import Sorting from '../../Pages/ModelPortfolio/Sorting';
import Checkbox from '@mui/material/Checkbox';
import excla from "../../images/excla.png";
import { Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function RebalancingTabs({ tabHeaders, tabs, rowData,rebalancingUpperData }) {

  const [activeTab, setActiveTab] = useState(0); // Active tab index
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleDetailSectionNavigation = (selectedRow) => {
    navigate('/rebalancingdetail', {
      state: {
        selectedRow,  // The clicked row data
        rebalancingUpperData // Send the upper header information
      }
    });
  };
 
  return (
    <Box sx={{ width: "100%" }} className="texttranssmal1">
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
                    <Checkbox size="small" />
                  </TableCell>
                  {/* Render Headers for Active Tab */}
                  {tabHeaders[tabs[activeTab]?.tabId].map((header) => (
                    <TableCell key={header.portfolioRebalanceFieldId}>
                      <div className="fon13nrlnew lefttxt">
                        <span className="pullleft">{header.displayName}</span>

                        {/* Check if dispatcherName is "securityname" and add image */}
                        {header.dispatcherName === "securityName" && (
                          <span className="pullleft exclnewpos">
                            <img src={excla} alt="Info" />
                          </span>
                        )}
                        {header.isSortingEnable === "Y" && (
                          <span className="pullleft sorticon newposicon forsvgico">
                            <Sorting />
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
                      <Checkbox size="small" />
                    </TableCell>
                    {tabHeaders[tabs[activeTab]?.tabId].map((header) => (
                      <TableCell key={header.portfolioRebalanceFieldId}
                      onClick={() =>
                        header.dispatcherName === "securityName"
                          ? handleDetailSectionNavigation(row) // Pass the entire row object
                          : null
                      }
                      style={{
                        cursor: header.dispatcherName === "securityName" ? "pointer" : "default",
                        color: header.dispatcherName === "securityName" ? "blue" : "inherit",
                        // textDecoration: header.dispatcherName === "securityName" ? "underline" : "none",
                      }}
                      >
                        {row[header.dispatcherName] || '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>

  );
}

export default RebalancingTabs;
