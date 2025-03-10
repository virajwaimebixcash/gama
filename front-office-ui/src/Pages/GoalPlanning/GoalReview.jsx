import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import '../../styles/GoalPlanning.css'
import edit from '../../images/edit.png'
import Button from '@mui/material/Button';
import {TextField,} from "@mui/material";
import Grideightboxes from '../GoalPlanning/Grideightboxes'
import Gridfourboxes from '../GoalPlanning/Gridfourboxes'
import StockChartGoal from '../GoalPlanning/StockChartGoal'
import GoalReviewInvestment from '../GoalPlanning/GoalReviewInvestment'
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

export default function GoalReview() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        
         <div className='newspacesinblock1'>
         <div class="uppersearport ">
            <div class="herar"></div>
            <div class="width50">Goal Review</div>
            </div>
    <Grid container spacing={0}>
    <Grid size={{ xs: 12, md: 12 }}>
        <Item>
        <Grid container spacing={2}>
     
     <Grid size={{ xs: 12, md: 6 , sm: 12 ,  lg: 6}}>
       <Item className='nopaper leftlitex1'>
        <span className='lightnamecss'>Goal Name</span>
        <span className='actschname'>Audi 05</span>
       </Item>
     </Grid>
     <Grid size={{ xs: 12, md: 6 , sm: 12 ,  lg: 6}}>
       <Item className='nopaper'>
       <Button variant="contained"  className="neweditsicon" sx={{float:'left'}}>
                          <img src= {edit}/><span className='spacinicontxt'>Edit</span>  
                        </Button>

       </Item>
     </Grid>
     

   </Grid>
        </Item>
      </Grid>

      <Grid size={{ xs: 12, md: 12 }}>
      <Item className='nopassatall'>
        <Grideightboxes></Grideightboxes>
        </Item>
        </Grid>
    
      
    </Grid>
   
    <Grid container spacing={2}>
        
        <Grid size={12}>
          <Item className='nopaper'></Item>
        </Grid>
        
      </Grid>

    <Grid container spacing={2}>
        
        <Grid size={{ xs: 12, md: 6 , sm: 12 ,  lg: 6}}>
          <Item className='he350'>
         
         <Gridfourboxes></Gridfourboxes>
         


          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 6 , sm: 12 ,  lg: 6}}>
          
          <Item>
            <span className='fxheads'>Goal Return</span>
            <StockChartGoal></StockChartGoal>
            </Item>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        
        <Grid size={12}>
          <Item className='nopaper'></Item>
        </Grid>
        
      </Grid>
      <Grid container spacing={2}>
        
        <Grid size={{ xs: 12, md: 12 , sm: 12 ,  lg: 12}}>
          <Item >
        <GoalReviewInvestment></GoalReviewInvestment>
          </Item>
        </Grid>
       
      </Grid>
    </div>
  </Box>
   
    
  );
}
