import React from 'react';
import Slider from 'react-slick';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import leftimginslide from '../../images/leftimginslide.png';
function CustomArrow({ onClick, direction }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [direction === 'left' ? 'left' : 'right']: '-50px', // Place arrows outside
        zIndex: 1,
      }}
    >
      {direction === 'left' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
    </IconButton>
  );
}

function Carosole1() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 10,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  };

  return (
    <Box sx={{ width: '90%', margin: 'auto', mt: 0, position: 'relative' }}>
      <Slider {...settings}>
        <Box
          sx={{
            height: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
           <div className='innboxinslide'>
                   <div>
                    <div className='imginsliders'><img src= {leftimginslide} /></div>
                    <div className='txtinslider'><div>SIP Calculator</div></div>
                   </div> 
                    </div>
        </Box>
        <Box
          sx={{
            height: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className='innboxinslide'>
                     <div>
                    <div className='imginsliders'><img src= {leftimginslide} /></div>
                    <div className='txtinslider'><div>SIP Lumpsum Calculator</div></div>
                   </div>   
                    </div>
        </Box>
        <Box
          sx={{
            height: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className='innboxinslide'>
                   <div>
                    <div className='imginsliders'><img src= {leftimginslide} /></div>
                    <div className='txtinslider'><div>Step Up SIP Calculator</div></div>
                   </div>      
                    </div>
        </Box>
      </Slider>
    </Box>
  );
}

export default Carosole1;
