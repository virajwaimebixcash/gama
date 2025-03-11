import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { TextField } from '@mui/material';
import Typography from "@mui/material/Typography";
import GoalSwitch from '../GoalPlanning/GoalSwitch';
import GoalSwitch1 from '../GoalPlanning/GoalSwitch1';
import GoalSwitch2 from '../GoalPlanning/GoalSwitch2';
import RangePicker from '../GoalPlanning/RangePicker';
import RadioTextBand from '../GoalPlanning/RadioTextBand';
import Viewshcedulepopup from './Viewshcedulepopupgoal';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Backbtn from "../../Common/FormComponent/Backbtn"
import '../../styles/GoalPlanning.css'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function GoalPlanningMain3() {
  const navigate = useNavigate();
      const goToGoalPlannig4 = () => {
        navigate("/GoalPlanningfour");
      };
  return (
   

<Box sx={{ flexGrow: 1 }}>
<div className='newspacesinblock1'>
<div class="uppersearport "><div class="herar"></div><div class="width50">Goal Planning</div>
<Backbtn className="backbtn"
            
            label={
              <div>
                <ArrowBackIosIcon className='bckbtn ' /> Back
              </div>
            }
          />
</div>

<Grid container spacing={2} className="fullwhites">
  <Grid size={{ xs: 12, sm: 12,  md: 6, lg: 6  }} className="nobxandpaper">
    <Item>
    <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
      {/* Left Grid */}
      <Grid xs={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography>
          <p className='innerptag'>Goal Name<span className='mandetstar'>*</span></p>
            <TextField size='small'
           variant="outlined"
           className='wifoselect'
      />
          </Typography>
        </Paper>
      </Grid>

      {/* Right Grid */}
      <Grid xs={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography>
          <p className='innerptag'>Target Value<span className='mandetstar'>*</span></p>
            <TextField size='small'
           variant="outlined"
           className='wifoselect'
      />
          </Typography>
        </Paper>
      </Grid>
    </Grid>

    </Item>
    <Item>
    <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
      {/* Left Grid */}
      <Grid xs={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography className='cssswitchs'>
          <p className='innerptag'>Goal Tenure<span className='mandetstar'>*</span></p>
          <table className='fulwids'>
            <tr>
              <td><GoalSwitch></GoalSwitch></td>
              <td>
              <TextField size='small'
                  variant="outlined"
                  className='wid125'
              />
              </td>
            </tr>
          </table>
          
          
           
          </Typography>
        </Paper>
      </Grid>

      {/* Right Grid */}
      <Grid xs={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography>
          <p className='innerptag'>ROI<span className='mandetstar'>*</span></p>
            <TextField size='small'
           variant="outlined"
           className='wifoselect '
      />
          </Typography>
        </Paper>
      </Grid>
    </Grid>

    </Item>
    <Item>
    <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
      {/* Left Grid */}
      <Grid xs={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography>
          <p className='innerptag'>Inflation<span className='mandetstar'>*</span></p>
           <RangePicker></RangePicker>
          </Typography>
        </Paper>
      </Grid>

      {/* Right Grid */}
      <Grid xs={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography>
          <p className='innerptag'>Inflation Adjusted Value after<span className='inflationvalback'>3 Years</span></p>
            <TextField size='small'
           variant="outlined"
           className='wifoselect'
      />
          </Typography>
        </Paper>
      </Grid>

      
    </Grid>

    </Item>

    <Item>
    <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
      {/* Left Grid */}
      <Grid xs={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography className='cssswitchs'>
          <p className='innerptag'>Goal Tenure<span className='mandetstar'>*</span></p>
          <table className=' wifoselect'>
            <tr>
              <td><GoalSwitch1></GoalSwitch1></td>
              <td>
             
              </td>
            </tr>
          </table>
          
          
           
          </Typography>
        </Paper>
      </Grid>

      {/* Right Grid */}
      <Grid xs={6}>
      <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography className='cssswitchs'>
          <p className='innerptag'>Goal Tenure<span className='mandetstar'>*</span></p>
          <table className='fulwids'>
            <tr>
              <td><GoalSwitch2></GoalSwitch2></td>
              <td>
              <TextField size='small'
                  variant="outlined"
                  className='wid125'
              />
              </td>
            </tr>
          </table>
          
          
           
          </Typography>
        </Paper>
      </Grid>
    </Grid>

    </Item>


    <Item>
    <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
      {/* Left Grid */}
      <Grid xs={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography>
          <p className='innerptag'>Recurrance Count<span className='mandetstar'>*</span></p>
           <RangePicker></RangePicker>
          </Typography>
        </Paper>
      </Grid>

      {/* Right Grid */}
      <Grid xs={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography className='schecss'>
          <Viewshcedulepopup></Viewshcedulepopup>
          </Typography>
        </Paper>
      </Grid>

      
    </Grid>
    <Grid size={{ xs: 12, sm: 12,  md: 6, lg: 6  }} className="nobxandpaper">
    <Item>
      <Button variant="contained"  className="Generatebtn genbuttons" onClick={goToGoalPlannig4} sx={{float:'left'}}>
                                  Create Goal
                              </Button>
    </Item>
  </Grid> 


    </Item>
  </Grid>
  <Grid size={{ xs: 12, sm: 12,  md: 6, lg: 6  }} className="nobxandpaper">
    <Item className='myleftbor'>
    <div class="width50 hedersinthird">Select Plan</div>
      <RadioTextBand></RadioTextBand>
    </Item>
  </Grid> 
</Grid>


</div>
</Box>
    
  );
}
