import { useState } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PrimaryDetails from './PrimaryDetails';
import CreateDynamic from '../../UdfRenderer/CreateDynamic';

function SubscriptionView({ fixedFormConfig, udfConfig, tableData, setTableData, folioList, tab }) {

  const [openDiv, setOpenDiv] = useState(null);

  const handleToggle12 = (divId) => {
    setOpenDiv((prevDivId) => (prevDivId === divId ? null : divId));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box className="maincontent">
        <h3>Primary Details</h3>
        <PrimaryDetails tab={tab} fixedFormConfig={fixedFormConfig} folioList={folioList} />
        <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12, }} >
          <span className='pdb20 pdb201' onClick={() => handleToggle12(2)}>
            <span className='subtitle ' >Other Details</span>
            <span className='buttonplus' > {openDiv === 2 ? "-" : "+"}</span>
          </span>
          {openDiv === 2 && <div>
            {/* <OtherInformation></OtherInformation> */}
            <CreateDynamic tableData={tableData}
              setTableData={setTableData} udfConfig={udfConfig} />
          </div>}
        </Grid>
      </Box>
    </Box>
  );
}

export default SubscriptionView;
