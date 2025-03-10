import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import Backbtn from "../../Common/FormComponent/Backbtn"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InvestNowTabs from './InvestNowTabs';
import { useSelector } from 'react-redux';

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

const InvestNow = () => {
  const addtoCartPayload = useSelector((state) => state.addtoCart.payload);

  return (
    <>
      {/* <TopBar></TopBar> */}
      <div className='maincontent'>
        <div className='uppersear '>
          <div className='herar'>
            <span className='activetabs'>Home -{'>'}</span>
            <span className='activetabs'>Equity -{'>'}</span>
            <span className='inactivetabs'>Mutual Fund</span>
          </div>
          <Backbtn className="backbtn" label={
            <div>
              <ArrowBackIosIcon className='bckbtn' /> Back
            </div>
          } />
        </div>
        <Grid container spacing={2} className="width100">
          <div className="width50">
            <div className='width50'>{addtoCartPayload?.scriptName}</div>
          </div>
        </Grid>
        <Grid container spacing={2} >
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Item>
              <InvestNowTabs investDetails={addtoCartPayload} />
            </Item>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default InvestNow
