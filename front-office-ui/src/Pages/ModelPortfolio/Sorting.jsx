import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

function Sorting() {
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', or 'desc'

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => {
      if (prevSortOrder === 'asc') return 'desc';
      if (prevSortOrder === 'desc') return null;
      return 'asc';
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
    
      <IconButton onClick={toggleSortOrder} size="small">
        {sortOrder === 'asc' && <KeyboardArrowUp />}
        {sortOrder === 'desc' && <KeyboardArrowDown />}
        {sortOrder === null && (
          <KeyboardArrowDown style={{ opacity: 0.5 }} />
        )}
      </IconButton>
    </div>
  );
}

export default Sorting;
