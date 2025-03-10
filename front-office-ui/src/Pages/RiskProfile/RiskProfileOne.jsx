import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import risk2 from "../../images/risk2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux/actions/actionCreators';
import api from '../../APIs/interceptor';


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
const UserId = import.meta.env.VITE_USER_ROLE_ID

const RiskProfileOne = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const riskProfileData = useSelector((state) => state.getRiskProfileConfigurationDetails?.data?.data)
console.log(riskProfileData,"riskProfileData");

    const riskProfileSkipFrequency = riskProfileData?.riskProfileSetup?.noOfFrequencyToAskSetup
    const SkipCount = riskProfileData?.riskProfileUserSetup?.riskProfileSkipCount
    const handleButtonClick = () => {
        navigate("/riskprofiletwo");
    };
    const handleSkip = () => {
        api.post('/riskProfileConfigurator/updateSkipCountUserRiskProfile',
            ({
                userId: 1,
                riskProfileSkipCount: Number(SkipCount)+1
            })
        ).then((res) => {
            navigate("/dashboard")
        }).catch((error) => {
            console.error("Error fetching config:", error);
        });
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <div className='newspacesinblocknosearch'>Risk Profile</div>

            <Grid container spacing={2} className="whitecolorbg newspacesinblocknosearch">
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, }} className="nobackscol">
                    <Item>
                       
                        <div className='padd90'>
                            <div className='black30px'>{riskProfileData?.riskProfileSetup?.rpPopupHeader}</div>
                            <div className='subinriskpro'>{riskProfileData?.riskProfileSetup?.rpPopupMessage}</div>
                            <div  style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            {SkipCount <= riskProfileSkipFrequency && (
                            <div>
                                <Button variant="contained" color="secondary" className='skiprowbtns'
                                    onClick={handleSkip}
                                >
                                    Skip
                                </Button>
                            </div>
                        )}
                                <Button variant="contained" color="secondary" className='fixbtnsizenocorner' onClick={handleButtonClick}>
                                    {riskProfileData?.riskProfileSetup?.rpPopupButton}
                                </Button>
                            </div>

                        </div>
                    </Item>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, }} className="nobackscol">
                    <Item>
                        <img src={risk2} />

                    </Item>
                </Grid>

            </Grid>
        </Box>
    );

}

export default RiskProfileOne