import React, { useState, useEffect } from "react";
import { Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import PaginationComponent from '../../Common/CustomComponents/Pagination';
import RebalancingTabs from './RebalancingTabs';
import "../../styles/PortfolioRebalance.css"
import RebalancingUpperinformation from './RebalancingUpperinformation';
import api from '../../APIs/interceptor';
import { useLocation } from "react-router-dom";
// const data = [
//   { fund: "Fund A", return1Y: "12%", return3Y: "25%", return5Y: "40%" },
//   { fund: "Fund B", return1Y: "10%", return3Y: "22%", return5Y: "38%" },
//   { fund: "Fund C", return1Y: "15%", return3Y: "28%", return5Y: "45%" },
// ];

const PortfolioRebalancingSummary = () => {
  const [headerFields, setHeaderFields] = useState([]);
  const [tabs, setTabs] = useState([]); // Stores tabs dynamically
  const [tabHeaders, setTabHeaders] = useState({}); // Stores headers per tab
  const [tabData, setTabData] = useState({});
  const [rebalancingUpperData, setRebalancingUpperData] = useState({});
  // const location = useLocation
  const location = useLocation();

  const getSummaryPageHeader = () => {
    api.post('/PortfolioRebalancingConfigurator/getSummaryPageHeaderAndGridConfiguredField', {
      "viewType": 1
    }).then((response) => {
      const headerNamesObject = {};
      // ----------for header names-----------------
      response.data.data.headerField.forEach((field) => {
        headerNamesObject[field.dispatcherName] = field.displayName;
      });
      const gridTabs = response.data.data.gridTabDetail;

      setTabs(gridTabs);
      // Process headers for each tab
      const headersPerTab = {};
      gridTabs.forEach((tab) => {
        const sortedHeaders = tab.gridColumnFields
          .filter((field) => field.isHide === "N") // Exclude hidden fields
          .sort((a, b) => a.sequence - b.sequence); // Sort by sequence

        headersPerTab[tab.tabId] = sortedHeaders; // Store headers for tabId
      });
      setTabHeaders(headersPerTab);
      setHeaderFields(headerNamesObject);

    })
      .catch((error) => console.error("Error fetching data:", error));
  }

  const getSummaryPageData = () => {
    api.post('PortfolioRebalancing/getGeneratedDeviationByModelStub', {
      "userId": 2,
      "clientCode": 35,
      "modelPortfolioID": 1,
      "productClassId": 1,
      "viewType": 1,
      "Sorting": {},
      "pageNum": 1,
      "pageSize": 10

    }).then((response) => {
      setTabData(response.data.data)
    })
  }

  useEffect(() => {
    getSummaryPageHeader();
    getSummaryPageData();
  }, []);


  return (
    <>
      <div className="newspacesinblock1">
        <div className='uppersearport '>
          <div className='herar'>
          </div>
          <div className='leftfloats font600'>Portfolio Rebalancing</div>
          <br />
          <RebalancingUpperinformation
            headerFields={headerFields}
            tabHeaders={tabHeaders}
            setRebalancingUpperData={setRebalancingUpperData}
          />
        </div>
        <RebalancingTabs
          tabHeaders={tabHeaders}
          tabs={tabs}
          rowData={tabData}
          // rebalancingUpperData={{
          //   headerFields,  // Header labels
          //   displayedValues: location.state?.selectedModel || {} // Actual displayed values
          // }} 
          rebalancingUpperData={rebalancingUpperData}

        />
        <div class="pagin">
          <PaginationComponent></PaginationComponent>

        </div>
      </div></>
  );
};

export default PortfolioRebalancingSummary;
