import Grid from '@mui/material/Grid2';
import { Box } from "@mui/material";
import {TextField,} from "@mui/material";
import sortarrows from '../../images/sortarrows.png'
const Gridfourboxes = () => {
  return (
    <Grid container spacing={0}>
     
        <Grid size={{ xs: 6, sm: 6,  md: 6, lg: 3  }} >
          <Box className="shobotgry "
            sx={{
              borderRight:"1px solid #ddd",
              
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightboxnobottom'>Net ROI</div>
          
           <span className='datecss '>6% p.a.</span>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, sm: 6,  md: 6, lg: 3  }} >
          <Box className="shobotgry norigline"
            sx={{
              borderRight:"1px solid #ddd",
    
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightbox '>Time Lapsed (In Months)</div>
          
           <span className='datecss '>5 Months</span>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, sm: 6,  md: 6, lg: 3  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
             
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightbox  '>Expected Net IRR <span><img className='tentop' src= {sortarrows}/></span></div>
          
          <span className='datecss '>6.00% p.a.</span>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, sm: 6,  md: 6, lg: 3  }} >
          <Box
            sx={{
              
    
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightboxnobottom'>Actual Net IRR <span><img className='tentop' src= {sortarrows}/></span></div>
           <span className='negvalues'>-9.00</span><span className='datecss '>p.a.</span>
           
          </Box>
        </Grid>

        <Grid size={{ xs: 6, sm: 6,  md: 6, lg: 3  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              borderBottom:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightboxnobottom'>Expected Value</div>
          
           <span className='datecss '>69,470.57</span>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, sm: 6,  md: 6, lg: 3  }} >
          <Box className="norigline"
            sx={{
              borderRight:"1px solid #ddd",
              borderBottom:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightbox  '>Current Value</div>
          
          <span className='datecss'>66,932.30</span>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, sm: 6,  md: 6, lg: 3  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              borderBottom:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightbox  '>Ampunt Invested</div>
          
          <span className='datecss '>48,457.40</span>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, sm: 6,  md: 6, lg: 3  }} >
          <Box
            sx={{
             
              borderTop:"1px solid #ddd",
              borderBottom:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightboxnobottom'>Unrealized Gain/Loss</div>
           <span className='datecss '><span className='purenge'>-11111</span></span>
           
          </Box>
        </Grid>


        

        
        
     
    </Grid>
  );
};

export default Gridfourboxes;
