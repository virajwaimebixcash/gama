import { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import "react-sweet-progress/lib/style.css";
import HorizontalChart from '../../../Common/Charts/HorizontalChart';
import DatasChart from '../../../Common/Charts/DatasChart'

import nofund from "../../../images/nofund.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const groupByCategory = (details) => {
  return details.reduce((result, item) => {
    const { tabName } = item;
    if (!result[tabName]) result[tabName] = [];
    result[tabName].push(item);
    return result;
  }, {});
};

const SecondTab = ({ fundInfoData, fundValue }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const widgetDetails = fundInfoData?.widgetDetail || [];
  const groupedConfig = groupByCategory(widgetDetails);

  return (
    <>
      <div className='fullsize logospac'>
        <div className='negatops'>
          <div className="divwithoutsec">
            <div className="texleft">
              <img src={nofund} />
            </div>
          </div>
          <div className="width60">
            <div className="padds12">
              <div className="texleft">
                <span className="padmeleftheader">{fundInfoData?.widgetDisplayName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Sector Holding" {...a11yProps(0)} />
          <Tab label="Top Holding" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0} className="pad16p">
          <HorizontalChart fundInfoData={groupedConfig?.SectorHolding} fundValue={fundValue?.SectorAllocationResponseCollection} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <HorizontalChart fundInfoData={groupedConfig?.TopHolding} fundValue={fundValue?.StockAllocationResponseCollection} />
        </TabPanel>
      </Box> */}

      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Sector Holding" {...a11yProps(0)} />
          <Tab label="Top Holding" {...a11yProps(1)} />

        </Tabs>

        <TabPanel value={value} index={0} className="pad16p">
          <HorizontalChart fundInfoData={groupedConfig?.SectorHolding} fundValue={fundValue?.SectorAllocationResponseCollection} />


        </TabPanel>
        <TabPanel value={value} index={1}>
          <DatasChart fundInfoData={groupedConfig?.TopHolding} fundValue={fundValue?.StockAllocationResponseCollection} />

        </TabPanel>

      </Box>
    </>
  );
};

export default SecondTab;