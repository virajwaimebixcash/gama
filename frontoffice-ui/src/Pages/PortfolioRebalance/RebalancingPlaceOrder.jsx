import React, { useState, useEffect } from "react";
import { Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import Filter from './Filter';
import PaginationComponent from '../../Common/CustomComponents/Pagination';
import RebalancingPlaceOrderTabs from './RebalancingPlaceOrderTabs';
import ExcelTooltip from '../../Common/ExcelTooltip';
import RebalanceOrderBoxes from './RebalanceOrderBoxes';
import Grid from '@mui/material/Grid2';
import "../../styles/PortfolioRebalance.css"
import { useLocation } from "react-router-dom";
import rebalancingData from '../../../public/sample.json'
import { FormProvider, useForm } from "react-hook-form";
const data = [
  { fund: "Fund A", return1Y: "12%", return3Y: "25%", return5Y: "40%" },
  { fund: "Fund B", return1Y: "10%", return3Y: "22%", return5Y: "38%" },
  { fund: "Fund C", return1Y: "15%", return3Y: "28%", return5Y: "45%" },
];

const RebalancingPlaceOrder = () => {
  const location = useLocation();
   const selectedSummaryPageRowData = location.state?.selectedRow;
  const selectedModelData = location.state?.rebalancingUpperData?.displayedValues;
  // console.log(selectedModelData, "selectedModelData");
  const [orderPageConfig, setorderPageConfig] = React.useState(rebalancingData.data || {});
  const [selectedTab, setSelectedTab] = React.useState('Mutual Fund');
  const selectedTabDetails = orderPageConfig.tabDetails.find(order => order.tabName === selectedTab);
  const methods = useForm({ defaultValues: {} });
  const { reset, handleSubmit, watch, setValue, formState: { errors } } = methods;
  const headerConfigDetails =orderPageConfig?.headerField
  console.log(headerConfigDetails, "headerConfigDetails");
  return (
     <FormProvider {...methods}>
      <div className="newspacesinblock1">
        <div className='uppersearport20 '>
          <div className='herar'>
          </div>
          <div className='leftfloats'>Portfolio Rebalancing</div>
          <br />
          <table className="leftfloats">
            <tr>
              <td><span className="fon13nrllatest spacebetw">
                {headerConfigDetails?.find((items) => items.dispatcherName === "deviationGenerationDate")?.displayName}
              </span></td>
              <td><span className="fullblcspan spacebetw"> {new Date(selectedModelData?.effectiveDate).toISOString().split('T')[0]}</span></td>
              <td><span className="fon13nrllatest left30pix spacebetw">{headerConfigDetails?.find((items) => items.dispatcherName === "modelName")?.displayName}:</span></td>
              <td><span className="fullblcspan spacebetw">{selectedModelData?.modelName}</span></td>
              <td><span className="rebalorange">{selectedModelData?.modelType}</span></td>
            </tr>
          </table>
          <div className="rightfloats">
            <div className="rightfloats">
              <table className="excelfiltertabneg">
                <tr >
                  <td><span className="fon13nrllatest spacebetw">
                    {headerConfigDetails?.find((items) => items.dispatcherName === "portfolioType")?.displayName}:
                    </span></td>
                  <td>
                    <span className="fullblcspan spacebetw">{selectedModelData?.portfolioType}
                    </span></td>
                  <td>
                    <span className="fon13nrllatest left30pix spacebetw">
                      {headerConfigDetails?.find((items) => items.dispatcherName === "orderType")?.displayName}:
                      </span></td>
                  <td><span className="fullblcspan spacebetw"><span class="greenredbacksrebalance">{selectedModelData?.orderType}
                    </span></span></td>
                  <td><ExcelTooltip></ExcelTooltip></td>
                  {/* <td><Filter></Filter> </td> */}
                </tr>
              </table>
            </div>
          </div>
        </div>
        <RebalanceOrderBoxes selectedTabDetails={selectedTabDetails}></RebalanceOrderBoxes>
        <Grid size={12} className="spaceintwotab"></Grid>
        <Button variant="contained" className="Darkbtn darkplaceorder" sx={{ float: 'left' }}>
          Place Order
        </Button>
        <RebalancingPlaceOrderTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} orderPageConfig={orderPageConfig} selectedTabDetails={selectedTabDetails}></RebalancingPlaceOrderTabs>


        <div class="pagin">
          <PaginationComponent></PaginationComponent>

        </div>
      </div>
      </FormProvider >
  );
};

export default RebalancingPlaceOrder;
