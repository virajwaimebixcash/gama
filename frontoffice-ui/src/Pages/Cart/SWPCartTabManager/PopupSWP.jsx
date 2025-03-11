import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import PersonalDetails from './PersonalDetails';
// import SWPOtherInformationDetails from './SWPOtherInformationDetails';
import SWPIconRadioButtons from './SWPIconRadioButtons';

const PopupSWP = ({ swpManagerActionData }) => {
  const [anchorEl, setAnchorEl] = useState(null); // For menu
  const [openPopup, setOpenPopup] = useState(0); // Tracks which popup is open
  const [otp, setOtp] = useState(''); // OTP input value
  const [timer, setTimer] = useState(30); // Timer for OTP resend
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openMenu = Boolean(anchorEl);

  // Timer countdown logic
  useEffect(() => {
    if (openPopup === 2 && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer, openPopup]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNext = () => {
    if (openPopup === 1) {
      setTimer(30); // Reset timer for OTP popup
    }
    setOpenPopup((prev) => prev + 1);
  };

  const handleResendOTP = () => {
    setTimer(30); // Reset timer for resend
    alert('OTP Resent!');
  };

  const handleCloseAll = () => {
    setOpenPopup(0);
    setAnchorEl(null);
    setTimer(0); // Stop timer when all popups close
  };

  // Fetch and sort actions
  const sortedActions = swpManagerActionData
    ?.filter((action) => action.actionEnable === "Y") // Include only enabled actions
    ?.sort((a, b) => a.actionSequence - b.actionSequence); // Sort by actionSequence

  return (
    <div>
      {/* Three Dots Menu */}
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
        {sortedActions?.map((action) => (
          <MenuItem
            key={action.swpActionId}
            className="backcc"
            onClick={() => {
              handleMenuClose();
              setOpenPopup(1);
            }}
          >
            {action.actionDisplayName}
          </MenuItem>
        ))}
      </Menu>
      {/* <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
      >
        <MenuItem className='backcc roundscortop'  onClick={handleOpen}>
        Modify SWP
        </MenuItem>
       
        <MenuItem className='backcc' onClick={() => { handleMenuClose(); setOpenPopup(1); }}>
         Skip SWP
        </MenuItem>
        <MenuItem className='backcc' onClick={() => { handleMenuClose(); setOpenPopup(1); }}>
         Pause SWP
        </MenuItem>
        <MenuItem className='backcc roundscorbot' onClick={() => { handleMenuClose(); setOpenPopup(1); }}>
         Stop SWP
        </MenuItem>
      </Menu> */}

      {/* First Popup */}
      <Dialog open={openPopup === 1} onClose={handleCloseAll}>
        <div className='modelpopup paddingpanl'>
          {/* <DialogTitle><ErrorOutlineIcon />Are you sure you want to modify SWP?</DialogTitle>  */}
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', }}>
            <ErrorOutlineIcon sx={{ color: 'orange', marginRight: '8px' }} />
            <span className='textmodi'> Are you sure you want to Skip SWP?</span>
          </Typography>
          <DialogActions sx={{
            justifyContent: 'center', // Center align buttons
          }}>
            <Button onClick={handleCloseAll} className='closepopup' color="primary">
              No
            </Button>
            <Button variant="contained" color="primary" className=' mr10 closepopup' onClick={handleNext}>
              Yes
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog open={openPopup === 2} onClose={handleCloseAll} >
        <div className='modelpopup paddingpanl'>
          <DialogTitle className='center'>Select Option</DialogTitle>
          <DialogContent sx={{
            padding: '0px', textAlign: "center"
          }}>
            <SWPIconRadioButtons></SWPIconRadioButtons>
          </DialogContent>
          <DialogActions sx={{
            justifyContent: 'center', // Center align buttons
          }}>
            <Button onClick={handleCloseAll} className='closepopup' color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" className=' mr10 closepopup' onClick={handleNext}>
              Submit
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* OTP Popup */}
      <Dialog open={openPopup === 3} onClose={handleCloseAll} >
        <div className='modelpopup paddingpanl' style={{ width: '300px' }}>
          <DialogTitle className='center'>Enter OTP</DialogTitle>
          <DialogContent sx={{

            padding: '0px', textAlign: "center"
          }}>
            <TextField
              value={otp}
              onChange={handleChange}
              variant="outlined"
              placeholder="• • • •"
              inputProps={{ maxLength: 4, style: { textAlign: 'center', letterSpacing: '10px' } }}
              sx={{ mb: 2, width: '100%' }}
            />
            <Typography variant="body2" color="textSecondary" className='center'>
              Resend OTP in {timer} seconds
            </Typography>
            <Button className='center'
              disabled={timer > 0}
              onClick={handleResendOTP}
              color="primary"
            >
              Resend OTP
            </Button>
          </DialogContent>
          <DialogActions sx={{
            justifyContent: 'center', // Center align buttons
          }}>
            <Button onClick={handleCloseAll} color="primary" className='className closepopup'>
              Close
            </Button>
            <Button variant="contained" color="primary" className=' mr10 closepopup'
              onClick={handleNext}

              disabled={!otp} // Disable until OTP is entered
            >
              Submit
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* Final Popup */}
      <Dialog open={openPopup === 4} onClose={handleCloseAll}>
        <div className='modelpopup paddingpanl' style={{ width: '300px' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', }}>
            <CheckCircleOutlineIcon sx={{ color: 'green', marginRight: '8px' }} />
            <span className='textmodi greentxt'> Request successfully processed</span>
          </Typography>
          <DialogActions sx={{
            justifyContent: 'center', // Center align buttons
          }}>
            <Button onClick={handleCloseAll} variant="contained" color="primary" className='closepopup' >
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <h2 className="headingtop pl23">Modify SWP</h2>
        <DialogContent>
          {/* <SWPOtherInformationDetails></SWPOtherInformationDetails> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopupSWP;
