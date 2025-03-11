import React from 'react';
import Button from '@mui/material/Button';

function Backbtn({ label, ...props }) {
    
  return (
    <Button {...props}
    
      variant="contained"
      sx={{
        backgroundColor: '#D7CAFD',
        ':hover': {
          backgroundColor: '#D7CAFD',
        },
        color: '#000',
        padding: '5px 3px 5px 3px',
        margin: '10px 10px 0px 10px',
        borderRadius: '15px',
        width:'100px',
        marginBottom:'10px',
        textTransform:'none',
        float: 'right'
      }}
    >
      {label}
    </Button>
  );
}

export default Backbtn;
