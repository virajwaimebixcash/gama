import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
 
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
 
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AddchartIcon from '@mui/icons-material/Addchart';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export default function SimpleListMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const goToMututal = () => {
    // navigate('/mutualfund');
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' , float: 'right' }}>
        
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}><MoreIcon /></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={goToMututal} >
        <AccountBalanceIcon className='cellmenu'/> <span className='cellmenu'>Mutual Fund</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <SignalCellularAltIcon className='cellmenu'/><span className='cellmenu'> Pri IPO</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <AddchartIcon className='cellmenu'/> <span className='cellmenu'>Bond</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <HealthAndSafetyIcon className='cellmenu'/> <span className='cellmenu'>Insurance</span>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}