import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import { useLocation, useNavigate } from "react-router-dom";
import yellowtick from '../../images/yellowtick.png';
import RiskProfile from './RiskProfile';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import api from '../../APIs/interceptor';
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


const RiskProfileThree = () => {
  const navigate = useNavigate();
  const data = useLocation().state
  const riskProfileSetupResultFieldData = useSelector((state) => state.getRiskProfileConfigurationDetails?.data?.data?.riskProfileSetupResultField)
const riskProfileResultPageNote =  useSelector((state) => state.getRiskProfileConfigurationDetails?.data?.data?.riskProfileSetup)
     
const handleButtonClick = () => {
    navigate("/riskprofiletwo");
  };

  const assessedRiskProfileValue = data[riskProfileSetupResultFieldData.find(item => item.dispatcherName === "assessedRiskProfile")?.dispatcherName] || "N/A";

  // Find the field with dispatcherName 'assessedRiskProfile'
// const assessedRiskProfileField = riskProfileSetupResultFieldData.find(item => item.dispatcherName === "assessedRiskProfile");

// const assessedRiskProfileValue = data[assessedRiskProfileField?.dispatcherName] || "N/A";
 // Fallback to 'N/A' if not found
  // useEffect(() => {
  //   api.post('/riskProfile/getRiskProfile',
  //     ({
  //       "clientCode": "36",
  //       "riskProfileQuestionnaire": {},
  //       "isProspect": 0,
  //       "emailSMSEnabled": 0
  //     })
  //   ).then((res) => {

  //   }).catch((error) => {
  //     console.error("Error fetching config:", error);
  //   });

  // }, [])
  
  return (
    <>
      <div className='newspacesinblocknosearch'>Risk Profile</div>
      <Grid container spacing={2} className="whitecolorbgrisk newspacesinblocknosearch">
        <div className='spacfortabheader'>Your Result</div>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
          <Item className='fixheightssmalltab'>
            <div className='newfifty paddfromleinrisk'>
              {riskProfileSetupResultFieldData?.map((item, index) => (
                <div key={index} className='texleft bordgray'>
                  <div className='smalldivtab'><img src={yellowtick} /></div>
                  <div className='wid48'>{item?.displayFieldName}</div>
                  <div className='wid48 boldme'>{data[item.dispatcherName]}</div>
                  {/* <div className='wid48' title={item?.displayFieldName}>
                    {item?.displayFieldName?.length > 30
                      ? item.displayFieldName.substring(0, 50) + '...'
                      : item.displayFieldName}
                  </div>

                  <div className='wid48 boldme' title={data[item.dispatcherName]}>
                    {data[item.dispatcherName]?.length > 30
                      ? data[item.dispatcherName].substring(0, 50) + '...'
                      : data[item.dispatcherName]}
                  </div> */}
                </div>
              ))}

              <div className='gry11size'>
                {/* As provided by the fund house documents , this risk is specific to this fund category (Equity). To know the risk of this fund perticularly , check 'Risk Vs Category' . */}
              {riskProfileResultPageNote?.rpResultPageNote}
              </div>
            </div>
            <div className='newfifty leftborderdiv' >
              <RiskProfile data={data}></RiskProfile>
           
            <div className=''>
                <span className='mediumrisk'>{assessedRiskProfileValue}</span>
            </div>
      
              {/* <div className=''><span className='mediumrisk'>med</span></div> */}

              <Button variant="contained" color="secondary" className='reassetbtn' onClick={handleButtonClick}>
                {riskProfileResultPageNote?.reassessRiskProfileButton}
              </Button>
            </div>
          </Item>
        </Grid>

      </Grid>
    </>
  );
};

export default RiskProfileThree




