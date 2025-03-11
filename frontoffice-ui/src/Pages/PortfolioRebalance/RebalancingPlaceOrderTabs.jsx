import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import Sorting from '../../Pages/ModelPortfolio/Sorting';
import Dropdowninrebalancetables from './Dropdowninrebalancetables';
import { TextField, } from "@mui/material";
import { Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import FixedFieldRender from './FixedFieldRender';
import UdfFieldRender from './UdfFieldRender';
function RebalancingPlaceOrderTabs({ orderPageConfig = { tabDetails: [] }, selectedTab, setSelectedTab, selectedTabDetails }) {

  const gridColumnFieldsConfig = selectedTabDetails.gridColumnFields;
  console.log(gridColumnFieldsConfig, "gridColumnFieldsConfig");
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    console.log(newValue, "newValue");
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <Box sx={{ width: '100%' }} className='texttranssmal1'>

      <Tabs value={selectedTab} onChange={handleChange} aria-label="tabs example">
        {orderPageConfig.tabDetails.map((item, index) => {
          return <Tab value={item.tabName} label={
            <div>
              <span>{item.tabName}</span>
            </div>
          } />
        })}

      </Tabs>
      <Box sx={{ p: 3 }}>
        {selectedTab === 'Mutual Fund' &&
          <TableContainer component={Paper} >
            <Table sx={{ padding: 2 }} className="basefortabels2 ">
              <TableHead >
                <TableRow className="tabheadsinalltable1">
                  {gridColumnFieldsConfig.FixedField.map((field, index) => (
                    <TableCell key={index}>
                      <div className="fon13nrlnew lefttxt">
                        <span className="pullleft">{field.displayLabel}</span>
                        {field.isSortingEnable === 'Y' && (
                          <span className="pullleft sorticon newposicon forsvgico">
                            <Sorting />
                          </span>
                        )}
                      </div>
                    </TableCell>
                  ))}
                  {gridColumnFieldsConfig.UDFfield.map((udf, index) => (
                    <TableCell key={`udf-${index}`}>
                      <div className="fon13nrlnew lefttxt">
                        <span className="pullleft">{udf.label}</span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* --------------data binding section -------------- */}
              <TableBody>
                <TableRow>

                  {gridColumnFieldsConfig.FixedField.map((field, index) => (
                    <TableCell key={index}>
          
                          <FixedFieldRender    indexNumber={0} displayLabel={false} fixedFormConfig={[field]} />
                        
                    </TableCell>
                  ))}
                  {gridColumnFieldsConfig.UDFfield.map((udf, index) => (
                    <TableCell key={`udf-${index}`}>
                      <UdfFieldRender  displayLabel={false} config={udf}
                        index={0}
                        indexNumber={0}
                        disabledform={false}
                        isTable={false}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
              {/* --------------data binding section -------------- */}
            </Table>
          </TableContainer>
        }
        {selectedTab === 'Equity' &&
          <TableContainer component={Paper} >
            <Table sx={{ padding: 2 }} className="basefortabels2 ">
              <TableHead >
                <TableRow className="tabheadsinalltable1">
                  {gridColumnFieldsConfig.FixedField.map((field, index) => (
                    <TableCell key={index}>
                      <div className="fon13nrlnew lefttxt">
                        <span className="pullleft">{field.displayLabel}</span>
                        {field.isSortingEnable === 'Y' && (
                          <span className="pullleft sorticon newposicon forsvgico">
                            <Sorting />
                          </span>
                        )}
                      </div>
                    </TableCell>
                  ))}
                  {gridColumnFieldsConfig.UDFfield.map((udf, index) => (
                    <TableCell key={`udf-${index}`}>
                      <div className="fon13nrlnew lefttxt">
                        <span className="pullleft">{udf.label}</span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* --------------data binding section -------------- */}
              <TableBody>
              <TableRow>

              {gridColumnFieldsConfig.FixedField.map((field, index) => (
                    <TableCell key={index}>
          
                          <FixedFieldRender displayLabel={false} fixedFormConfig={[field]} />
                        
                    </TableCell>
                  ))}
                  {gridColumnFieldsConfig.UDFfield.map((udf, index) => (
                    <TableCell key={`udf-${index}`}>
                      <UdfFieldRender  displayLabel={false} config={udf}
                        index={0}
                        disabledform={false}
                        isTable={false}
                      />
                    </TableCell>
                  ))}
              </TableRow>
            </TableBody>
              {/* --------------data binding section -------------- */}
            </Table>
          </TableContainer>
        }

      </Box>
    </Box>
  );
}

export default RebalancingPlaceOrderTabs;


// <TableCell className="">Folio</TableCell>
// <TableCell className="">Amount</TableCell>
// <TableCell className="">Platform</TableCell>
// <TableCell className="">Order Sourced By</TableCell>
// <TableCell className="">Introduced By</TableCell>
// <TableCell className="">Distributor</TableCell>
// <TableCell className="">Execution Mode</TableCell>