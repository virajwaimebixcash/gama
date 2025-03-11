import React, { useState } from 'react';
 
 
import Grid from '@mui/material/Grid2';
const SWPViewDetailsSection = () => {
  return (
   

    <Grid container spacing={2} >
 
 
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 3, }} >
    <p>Date of Birth  </p>
    <label className='lbltxt'>11-Aug-1986</label>
    </Grid>
     
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 3, }} >
    <p>PAN  </p>
    <label className='lbltxt'>HHHDF32K</label>
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 3, }} >
    <p>Aadhaar  </p>
    <label className='lbltxt'>34345432423</label>
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 3, }} >
    <p>Gender  </p>
    <label className='lbltxt'>Male</label>
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 3, }} >
    <p>Nationality  </p>
    <label className='lbltxt'>Indian</label>
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 3, }} >
    <p>Passport  </p>
    <label className='lbltxt'>345345435</label>
    </Grid>
     
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 3, }} >
    <p>Marital Status  </p>
    <label className='lbltxt'>Married</label>
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 3, }} >
    <p>Occupation </p>
    <label className='lbltxt'>Salaried Person</label>
    </Grid>
    <Grid className="minhegt50"  size={{  xs: 6, sm: 6,  md: 4, lg: 3, }} >
    <p>Wedding Date </p>
    <label className='lbltxt'>15-Aug-2013</label>
    </Grid>
    
    
       </Grid>
    

  )
}

export default SWPViewDetailsSection