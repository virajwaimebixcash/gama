// No navigation button or gestures
import React, { useRef, useEffect } from 'react';
import { Box, useTheme, useMediaQuery, Grid2 } from '@mui/material';
import sidelogo1 from "../../../images/sidelogo1.png";
import riskprofile from "../../../images/riskprofile.png";
import risk from "../../../images/risk.png";
import nofund from "../../../images/nofund.png";
import peer from "../../../images/peer.png";
import { useSelector } from 'react-redux';


const SwipeView = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const carouselRef = useRef(null);
  const getWidgetData = useSelector((state) => state.getHoldingsReportConfiguredDetails?.data?.fieldsAtWidgetLevel);
  const getWidgetValues = useSelector((state) => state.getHoldingDetails.data.widgetLevel)


  // Manually bind each displayHeader
  const dataBindings = [
    { imgSrc: sidelogo1, displayHeader: getWidgetData?.[0]?.displayHeader || "N/A", value: getWidgetValues?.totalAUM.toLocaleString() },
    { imgSrc: riskprofile, displayHeader: getWidgetData?.[1]?.displayHeader || "N/A", value: getWidgetValues?.investCost.toLocaleString() },
    { imgSrc: risk, displayHeader: getWidgetData?.[2]?.displayHeader || "N/A", value: getWidgetValues?.absValueTotalInv.toLocaleString() },
    { imgSrc: nofund, displayHeader: getWidgetData?.[3]?.displayHeader || "N/A", value: getWidgetValues?.absValue.toLocaleString() },
    { imgSrc: peer, displayHeader: getWidgetData?.[4]?.displayHeader || "N/A", value: getWidgetValues?.noOfFund.toLocaleString() },
  ];


  // Dynamic item width based on screen size
  const getItemWidth = () => {
    if (isMobile) return '90%'; // Only 1 item visible on mobile
    if (isTablet) return '32.5%'; // 3 items visible on tablets
    return '19.5%'; // 8 items visible on larger screens
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
    <Box
      ref={carouselRef}
      sx={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {dataBindings.map((data, index) => (
        <Grid2
          key={index}
          sx={{
            boxShadow: 2,
            minWidth: getItemWidth(),
            height: '80px',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
            marginRight: '7px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            marginBottom: '10px',
          }}

          style={{ whiteSpace: 'pre-line' }}
        >
          <div className="fullw">
            <table className="fullw">
              <tr>
                <td className="width30box">
                  <img src={data.imgSrc} className="negleft" />
                </td>
                <td className="inbxleft">
                  <div className="foupx">{data.displayHeader}</div>
                  <div className="bldinner">{data.value}</div>
                </td>
              </tr>
            </table>
          </div>
        </Grid2>
      ))}
    </Box>
  );
};

export default SwipeView;