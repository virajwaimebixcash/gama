import React from 'react';
import Button from '@mui/material/Button';

function MyButton({ label, ...props }) {
    
  return (
    <Button {...props}
    
      variant="contained"
      sx={{
        backgroundColor: '#A35CFB',
        ':hover': {
          backgroundColor: '#6744f9',
        },
        color: 'white',
        padding: '10px 20px',
        borderRadius: '.5em',
        width:'100%',
        padding:'1em .5em;',
        marginBottom:'10px',
        textTransform:'none'
      }}
    >
      {label}
    </Button>
  );
}

export default MyButton;
