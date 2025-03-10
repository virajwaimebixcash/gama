
import React, { useState } from 'react';
 
import { styled } from '@mui/material/styles';
 
import Paper from '@mui/material/Paper';
import '../../styles/GoalPlanning.css'
 
import { Box, Typography, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';

import Investments from './Investments';
const GoalReviewInvestment = () => {

 // State to track which div is open
 const [openDiv, setOpenDiv] = useState(null);

 // Function to handle toggle (open/close one div)
 const handleToggle12 = (divId) => {
   // If the clicked div is already open, close it by setting `openDiv` to null.
   // Otherwise, open the clicked div by setting `openDiv` to its ID.
   setOpenDiv((prevDivId) => (prevDivId === divId ? null : divId));
 };


  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible(!isVisible); // Toggle the div visibility
  };
     
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
 
     
      }));
  return (
    <div>
   
       <>
     
       <Box className="maincontentgoal">
    
      <Grid container spacing={2} className="whitecolorbggoal">

     
   
       
      
           <div className='parentclass'>
 
        
      
        <div className='parentclass'>

 

        
        <Grid minHeight={20}  size={{  xs: 12, sm: 12,  md: 12, lg: 12, }} >
      <span  className='expcols' onClick={() => handleToggle12(1)}>
     <span className='subtitlegoal ' >Earmarked Investments </span> 
    <span className='buttonplus' > {openDiv === 1 ? "-" : "+"}</span> 
      </span>
     {openDiv === 1 && <div>
        <Investments></Investments>
      </div>}
     </Grid>

 

 

 

 

 
 

        </div>
  


      
    </div>

          

       
      </Grid>
    </Box>
      
    </>

    </div>

  )
}

export default GoalReviewInvestment

 