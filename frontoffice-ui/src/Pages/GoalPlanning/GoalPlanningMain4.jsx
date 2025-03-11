import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SwipeDataGoal from '../GoalPlanning/SwipeDataGoal'
import TimelineComponent from '../GoalPlanning/TimelineComponent'
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

export default function GoalPlanningMain4() {
  return (
   
   <Box sx={{ flexGrow: 1 }}>
      <div className='newspacesinblock1'>
      <div class="uppersearport "><div class="herar"></div><div class="width50">Goal Planning</div></div>
      <SwipeDataGoal></SwipeDataGoal>
      <TimelineComponent></TimelineComponent>

      
      </div>
    </Box>
    
  );
}
