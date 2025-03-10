import React from "react";
import { Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import Filter from './Filter';
import PaginationComponent from '../../Common/CustomComponents/Pagination';
import RebalancingPlaceOrderTabs from './RebalancingPlaceOrderTabs';
import ExcelTooltip from '../../Common/ExcelTooltip';
import RebalanceOrderBoxes from './RebalanceOrderBoxes';
import Grid from '@mui/material/Grid2';
import "../../styles/PortfolioRebalance.css"
const data = [
  { fund: "Fund A", return1Y: "12%", return3Y: "25%", return5Y: "40%" },
  { fund: "Fund B", return1Y: "10%", return3Y: "22%", return5Y: "38%" },
  { fund: "Fund C", return1Y: "15%", return3Y: "28%", return5Y: "45%" },
];

const RebalancingPlaceOrder = () => {
  return (
    <>
      <div className="newspacesinblock1">
        <div className='uppersearport20 '>
          <div className='herar'>
          </div>
          <div className='leftfloats'>Portfolio Rebalancing</div>
          <br />
          <table className="leftfloats">
            <tr>
              <td><span className="fon13nrllatest spacebetw">Date:</span></td>
              <td><span className="fullblcspan spacebetw">06-Feb-2025</span></td>
              <td><span className="fon13nrllatest left30pix spacebetw">Model:</span></td>
              <td><span className="fullblcspan spacebetw">Wealthman Model</span></td>
              <td><span className="rebalorange">Parent</span></td>
            </tr>
          </table>

          <div className="rightfloats">
            <div className="rightfloats">

              <table className="excelfiltertabneg">
                <tr >
                  <td><span className="fon13nrllatest spacebetw">Portfolio Type:</span></td>
                  <td><span className="fullblcspan spacebetw">Executionary</span></td>
                  <td><span className="fon13nrllatest left30pix spacebetw">Order Type:</span></td>
                  <td><span className="fullblcspan spacebetw"><span class="greenredbacksrebalance">Buy</span></span></td>
                  <td><ExcelTooltip></ExcelTooltip></td>
                  {/* <td><Filter></Filter> </td> */}
                </tr>
              </table>
            </div>


          </div>



        </div>
        <RebalanceOrderBoxes></RebalanceOrderBoxes>
        <Grid size={12} className="spaceintwotab"></Grid>
        <Button variant="contained" className="Darkbtn darkplaceorder" sx={{ float: 'left' }}>
          Place Order
        </Button>
        <RebalancingPlaceOrderTabs></RebalancingPlaceOrderTabs>


        <div class="pagin">
          <PaginationComponent></PaginationComponent>

        </div>
      </div></>
  );
};

export default RebalancingPlaceOrder;
