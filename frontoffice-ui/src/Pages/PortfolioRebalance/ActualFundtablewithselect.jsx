import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import RebalanceSwitch from './RebalanceSwitch';
import RebalanceSelect from './RebalanceSelect';
import RebalanceSelect1 from './RebalanceSelect1';
import ExcelTooltip from './ExcelTooltip';
// import ActualRebalanceSelect from './ActualRebalanceSelect';
import Filter from './Filter';
import {
  TextField,

} from "@mui/material";
import { Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
const ActualFundtablewithselect = () => {
  return (
    <Grid container spacing={1} >


      <Grid className="minhegt50 twentyfromtop" size={{ xs: 4, sm: 4, md: 6, lg: .6, }} >
        {/* <ActualRebalanceSelect></ActualRebalanceSelect> */}
      </Grid>
      <Grid className="minhegt50 twentyfromtop" size={{ xs: 8, sm: 8, md: 6, lg: 1, }} >
        <div className='perinpbox'>

          <TextField
            label=""
            id="outlined-size-small"
            placeholder=''
            size="small"
            value="12%"
            sx={{ width: '100%' }}
          />
        </div>
      </Grid>
      <Grid className="minhegt50 twentyfromtop" size={{ xs: 4, sm: 4, md: 6, lg: .6, }} >
        <Button variant="contained" className="Generatebtn" sx={{ float: 'left' }}>
          Calculate
        </Button>

      </Grid>

    </Grid>
  )
}

export default ActualFundtablewithselect