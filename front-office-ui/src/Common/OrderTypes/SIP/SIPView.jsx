import { useState } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PrimaryDetailsSIP from './PrimaryDetailsSIP';
import CreateDynamic from '../../UdfRenderer/CreateDynamic';

function SIPView({ fixedFormConfig, udfConfig, tableData, setTableData, folioList, tab }) {
  // State to track which div is open
  const [openDiv, setOpenDiv] = useState(null);

  // Function to handle toggle (open/close one div)
  const handleToggle12 = (divId) => {
    // If the clicked div is already open, close it by setting `openDiv` to null.
    // Otherwise, open the clicked div by setting `openDiv` to its ID.
    setOpenDiv((prevDivId) => (prevDivId === divId ? null : divId));
  };  

  return (
    <Box sx={{ width: '100%' }}>
      <Box className="maincontent">
        <h3>Primary Details</h3>
        {/* <PrimaryDetailsSIP fixedFormConfig={fixedFormConfig} /> */}
      <PrimaryDetailsSIP  tab={tab} fixedFormConfig={fixedFormConfig} folioList={folioList} />
        {/* <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12, }} >
          <span className='pdb20 pdb201' onClick={() => handleToggle12(1)}>
            <span className='subtitle ' >Nominee Details </span>
            <span className='buttonplus' > {openDiv === 1 ? "-" : "+"}</span>
          </span>
          {openDiv === 1 && <div>
            <NomineeDetailsAdd></NomineeDetailsAdd>
          </div>}
        </Grid> */}
        <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12, }} >
          <span className='pdb20 pdb201' onClick={() => handleToggle12(2)}>
            <span className='subtitle'>Other Details</span>
            <span className='buttonplus'> {openDiv === 2 ? "-" : "+"}</span>
          </span>
          {openDiv === 2 && <div>
            {/* <OtherInformation /> */}
            <CreateDynamic tableData={tableData}
              setTableData={setTableData} udfConfig={udfConfig} />
          </div>}
        </Grid>
      </Box>
    </Box>
  );
}

export default SIPView;
