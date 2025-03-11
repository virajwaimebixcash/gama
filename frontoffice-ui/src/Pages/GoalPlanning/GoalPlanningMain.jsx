import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Goal1 from '../../images/Goal1.png'
import orangeplus from '../../images/orangeplus.png'
import HoverBox1 from '../GoalPlanning/HoverBox1'
import HoverBox2 from '../GoalPlanning/HoverBox2'
import HoverBox3 from '../GoalPlanning/HoverBox3'
import HoverBox4 from '../GoalPlanning/HoverBox4'
import HoverBox5 from '../GoalPlanning/HoverBox5'
import HoverBox6 from '../GoalPlanning/HoverBox6'
import '../../styles/GoalPlanning.css'
import { useNavigate } from "react-router-dom";

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

export default function GoalPlanningMain() {
  const navigate = useNavigate();
  const goalplanningtwo = () => {
    navigate("/GoalPlanningtwo");
  };
  return (
   
   <Box sx={{ flexGrow: 1 }}>
      
      <div className='newspacesinblock1'>
      <div class="uppersearport "><div class="herar"></div><div class="width50">Goal Planning</div></div>
      <div className='goalhalf'>
      <Grid container spacing={3}>
        <Grid sx={{xs: 6, sm: 6,  md: 6, lg: 1.5 }}>
          <Item className='gapsinmoell nopadspace'>
          <HoverBox1></HoverBox1>
         
          </Item>
          <Item className='gapsinmoell nopadspace'>
          <HoverBox2></HoverBox2>
          </Item>
        </Grid>
        <Grid sx={{xs: 6, sm: 6,  md: 6, lg: 1.5 }}>
          <Item className='gapsinmoell nopadspace'>
          <HoverBox4></HoverBox4>
      
          </Item>
          <Item className='gapsinmoell nopadspace'>
          <HoverBox6></HoverBox6>

          </Item>
        </Grid>
        <Grid sx={{xs: 6, sm: 6,  md: 6, lg: 1.5 }}>
          <Item className='gapsinmoell nopadspace' >
          <span onClick={goalplanningtwo}> <HoverBox5></HoverBox5></span>
          </Item>
          <Item className='gapsinmoell nopadspace'>
           <table className='fn600'>
                            <tr>
                              <td><img src={orangeplus} /><br/>
                              <span>Create Your Own <br></br>Goal</span>
                              </td>
                            </tr>
                            
                          </table>
          
          </Item>
        </Grid>
        <Grid sx={{xs: 6, sm: 6,  md: 6, lg: 1.5 }}>
          <Item className='gapsinmoell nopadspace'>
          <HoverBox3></HoverBox3>
          </Item>
          <Item className='gapsinmoell nopadspace'>
         
          </Item>
        </Grid>
        <Grid sx={{xs: 6, sm: 6,  md: 6, lg: 1 }} className="nopaper">
          <Item className="nopaper"></Item>
        </Grid>
        <Grid sx={{xs: 6, sm: 6,  md: 6, lg: 5 }} className='borrad10'>
          <Item className='borrad10'><img src= {Goal1} className='imgfullwid'/></Item>
        </Grid>
       
      </Grid>
      </div>
      

      
      </div>
    </Box>
    
  );
}
