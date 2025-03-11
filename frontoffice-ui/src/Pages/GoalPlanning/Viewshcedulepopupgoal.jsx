import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import ViewScheduleGoal from './ViewScheduleGoalpop'
const Viewshcedulepopup = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} className='viewschebuttoncss'>
        View Schedule +
      </Button>

      {/* Large Popup Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle className="schpohead">Schedules</DialogTitle>
        <DialogContent>
         <ViewScheduleGoal></ViewScheduleGoal>
        </DialogContent>
        <DialogActions className="sidegaps">
          <Button onClick={handleClose} color="primary" className="clsolemebtns">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Viewshcedulepopup;
