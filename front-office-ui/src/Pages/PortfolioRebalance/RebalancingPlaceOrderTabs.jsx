import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import Sorting from '../../Pages/ModelPortfolio/Sorting';
import Dropdowninrebalancetables from './Dropdowninrebalancetables';
import { TextField,} from "@mui/material";
import { Table, TableBody,Button, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
function RebalancingPlaceOrderTabs() {
  const [value, setValue] = useState(0); // To track the active tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <Box sx={{ width: '100%' }} className='texttranssmal1'>
     
      <Tabs value={value} onChange={handleChange} aria-label="tabs example">
        <Tab label={
              <div>
                <span>Mutual Fund</span>
               
              </div>
            } />
        <Tab label={
              <div>
                <span>ETF</span>
               
              </div>
            } />
        <Tab label={
              <div>
                <span>AIF</span>
                
              </div>
            } />
       <Tab label={
              <div>
                <span>RIETs</span>
                
              </div>
            } />
            <Tab label={
              <div>
                <span>InVIT</span>
                
              </div>
            } />
      
      </Tabs>
      <Box sx={{ p: 3 }}>
        {value === 0 && 
        <TableContainer component={Paper} >
        <Table sx={{  padding: 2}} className="basefortabels2 ">
          <TableHead >
            <TableRow className="tabheadsinalltable1">
              
              <TableCell><div className='fon13nrlnew lefttxt'> <span className='pullleft'>Security Name</span> <span  className='pullleft sorticon newposicon forsvgico'><Sorting></Sorting> </span></div></TableCell>
              <TableCell className="">Portfolio Account</TableCell>
              <TableCell className="">Folio</TableCell>
              <TableCell className="">Amount</TableCell>
              <TableCell className="">Platform</TableCell>
              <TableCell className="">Order Sourced By</TableCell>
              <TableCell className="">Introduced By</TableCell>
              <TableCell className="">Distributor</TableCell>
              <TableCell className="">Execution Mode</TableCell>
             
              
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                
                <TableCell>ICICI Flexi cap fund</TableCell>
                <TableCell>9858-Kiran Katkar</TableCell>
                <TableCell className="zercss">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="">
                  238945.00
                </TableCell>
                <TableCell className="zercss">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="zercss">
                <TextField
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    sx={{ width: '130px' }}
                  />
                </TableCell>
                <TableCell className="">
                <TextField
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    sx={{ width: '130px' }}
                  />
                </TableCell>
                <TableCell className="">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
              </TableRow>
          </TableBody>
          <TableBody>
              <TableRow>
                
                <TableCell>ICICI Flexi cap fund</TableCell>
                <TableCell>9858-Kiran Katkar</TableCell>
                <TableCell className="zercss">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="">
                  238945.00
                </TableCell>
                <TableCell className="zercss">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="zercss">
                <TextField
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    sx={{ width: '130px' }}
                  />
                </TableCell>
                <TableCell className="">
                <TextField
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    sx={{ width: '130px' }}
                  />
                </TableCell>
                <TableCell className="">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
              </TableRow>
          </TableBody>
          <TableBody>
              <TableRow>
                
                <TableCell>ICICI Flexi cap fund</TableCell>
                <TableCell>9858-Kiran Katkar</TableCell>
                <TableCell className="zercss">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="">
                  238945.00
                </TableCell>
                <TableCell className="zercss">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="zercss">
                <TextField
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    sx={{ width: '130px' }}
                  />
                </TableCell>
                <TableCell className="">
                <TextField
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    sx={{ width: '130px' }}
                  />
                </TableCell>
                <TableCell className="">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
              </TableRow>
          </TableBody>
          <TableBody>
              <TableRow>
                
                <TableCell>ICICI Flexi cap fund</TableCell>
                <TableCell>9858-Kiran Katkar</TableCell>
                <TableCell className="zercss">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="">
                  238945.00
                </TableCell>
                <TableCell className="zercss">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="zercss">
                <TextField
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    sx={{ width: '130px' }}
                  />
                </TableCell>
                <TableCell className="">
                <TextField
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    sx={{ width: '130px' }}
                  />
                </TableCell>
                <TableCell className="">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
              </TableRow>
          </TableBody>
          <TableBody>
              <TableRow>
                
                <TableCell>ICICI Flexi cap fund</TableCell>
                <TableCell>9858-Kiran Katkar</TableCell>
                <TableCell className="zercss">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="">
                  238945.00
                </TableCell>
                <TableCell className="zercss">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="zercss">
                <TextField
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    sx={{ width: '130px' }}
                  />
                </TableCell>
                <TableCell className="">
                <TextField
                    label=""
                    id="outlined-size-small"
                    placeholder=''
                    size="small"
                    sx={{ width: '130px' }}
                  />
                </TableCell>
                <TableCell className="">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
                <TableCell className="">
                <Dropdowninrebalancetables></Dropdowninrebalancetables>
                </TableCell>
              </TableRow>
          </TableBody>
          
        </Table>
      </TableContainer>
        }
        {value === 1 && 
          <TableContainer component={Paper} >
          <Table sx={{  padding: 2}} className="basefortabels2 ">
            <TableHead >
              <TableRow className="tabheadsinalltable1">
                
                <TableCell><div className='fon13nrlnew lefttxt'> <span className='pullleft'>Security Name</span> <span  className='pullleft sorticon newposicon forsvgico'><Sorting></Sorting> </span></div></TableCell>
                <TableCell className="">Portfolio Account</TableCell>
                <TableCell className="">Folio</TableCell>
                <TableCell className="">Amount</TableCell>
                <TableCell className="">Platform</TableCell>
                <TableCell className="">Order Sourced By</TableCell>
                <TableCell className="">Introduced By</TableCell>
                <TableCell className="">Distributor</TableCell>
                <TableCell className="">Execution Mode</TableCell>
               
                
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  
                  <TableCell>ICICI Flexi cap fund</TableCell>
                  <TableCell>9858-Kiran Katkar</TableCell>
                  <TableCell className="zercss">
                    <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="">
                    238945.00
                  </TableCell>
                  <TableCell className="zercss">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="zercss">
                  <TextField
                      label=""
                      id="outlined-size-small"
                      placeholder=''
                      size="small"
                      sx={{ width: '130px' }}
                    />
                  </TableCell>
                  <TableCell className="">
                  <TextField
                      label=""
                      id="outlined-size-small"
                      placeholder=''
                      size="small"
                      sx={{ width: '130px' }}
                    />
                  </TableCell>
                  <TableCell className="">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                </TableRow>
            </TableBody>
            <TableBody>
                <TableRow>
                  
                  <TableCell>ICICI Flexi cap fund</TableCell>
                  <TableCell>9858-Kiran Katkar</TableCell>
                  <TableCell className="zercss">
                    <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="">
                    238945.00
                  </TableCell>
                  <TableCell className="zercss">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="zercss">
                  <TextField
                      label=""
                      id="outlined-size-small"
                      placeholder=''
                      size="small"
                      sx={{ width: '130px' }}
                    />
                  </TableCell>
                  <TableCell className="">
                  <TextField
                      label=""
                      id="outlined-size-small"
                      placeholder=''
                      size="small"
                      sx={{ width: '130px' }}
                    />
                  </TableCell>
                  <TableCell className="">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                </TableRow>
            </TableBody>
            <TableBody>
                <TableRow>
                  
                  <TableCell>ICICI Flexi cap fund</TableCell>
                  <TableCell>9858-Kiran Katkar</TableCell>
                  <TableCell className="zercss">
                    <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="">
                    238945.00
                  </TableCell>
                  <TableCell className="zercss">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="zercss">
                  <TextField
                      label=""
                      id="outlined-size-small"
                      placeholder=''
                      size="small"
                      sx={{ width: '130px' }}
                    />
                  </TableCell>
                  <TableCell className="">
                  <TextField
                      label=""
                      id="outlined-size-small"
                      placeholder=''
                      size="small"
                      sx={{ width: '130px' }}
                    />
                  </TableCell>
                  <TableCell className="">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                </TableRow>
            </TableBody>
            <TableBody>
                <TableRow>
                  
                  <TableCell>ICICI Flexi cap fund</TableCell>
                  <TableCell>9858-Kiran Katkar</TableCell>
                  <TableCell className="zercss">
                    <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="">
                    238945.00
                  </TableCell>
                  <TableCell className="zercss">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="zercss">
                  <TextField
                      label=""
                      id="outlined-size-small"
                      placeholder=''
                      size="small"
                      sx={{ width: '130px' }}
                    />
                  </TableCell>
                  <TableCell className="">
                  <TextField
                      label=""
                      id="outlined-size-small"
                      placeholder=''
                      size="small"
                      sx={{ width: '130px' }}
                    />
                  </TableCell>
                  <TableCell className="">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                </TableRow>
            </TableBody>
            <TableBody>
                <TableRow>
                  
                  <TableCell>ICICI Flexi cap fund</TableCell>
                  <TableCell>9858-Kiran Katkar</TableCell>
                  <TableCell className="zercss">
                    <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="">
                    238945.00
                  </TableCell>
                  <TableCell className="zercss">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="zercss">
                  <TextField
                      label=""
                      id="outlined-size-small"
                      placeholder=''
                      size="small"
                      sx={{ width: '130px' }}
                    />
                  </TableCell>
                  <TableCell className="">
                  <TextField
                      label=""
                      id="outlined-size-small"
                      placeholder=''
                      size="small"
                      sx={{ width: '130px' }}
                    />
                  </TableCell>
                  <TableCell className="">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                  <TableCell className="">
                  <Dropdowninrebalancetables></Dropdowninrebalancetables>
                  </TableCell>
                </TableRow>
            </TableBody>
            
          </Table>
        </TableContainer>
         }
        {value === 2 &&  
         <TableContainer component={Paper} >
         <Table sx={{  padding: 2}} className="basefortabels2 ">
           <TableHead >
             <TableRow className="tabheadsinalltable1">
               
               <TableCell><div className='fon13nrlnew lefttxt'> <span className='pullleft'>Security Name</span> <span  className='pullleft sorticon newposicon forsvgico'><Sorting></Sorting> </span></div></TableCell>
               <TableCell className="">Portfolio Account</TableCell>
               <TableCell className="">Folio</TableCell>
               <TableCell className="">Amount</TableCell>
               <TableCell className="">Platform</TableCell>
               <TableCell className="">Order Sourced By</TableCell>
               <TableCell className="">Introduced By</TableCell>
               <TableCell className="">Distributor</TableCell>
               <TableCell className="">Execution Mode</TableCell>
              
               
             </TableRow>
           </TableHead>
           <TableBody>
               <TableRow>
                 
                 <TableCell>ICICI Flexi cap fund</TableCell>
                 <TableCell>9858-Kiran Katkar</TableCell>
                 <TableCell className="zercss">
                   <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="">
                   238945.00
                 </TableCell>
                 <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="zercss">
                 <TextField
                     label=""
                     id="outlined-size-small"
                     placeholder=''
                     size="small"
                     sx={{ width: '130px' }}
                   />
                 </TableCell>
                 <TableCell className="">
                 <TextField
                     label=""
                     id="outlined-size-small"
                     placeholder=''
                     size="small"
                     sx={{ width: '130px' }}
                   />
                 </TableCell>
                 <TableCell className="">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
               </TableRow>
           </TableBody>
           <TableBody>
               <TableRow>
                 
                 <TableCell>ICICI Flexi cap fund</TableCell>
                 <TableCell>9858-Kiran Katkar</TableCell>
                 <TableCell className="zercss">
                   <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="">
                   238945.00
                 </TableCell>
                 <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="zercss">
                 <TextField
                     label=""
                     id="outlined-size-small"
                     placeholder=''
                     size="small"
                     sx={{ width: '130px' }}
                   />
                 </TableCell>
                 <TableCell className="">
                 <TextField
                     label=""
                     id="outlined-size-small"
                     placeholder=''
                     size="small"
                     sx={{ width: '130px' }}
                   />
                 </TableCell>
                 <TableCell className="">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
               </TableRow>
           </TableBody>
           <TableBody>
               <TableRow>
                 
                 <TableCell>ICICI Flexi cap fund</TableCell>
                 <TableCell>9858-Kiran Katkar</TableCell>
                 <TableCell className="zercss">
                   <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="">
                   238945.00
                 </TableCell>
                 <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="zercss">
                 <TextField
                     label=""
                     id="outlined-size-small"
                     placeholder=''
                     size="small"
                     sx={{ width: '130px' }}
                   />
                 </TableCell>
                 <TableCell className="">
                 <TextField
                     label=""
                     id="outlined-size-small"
                     placeholder=''
                     size="small"
                     sx={{ width: '130px' }}
                   />
                 </TableCell>
                 <TableCell className="">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
               </TableRow>
           </TableBody>
           <TableBody>
               <TableRow>
                 
                 <TableCell>ICICI Flexi cap fund</TableCell>
                 <TableCell>9858-Kiran Katkar</TableCell>
                 <TableCell className="zercss">
                   <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="">
                   238945.00
                 </TableCell>
                 <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="zercss">
                 <TextField
                     label=""
                     id="outlined-size-small"
                     placeholder=''
                     size="small"
                     sx={{ width: '130px' }}
                   />
                 </TableCell>
                 <TableCell className="">
                 <TextField
                     label=""
                     id="outlined-size-small"
                     placeholder=''
                     size="small"
                     sx={{ width: '130px' }}
                   />
                 </TableCell>
                 <TableCell className="">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
               </TableRow>
           </TableBody>
           <TableBody>
               <TableRow>
                 
                 <TableCell>ICICI Flexi cap fund</TableCell>
                 <TableCell>9858-Kiran Katkar</TableCell>
                 <TableCell className="zercss">
                   <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="">
                   238945.00
                 </TableCell>
                 <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="zercss">
                 <TextField
                     label=""
                     id="outlined-size-small"
                     placeholder=''
                     size="small"
                     sx={{ width: '130px' }}
                   />
                 </TableCell>
                 <TableCell className="">
                 <TextField
                     label=""
                     id="outlined-size-small"
                     placeholder=''
                     size="small"
                     sx={{ width: '130px' }}
                   />
                 </TableCell>
                 <TableCell className="">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
                 <TableCell className="">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
                 </TableCell>
               </TableRow>
           </TableBody>
           
         </Table>
       </TableContainer>
        }
      {value === 3 && 
       <TableContainer component={Paper} >
       <Table sx={{  padding: 2}} className="basefortabels2 ">
         <TableHead >
           <TableRow className="tabheadsinalltable1">
             
             <TableCell><div className='fon13nrlnew lefttxt'> <span className='pullleft'>Security Name</span> <span  className='pullleft sorticon newposicon forsvgico'><Sorting></Sorting> </span></div></TableCell>
             <TableCell className="">Portfolio Account</TableCell>
             <TableCell className="">Folio</TableCell>
             <TableCell className="">Amount</TableCell>
             <TableCell className="">Platform</TableCell>
             <TableCell className="">Order Sourced By</TableCell>
             <TableCell className="">Introduced By</TableCell>
             <TableCell className="">Distributor</TableCell>
             <TableCell className="">Execution Mode</TableCell>
            
             
           </TableRow>
         </TableHead>
         <TableBody>
             <TableRow>
               
               <TableCell>ICICI Flexi cap fund</TableCell>
               <TableCell>9858-Kiran Katkar</TableCell>
               <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
                 238945.00
               </TableCell>
               <TableCell className="zercss">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="zercss">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
             </TableRow>
         </TableBody>
         <TableBody>
             <TableRow>
               
               <TableCell>ICICI Flexi cap fund</TableCell>
               <TableCell>9858-Kiran Katkar</TableCell>
               <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
                 238945.00
               </TableCell>
               <TableCell className="zercss">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="zercss">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
             </TableRow>
         </TableBody>
         <TableBody>
             <TableRow>
               
               <TableCell>ICICI Flexi cap fund</TableCell>
               <TableCell>9858-Kiran Katkar</TableCell>
               <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
                 238945.00
               </TableCell>
               <TableCell className="zercss">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="zercss">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
             </TableRow>
         </TableBody>
         <TableBody>
             <TableRow>
               
               <TableCell>ICICI Flexi cap fund</TableCell>
               <TableCell>9858-Kiran Katkar</TableCell>
               <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
                 238945.00
               </TableCell>
               <TableCell className="zercss">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="zercss">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
             </TableRow>
         </TableBody>
         <TableBody>
             <TableRow>
               
               <TableCell>ICICI Flexi cap fund</TableCell>
               <TableCell>9858-Kiran Katkar</TableCell>
               <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
                 238945.00
               </TableCell>
               <TableCell className="zercss">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="zercss">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
             </TableRow>
         </TableBody>
         
       </Table>
     </TableContainer>}


    {value === 4 && 
       <TableContainer component={Paper} >
       <Table sx={{  padding: 2}} className="basefortabels2 ">
         <TableHead >
           <TableRow className="tabheadsinalltable1">
             
             <TableCell><div className='fon13nrlnew lefttxt'> <span className='pullleft'>Security Name</span> <span  className='pullleft sorticon newposicon forsvgico'><Sorting></Sorting> </span></div></TableCell>
             <TableCell className="">Portfolio Account</TableCell>
             <TableCell className="">Folio</TableCell>
             <TableCell className="">Amount</TableCell>
             <TableCell className="">Platform</TableCell>
             <TableCell className="">Order Sourced By</TableCell>
             <TableCell className="">Introduced By</TableCell>
             <TableCell className="">Distributor</TableCell>
             <TableCell className="">Execution Mode</TableCell>
            
             
           </TableRow>
         </TableHead>
         <TableBody>
             <TableRow>
               
               <TableCell>ICICI Flexi cap fund</TableCell>
               <TableCell>9858-Kiran Katkar</TableCell>
               <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
                 238945.00
               </TableCell>
               <TableCell className="zercss">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="zercss">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
             </TableRow>
         </TableBody>
         <TableBody>
             <TableRow>
               
               <TableCell>ICICI Flexi cap fund</TableCell>
               <TableCell>9858-Kiran Katkar</TableCell>
               <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
                 238945.00
               </TableCell>
               <TableCell className="zercss">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="zercss">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
             </TableRow>
         </TableBody>
         <TableBody>
             <TableRow>
               
               <TableCell>ICICI Flexi cap fund</TableCell>
               <TableCell>9858-Kiran Katkar</TableCell>
               <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
                 238945.00
               </TableCell>
               <TableCell className="zercss">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="zercss">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
             </TableRow>
         </TableBody>
         <TableBody>
             <TableRow>
               
               <TableCell>ICICI Flexi cap fund</TableCell>
               <TableCell>9858-Kiran Katkar</TableCell>
               <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
                 238945.00
               </TableCell>
               <TableCell className="zercss">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="zercss">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
             </TableRow>
         </TableBody>
         <TableBody>
             <TableRow>
               
               <TableCell>ICICI Flexi cap fund</TableCell>
               <TableCell>9858-Kiran Katkar</TableCell>
               <TableCell className="zercss">
                 <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
                 238945.00
               </TableCell>
               <TableCell className="zercss">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="zercss">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <TextField
                   label=""
                   id="outlined-size-small"
                   placeholder=''
                   size="small"
                   sx={{ width: '130px' }}
                 />
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
               <TableCell className="">
               <Dropdowninrebalancetables></Dropdowninrebalancetables>
               </TableCell>
             </TableRow>
         </TableBody>
         
       </Table>
     </TableContainer>}
      </Box>
    </Box>
  );
}

export default RebalancingPlaceOrderTabs;
