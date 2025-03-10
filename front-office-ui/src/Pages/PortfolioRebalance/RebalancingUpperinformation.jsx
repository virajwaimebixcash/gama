import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { MenuItem, Select, FormControl, InputLabel,Button, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import RebalanceSwitch from './RebalanceSwitch';
import FilterComponent from "../../Common/CustomComponents/FilterComponent"
import { useLocation } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
const RebalancingUpperinformation = ({ headerFields, tabHeaders,setRebalancingUpperData }) => {
  const navigate = useNavigate();
  const location = useLocation()
  const [filterValues, setFilterValues] = useState({});
  const [portfolioValue, setPortfolioValue] = useState("Discretionary"); // Default selected value
  const [viewTypeValue, setviewTypeValue] = useState("Portfolio"); // Default selected value
  const [toggleSwitch, setToggleSwitch] = useState(false); //  Store toggle switch state

  const handleChange = (event) => {
    setPortfolioValue(event.target.value);
  };
  const handleViewChange = (event) => {
    setviewTypeValue(event.target.value);
  };
  // console.log(location.state);

  const selectedModelData = location.state.selectedModel
  // console.log(selectedModelData);


  // Send data to the parent when values change

  useEffect(() => {
    setRebalancingUpperData({
      headerFields,
      displayedValues: {
        ...selectedModelData, // Merge model data
        orderType: toggleSwitch ? "Buy" : "Sell",
        portfolioType: portfolioValue, // Add dropdown 1
        viewType: viewTypeValue // Add dropdown 2
      }
    });
  }, [toggleSwitch, portfolioValue, viewTypeValue, selectedModelData]);

const handlePlaceOrder= () => {
    navigate('/rebalancingplaceorder')
}


  return (
    <Grid container spacing={1} >


      <Grid className="minhegt50 twentyfromtop" size={{ xs: 4, sm: 4, md: 6, lg: 1.5, }} >
        <span className="fon13nrllatest spacebetw">{headerFields?.deviationGenerationDate}</span>
      </Grid>
      <Grid className="minhegt50 twentyfromtop" size={{ xs: 8, sm: 8, md: 6, lg: 1, }} >
        <span className="fullblcspan spacebetw font600">{new Date(selectedModelData?.effectiveDate).toISOString().split('T')[0]}</span>

      </Grid>
      <Grid className="minhegt50 twentyfromtop" size={{ xs: 4, sm: 4, md: 6, lg: .9, }} >
        <span className="fon13nrllatest spacebetw">{headerFields?.modelName}</span>
      </Grid>
      <Grid className="minhegt50 twentyfromtop" size={{ xs: 8, sm: 8, md: 6, lg: 1.5, }} >
        <span className="fullblcspan spacebetw font600">{selectedModelData?.modelName}</span><span className="rebalorange">{selectedModelData?.modelType}</span>
      </Grid>

      <Grid className="minhegt50 tenfromtop alignmids" size={{ xs: 7, sm: 7, md: 4, lg: 2.2, }} >
        <div class="tgswitch11"><RebalanceSwitch isOn={toggleSwitch} setIsOn={setToggleSwitch} /></div>
      </Grid>

      <Grid className="minhegt50" size={{ xs: 12, sm: 12, md: 4, lg: 3.5, }} >
        <table>
          <tr>
            <td> <span className="fon13nrllatest">{headerFields?.portfolioType}</span> </td>
            <td>
              {/* <RebalanceSelect></RebalanceSelect> */}
              <Select
                labelId="dropdown-label"
                value={portfolioValue}
                onChange={handleChange}
                sx={{
                  height: "32px",
                  border: "1px solid #ddd",
                  color: "#000",
                  fontSize: "12px",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  ".MuiSelect-select": {
                    padding: "0 8px",
                  },
                }}
              >
                <MenuItem value="Executionary" >Executionary</MenuItem>
                <MenuItem value="Advisory" >Advisory</MenuItem>
                <MenuItem value="Discretionary">Discretionary</MenuItem>
                <MenuItem value="Non-Discretionary">Non-Discretionary</MenuItem>
              </Select>
            </td>
            <td> <span className="fon13nrllatest leftforview">{headerFields?.viewType}</span> </td>
            <td>
              <Select
                labelId="dropdown-label"
                value={viewTypeValue}
                onChange={handleViewChange}
                sx={{
                  height: "32px",
                  border: "1px solid #ddd",
                  color: "#000",
                  fontSize: "12px",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  ".MuiSelect-select": {
                    padding: "0 8px",
                  },
                }}

              >
                <MenuItem value="" >Select</MenuItem>
                <MenuItem value="Account" >By Security</MenuItem>
                <MenuItem value="Portfolio">By Portfolio Account</MenuItem>
              </Select>
            </td>
          </tr>
        </table>
      </Grid>
      <Grid className="minhegt50 genbtns" size={{ xs: 4, sm: 4, md: 4, lg: 1.4, }} >
        <Button variant="contained" className="modalcreatbtn" onClick={handlePlaceOrder}>
          Generate Orders
        </Button>
      </Grid>
      <Grid className="minhegt50 actgen" size={{ xs: 12, sm: 12, md: 4, lg: 1, }} >
        <table className="excelfiltertabext">
          <tr >
            {/* <td><ExcelTooltip></ExcelTooltip></td> */}
            <td><FilterComponent
              requireExcel={true}
              requireFilter={true}
              // tableConfig={tabHeaders}
              filterValues={filterValues}
              setFilterValues={setFilterValues}
            // getData={getData}
            /></td>
          </tr>
        </table>
      </Grid>




    </Grid>
  )
}

export default RebalancingUpperinformation