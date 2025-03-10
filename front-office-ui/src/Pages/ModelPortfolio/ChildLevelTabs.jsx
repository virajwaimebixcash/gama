import { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import L1Allocation from "./L1Allocation";
import { useFormContext } from "react-hook-form";
import L2Allocation from "./L2Allocation";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px", mt: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index) {
  return { id: `simple-tab-${index}`, "aria-controls": `simple-tabpanel-${index}` };
};

const getL2Component = (tab) => {
  switch (tab.productClass) {
    case "Fund":
      return <L2Allocation tab={tab} />;
    default:
      return <div>Coming Soon</div>;
  }
};

const ChildLevelTabs = ({ config }) => {
  const { setError, clearErrors, watch } = useFormContext();

  const [value, setValue] = useState(0);
  const tabInfo = config?.childModelConfig?.productClassConfig || [];
  const filteredTabs = tabInfo.filter((tab) => tab.productClass !== "Cash");

  const handleChange = (event, newValue) => setValue(newValue);

  const totalAllocation = filteredTabs.reduce((sum, tab) => {
    const tabAllocation = Number(watch(tab.productClass)?.l1Allocation?.allocationPer) || 0;
    return sum + Number(tabAllocation);
  }, 0);

  useEffect(() => {
    if (totalAllocation > 100) {
      setError("l1Allocation", { type: "manual", message: "Total allocation cannot exceed 100%." });
    } else {
      clearErrors("l1Allocation");
    }
  }, [totalAllocation, setError, clearErrors]);
  

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {filteredTabs.map((tab, index) => {
          const allocationPer = Number(watch(tab.productClass)?.l1Allocation?.allocationPer)|| 0;
          return (
            <Tab key={index} label={
              <div>
                <span>{tab.productClass}</span>
                {/* <small className='tabsspanbctxt orangetabsmall'>0%</small> */}
                <small className={`tabsspanbctxt orangetabsmall`}>
                  {allocationPer}%
                </small>
              </div>
            } {...a11yProps(index)} />
            // <Tab key={index} label={tab.productClass} {...a11yProps(index)} />
          )
        })}
      </Tabs>

      {filteredTabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          <L1Allocation tab={tab} />
          {getL2Component(tab)}
        </TabPanel>
      ))}
    </Box>
  );
};

export default ChildLevelTabs;