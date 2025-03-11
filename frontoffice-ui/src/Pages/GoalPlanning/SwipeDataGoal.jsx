
import React, { useRef, useEffect } from 'react';
import { Box, useTheme, useMediaQuery, Grid2 } from '@mui/material';
import orangeplus from '../../images/orangeplus.png'
import scroll1 from '../../images/scroll1.png'

import Smallhoverbox1 from '../GoalPlanning/Smallhoverbox1'
import Smallhoverbox2 from '../GoalPlanning/Smallhoverbox2'
import Smallhoverbox3 from '../GoalPlanning/Smallhoverbox3'
import Smallhoverbox4 from '../GoalPlanning/Smallhoverbox4'
import Smallhoverbox5 from '../GoalPlanning/Smallhoverbox5'
import Smallhoverbox6 from '../GoalPlanning/Smallhoverbox6'
import Smallhoverbox6new from '../GoalPlanning/Smallhoverbox6new'

const SwipeDataGoal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const carouselRef = useRef(null);

  // Dynamic item width based on screen size
  const getItemWidth = () => {
    if (isMobile) return '30%'; // Only 1 item visible on mobile
    if (isTablet) return '32.5%'; // 3 items visible on tablets
    return '10.6%'; // 8 items visible on larger screens
  };



  // Custom hook to add non-passive event listener for scrolling
  useEffect(() => {
    const carousel = carouselRef.current;

    const handleWheel = (e) => {
      if (e.shiftKey) {
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
      }
    };

    carousel.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <Box className='newbxwid'
      ref={carouselRef}
      sx={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
     
        <Grid2 className='newbxwid'
         
          sx={{
            boxShadow: 2,
            minWidth: getItemWidth(),
            height: '85px',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
             marginRight: '7px',
            borderRadius: '10px',
            border:'1px solid #ddd',
            marginBottom:'10px'
          }}

          
        >
        <Smallhoverbox1></Smallhoverbox1>
        </Grid2>
        <Grid2 className='newbxwid'
         
          sx={{
            boxShadow: 2,
            minWidth: getItemWidth(),
            height: '85px',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
             marginRight: '7px',
            borderRadius: '10px',
            border:'1px solid #ddd',
            marginBottom:'10px'
          }}

          
        >
        <Smallhoverbox2></Smallhoverbox2>
        </Grid2>
        <Grid2 className='newbxwid'
         
          sx={{
            boxShadow: 2,
            minWidth: getItemWidth(),
            height: '85px',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
             marginRight: '7px',
            borderRadius: '10px',
            border:'1px solid #ddd',
            marginBottom:'10px'
          }}

          
        >
        <Smallhoverbox3></Smallhoverbox3>
        </Grid2>
        <Grid2 className='newbxwid'
         
          sx={{
            boxShadow: 2,
            minWidth: getItemWidth(),
            height: '85px',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
             marginRight: '7px',
            borderRadius: '10px',
            border:'1px solid #ddd',
            marginBottom:'10px'
          }}

          
        >
        <Smallhoverbox4></Smallhoverbox4>
        </Grid2>
        <Grid2 className='newbxwid'
         
          sx={{
            boxShadow: 2,
            minWidth: getItemWidth(),
            height: '85px',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
             marginRight: '7px',
            borderRadius: '10px',
            border:'1px solid #ddd',
            marginBottom:'10px'
          }}

          
        >
         <Smallhoverbox5></Smallhoverbox5>
        </Grid2>
        <Grid2 className='newbxwid'
         
          sx={{
            boxShadow: 2,
            minWidth: getItemWidth(),
            height: '85px',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
             marginRight: '7px',
            borderRadius: '10px',
            border:'1px solid #ddd',
            marginBottom:'10px'
          }}

          
        >
        <Smallhoverbox6></Smallhoverbox6>
        </Grid2>
        <Grid2 className='newbxwid'
         
          sx={{
            boxShadow: 2,
            minWidth: getItemWidth(),
            height: '85px',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
             marginRight: '7px',
            borderRadius: '10px',
            border:'1px solid #ddd',
            marginBottom:'10px'
          }}

          
        >
         <Smallhoverbox5></Smallhoverbox5>
        </Grid2>
        <Grid2 className='newbxwid'
         
          sx={{
            boxShadow: 2,
            minWidth: getItemWidth(),
            height: '85px',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
             marginRight: '7px',
            borderRadius: '10px',
            border:'1px solid #ddd',
            marginBottom:'10px'
          }}

          
        >
       <Smallhoverbox6new></Smallhoverbox6new>
        </Grid2>
        <Grid2 className='newbxwid'
         
          sx={{
            boxShadow: 2,
            minWidth: getItemWidth(),
            height: '85px',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
             marginRight: '7px',
            borderRadius: '10px',
            border:'1px solid #ddd',
            marginBottom:'10px'
          }}

          
        >
         <table className='fn600'>
                                    <tr>
                                      <td><img src={orangeplus} /><br/>
                                      <span className='wrptex'>Create Your Own <br/>Goal</span>
                                      </td>
                                    </tr>
                                    
                                  </table>
        </Grid2>
    
       

       
    </Box>




  );
};

export default SwipeDataGoal;