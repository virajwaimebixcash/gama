import React from 'react';
import Button from '@mui/material/Button';

function HeaderBtn({ label, ...props }) {
    
  return (
    <Button {...props}
    
      variant="contained"
      sx={{
        backgroundColor: '#fff',
        ':hover': {
          backgroundColor: '#fff',
        },
        color: '#000',
        padding: '5px 3px 5px 3px',
        margin: '10px 10px 0px 10px',
        borderRadius: '15px',
        width:'100px',
        marginBottom:'10px',
        textTransform:'none'
      }}
    >
      {label}
    </Button>
  );
}

export default HeaderBtn;
