import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';

const LoaderWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '0.25rem',
  height: '100%',
  background: 'transparent',
}));

const Stage = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: '0.5rem 0',
  margin: '0 -5%',
  overflow: 'hidden',
}));

const DotPulse = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: '#0929f6',
  boxShadow: '9999px 0 0 -5px #0929f6',
  transition: 'box-shadow 0.3s ease-in-out',
}));

const Loader = () => {
  const [pulse1, setPulse1] = useState(false);
  const [pulse2, setPulse2] = useState(false);

  useEffect(() => {
    const interval1 = setInterval(() => setPulse1((prev) => !prev), 500);
    const interval2 = setInterval(() => setPulse2((prev) => !prev), 1000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <LoaderWrapper>
      <Stage>
        <Grid container spacing={2}>
          <Grid item>
            <DotPulse
              sx={{
                boxShadow: pulse1
                  ? '9999px 0 0 2px #0929f6'
                  : '9999px 0 0 -5px #0929f6',
              }}
            />
          </Grid>
          <Grid item>
            <DotPulse
              sx={{
                boxShadow: pulse2
                  ? '9999px 0 0 2px #0929f6'
                  : '9999px 0 0 -5px #0929f6',
              }}
            />
          </Grid>
        </Grid>
      </Stage>
    </LoaderWrapper>
  );
};

export default Loader;
