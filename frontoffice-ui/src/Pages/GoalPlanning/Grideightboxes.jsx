import { useState } from "react";

import Grid from '@mui/material/Grid2';
import { Box } from "@mui/material";
import {TextField,} from "@mui/material";
import sortarrows from '../../images/sortarrows.png'
import SelectForGoal from '../GoalPlanning/SelectForGoal'
const Grideightboxes = () => {
  const [isYears, setIsYears] = useState(true);

  return (
    <Grid container spacing={0}>
     
        <Grid size={{xs: 12, sm: 12,  md: 6, lg: 1.5  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightboxnobottom'>Target Value</div>
          
           <TextField
                   label=""
                   className='fulfontsize'
                   textAlign="center"
                  defaultValue='250,000'
                   size="small"
                   sx={{ width: '100%' }}
                 />
          </Box>
        </Grid>
        <Grid size={{xs: 12, sm: 12,  md: 6, lg: 1.5  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightbox datefromtp'>Start Date</div>
          
          <span className='datecss'>29-Feb-2025</span>
          </Box>
        </Grid>
        <Grid size={{xs: 12, sm: 12,  md: 6, lg: 1.5  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightbox datefromtp'>End Date</div>
          
          <span className='datecss '>29-Feb-2025</span>
          </Box>
        </Grid>
        <Grid size={{xs: 12, sm: 12,  md: 6, lg: 1.5  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightboxnobottom'>Goal Tenure</div>
           <table className="neg3">
      <tr>
        <td>
          <TextField
            label=""
            className="fulfontsize"
            textAlign="center"
            defaultValue="3"
            size="small"
            sx={{ width: "100%" }}
          />
        </td>
        <td>
          <span className="datecss">{isYears ? "Years" : "Months"}</span>
        </td>
        <td>
          <span>
            <img
              className="tentop cursor-pointer"
              src={sortarrows}
              alt="Toggle"
              onClick={() => setIsYears(!isYears)}
            />
          </span>
        </td>
      </tr>
    </table>
           
          </Box>
        </Grid>


        <Grid size={{xs: 12, sm: 12,  md: 6, lg: 1.5  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightbox'>Investment Style</div>
          <SelectForGoal></SelectForGoal>
           
          </Box>
        </Grid>


        <Grid size={{xs: 12, sm: 12,  md: 6, lg: 1.5  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightboxnobottom'>Monthly Investment</div>
          
           <TextField
                   label=""
                   className='fulfontsize disbackcol'
                   textAlign="center"
                  defaultValue='13,876.43'
                   size="small"
                   disabled
                   sx={{ width: '100%' }}
                 />
          </Box>
        </Grid>

        <Grid size={{xs: 12, sm: 12,  md: 6, lg: 1.5  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightboxnobottom'>Inflation</div>
          
           <TextField
                   label=""
                   className='fulfontsize'
                   textAlign="center"
                  defaultValue='6% p.a.'
                   size="small"
                   sx={{ width: '100%' }}
                 />
          </Box>
        </Grid>
        <Grid size={{xs: 12, sm: 12,  md: 6, lg: 1.5  }} >
          <Box
            sx={{
              borderRight:"1px solid #ddd",
              borderTop:"1px solid #ddd",
              padding: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              height: 65, // Adjust as needed
              
               
            }}
          >
           <div className='subineightboxnobottom'>ROI</div>
          
           <TextField
                   label=""
                   className='fulfontsize'
                   textAlign="center"
                  defaultValue='12% p.a.'
                   size="small"
                   sx={{ width: '100%' }}
                 />
          </Box>
        </Grid>
     
    </Grid>
  );
};

export default Grideightboxes;
