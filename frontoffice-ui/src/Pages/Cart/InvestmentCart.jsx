import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import Backbtn from "../../Common/FormComponent/Backbtn"
import CartTabs from './CartTabs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

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

const InvestmentCart = () => {
  const navigate = useNavigate("");
  const goBack = () => {
    navigate('/dashboard');
  };
  return (
    <>
      {/* <TopBar></TopBar> */}
      <div className='maincontent'>
        <div className='uppersear '>
          <div className='herar'>
            <span className='activetabs'>Home</span><span>-{'>'}</span><span className='activetabs'>Equity</span><span>-{'>'}</span><span className='inactivetabs'>Investment Cart</span>
            {/* <span className='activetabs'>Home -{'>'}</span><span className='activetabs'>Equity -{'>'}</span><span className='inactivetabs'>Investment Cart</span> */}
          </div>
          <Backbtn className="backbtn"
            onClick={goBack}
            label={
              <div>
                <ArrowBackIosIcon className='bckbtn' /> Back
              </div>
            }
          />
        </div>
        <Grid container spacing={2} className="width100">
          <div className="width50">
            {/* <div className='width50'>Motilal Oswal MidCap Fund Direct IDCW Reinvestment</div> */}
          </div>
        </Grid>
        <Grid container spacing={2} >
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Item>
              <CartTabs />
            </Item>
          </Grid>
        </Grid>
      </div>
    </>

  );
};

export default InvestmentCart
