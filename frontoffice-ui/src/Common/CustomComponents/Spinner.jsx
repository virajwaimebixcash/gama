import React from 'react';
import { Box, Typography } from '@mui/material';

const Spinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Please wait.....
      </Typography>
      <Box
        sx={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          background: 'conic-gradient(#0000 10%, #1363DF)',
          mask: 'radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)',
          WebkitMask: 'radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)',
          animation: 'load-spin 0.8s infinite linear',
        }}
      />
    </Box>
  );
};

export default Spinner;
