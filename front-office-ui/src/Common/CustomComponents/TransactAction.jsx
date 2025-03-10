import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {
  Select,
} from "@mui/material";

export default function TransactAction({ row, handleClickOpen, setAlertOpen }) {

  const [selectValue, setSelectValue] = useState("");

  const handleSelectChange = (e) => {
    if (row?.switchOutAllowed === null) {
      handleClickOpen(e.target.value);
      setSelectValue(e.target.value);
      // Reset the dropdown back to "Transact" after modal closes
      setTimeout(() => {
        setSelectValue("");
      }, 1000); // Small delay to ensure smooth reset
      return
    }
    setAlertOpen({ show: true, msg: 'Fund Switch Not allowed', type: 'error' });
    setSelectValue("");
    // return
  };

  return (
    <Box sx={{ Width: 60 }}>
      <FormControl fullWidth>
        <Select value={selectValue} onChange={handleSelectChange} size="small" className='transactdrp'
          displayEmpty
          renderValue={(selected) => {
            if (selected === "") {
              return <span >Transact</span>;
            }
            return selected;
          }}
        >
          <MenuItem value="" disabled className="transtabbg">
            Transact
          </MenuItem>
          <MenuItem value="Subscription" className='transtabbg'>Subscription</MenuItem>
          <MenuItem value="SIP" className='transtabbg'>SIP</MenuItem>
          <MenuItem value="Redemption" className='transtabbg'>Redemption</MenuItem>
          <MenuItem value="SWP" className='transtabbg'>SWP</MenuItem>
          <MenuItem value="Fund Switch" className='transtabbg'>Fund Switch</MenuItem>
          <MenuItem value="STP" className='transtabbg'>STP</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}