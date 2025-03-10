import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import BasicDatePicker from '../../Common/FormComponent/BasicDatePicker';
import ModelPortfolioTabs from './ModelPortfolioTabs';
// import TableWithRowspan from './TableWithRowspan';
import AddDeleteRowinModel from './AddDeleteRowinModel';
import {
    TextField,
  } from "@mui/material";
import L3Allocation from './L3Allocation';


const ModelPortfolio = () => {
  return (
    <>
    <div className="newspacesinblock1">
    <div className='uppersearport '>
       <div className='herar'>
        </div> 
                <div className='width50'>Create New Child Model</div>
        </div>
     <Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={2} className="backfff fortxtboxes">
 
 
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 2.4, }} >
    <p>Model Name</p>
    <TextField
            label=""
            id="outlined-size-small"
             placeholder=''
            size="small"
            sx={{ width: '100%' }}
          />
    </Grid>
     
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 2.4, }} >
    <p>Effective Date</p>
     <BasicDatePicker ></BasicDatePicker>
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 2.4, }} >
    <p>FM Details</p>
    <TextField
            label=""
            id="outlined-size-small"
             placeholder=''
            size="small"
            sx={{ width: '100%' }}
          />
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 2.4, }} >
    <p>Model Duration</p>
    <TextField
            label=""
            id="outlined-size-small"
             placeholder=''
            size="small"
            sx={{ width: '100%' }}
          />
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 2.4, }} >
    <p>Age bracket </p>
    <TextField
            label=""
            id="outlined-size-small"
             placeholder=''
            size="small"
            sx={{ width: '100%' }}
          />
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 2.4, }} >
    <p>Research Team </p>
    <TextField
            label=""
            id="outlined-size-small"
             placeholder=''
            size="small"
            sx={{ width: '100%' }}
          />
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 2.4, }} >
    <p>Benchmark Index </p>
    <TextField
            label=""
            id="outlined-size-small"
             placeholder=''
            size="small"
            sx={{ width: '100%' }}
          />
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 4.8, }} >
    <p>Description </p>
    <TextField
            label=""
            id="outlined-size-small"
             placeholder=''
            size="small"
            sx={{ width: '100%' }}
          />
    </Grid>
    
    
    
       </Grid>


       <Grid container spacing={2} className="">
          <ModelPortfolioTabs></ModelPortfolioTabs>
       </Grid>


       <Grid container spacing={2} className="pergapstpnabove">
          <AddDeleteRowinModel></AddDeleteRowinModel>
       </Grid>

       <Grid container spacing={2} className="pergapstpnabove">
       <L3Allocation></L3Allocation>
       </Grid>
      </Box></div></>
  );
};

export default ModelPortfolio;
