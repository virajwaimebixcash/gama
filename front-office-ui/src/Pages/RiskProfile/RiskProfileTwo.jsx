import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import RiskProfileQuestion from './RiskProfileQuestion';
import risk2 from "../../images/risk2.png";
const Item = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
        borderColor: '#444d58',
    }),
}));


const RiskProfileTwo = () => {


    function search(e) {
        e.preventDefault()
        setQuery(e.target.value)

    }

    return (
        <>
        {/* <TopBar></TopBar> */}
            <div className='newspacesinblocknosearch'>Risk Profile</div>
            <Grid container spacing={2} className="whitecolorbgrisk newspacesinblocknosearch">

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
                    <Item className=''>
                        <div className='divReverse'>
                            <div className='fifty  ' >
                                <RiskProfileQuestion></RiskProfileQuestion>

                            </div>
                            <div className='fifty'>
                                <img src={risk2} className='imgincellp' />
                            </div>
                        </div>
                    </Item>
                </Grid>

            </Grid>
        </>
    );
};

export default RiskProfileTwo

