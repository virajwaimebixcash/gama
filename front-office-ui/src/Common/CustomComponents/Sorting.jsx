import { IconButton, Box } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

function Sorting({ column, isActive, currentOrder, onSort }) {
  const toggleSortOrder = () => {
    let newOrder = null;
    if (!isActive) {      
      newOrder = 'asc'; 
    } else if (currentOrder === 'asc') {      
      newOrder = 'desc';
    } else if (currentOrder === 'desc') {      
      newOrder = null; 
    }

    onSort(newOrder); 
  };

  return (
    <Box
      onClick={toggleSortOrder}
      sx={{
        cursor: column.isSortingEnable === 'Y' ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '24px',
        paddingRight: '8px',
      }}
    >
      {column.displayHeader}
      <IconButton
        size="small"
        disableRipple
        sx={{
          visibility: isActive ? 'visible' : 'hidden', // Show arrow only if active
          width: '24px',
          height: '24px',
        }}
      >
        {currentOrder === 'asc' && <KeyboardArrowUp />}
        {currentOrder === 'desc' && <KeyboardArrowDown />}
      </IconButton>
    </Box>
  );
}

export default Sorting;
