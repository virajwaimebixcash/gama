import React from 'react'
 
import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import risk from "../../../images/risk.png";
const Item = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
    
  }));

const DividendHistory = () => {
  return (
    <Grid size={{ xs: 12, sm: 12,  md: 6, lg: 4  }}>
    <Item className='fixheights mostly-customized-scrollbar'>
    <div className='fullsize logospac'>
    <div className='minh35new negatops'><div class="divwithoutsec"><div class="texleft"><img src= {risk} /></div></div>
    <div class="width60">
        <div class="padds12">
            <div class="texleft">
        <span class="padmeleftheader">Dividend History</span>
        <span className='subfont'> </span>
        </div>
        </div>
        </div>
        </div>
       
        <table className='newtable4'>
            <thead>
                <tr>
                    <th className='bordersmllbtm'>Record Date /<br/>Payout Date</th>
                    <th className='bordersmllbtm'>NAVPU<br/>Cum IDCW</th>
                    <th className='bordersmllbtm'>Dividend</th>
                    <th className='bordersmllbtm'>NAVPU<br/>Ex IDCW</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='bordersmllbtm'>17/10/2024</td>
                    <td className='bordersmllbtm'>10.4177</td>
                    <td className='bordersmllbtm'>0.0498</td>
                    <td className='bordersmllbtm'>10.4675</td>
                </tr>
           
           
            </tbody>
        </table>  
    </div>
   
    </Item>
</Grid>
  )
}

export default DividendHistory