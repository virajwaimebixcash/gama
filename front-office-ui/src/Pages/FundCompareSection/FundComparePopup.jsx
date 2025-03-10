import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
// import SearchAutocomplete from '../../Common/CustomComponents/Autocomplete';
import SearchAutocomplete from '../Security/SearchAutocomplete';
import { useLocation } from 'react-router-dom';
import styles from "../../styles/FundCompare.module.css"

const FundComparePopup = ({setOpen,open}) => {
  // const [open, setOpen] = useState(false);
  const upcomingOffers = useLocation().state
  const [isLoading, setIsLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" className={styles.fundcombtnadd} onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={styles.searchheadpop}>Security</DialogTitle>
        <DialogContent>
        <div className={styles.minswhitefunds}>
        <div className={[styles.searchbxcenter1, styles.centersearchbx].join(' ')} >
        <SearchAutocomplete SchemeName={upcomingOffers?.SchemeName} SchemeCode={upcomingOffers?.SchemeCode} isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
       </div>
        </DialogContent>
        <DialogActions>
         <div className={[styles.fullw, styles.texcenterimp].join(' ')} >
          <Button onClick={handleClose} className={[styles.fundcombtn, styles.whicolor].join(' ')} >Close</Button></div> 
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FundComparePopup;
