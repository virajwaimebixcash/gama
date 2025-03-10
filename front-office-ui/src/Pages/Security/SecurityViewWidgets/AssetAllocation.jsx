import { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import DoughnutChart from '../../../Common/Charts/DoughnutChart';
import risk from "../../../images/risk.png";

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
                <Box sx={{ p: 4 }}>
                    <Typography component="div">{children}</Typography>
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
}

const AssetAllocation = ({ fundInfoData, fundValue }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const today = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-IN', options);

    const widgetDetails = fundInfoData?.widgetDetail || [];
    

    // const level = widgetDetails[0]?.level === 1 && widgetDetails[0]?.isLevelEnable !== 'Y' ? 1 : 2;
    const level = widgetDetails[0]?.level === 1 && widgetDetails[0]?.isLevelEnable === 'Y' ? 1 : 2;

    const level1Config = widgetDetails.filter(
        (detail) => detail.level === 1
    );

    const groupedData = widgetDetails.filter((detail) => detail.level === 2)
        .reduce((acc, current) => {
            const { category, dispatcherNameForCategory, ...rest } = current;

            if (!acc[category]) {
                acc[category] = {
                    category,
                    dispatcherNameForCategory,
                    subCategories: []
                };
            }
            acc[category].subCategories.push(rest);

            return acc;
        }, {});

    const level2Config = Object.values(groupedData);

    const tabsData = level2Config.map((detail) => ({
        ...detail,
        percentage: fundValue?.[detail?.dispatcherNameForCategory] || "0",
    }));
    
    return (
        <>
            <div className='fullsize logospac'>
                <div className='negatops'>
                    <div className="divwithoutsec">
                        <div className="texleft">
                            <img src={risk} alt="Risk Icon" />
                        </div>
                    </div>
                    <div className="width60">
                        <div className="padds12">
                            <div className="texleft">
                                <span className="padmeleftheader">{fundInfoData?.widgetDisplayName}</span>
                                <span className='subfont12'> - As On {formattedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Box sx={{ width: '100%' }}>
                {level === 2 && (
                    <Tabs value={value} onChange={handleChange} aria-label="fund allocation tabs">
                        {tabsData.map((tab, index) => (
                            <Tab className='spacepaddingfortabs'
                                key={index}
                                label={
                                    <div>
                                        <strong>{tab.category}</strong>
                                        <small className={`tabsspanbc ${index === value ? 'orangetabsmall' : 'graytabsmall'}`}>
                                            {tab.percentage}%
                                        </small>
                                    </div>
                                }
                                {...a11yProps(index)}
                            />
                        ))}
                    </Tabs>
                )}
                {
                    level === 1 ? (
                        <div style={{ width: '100%', height: '200px', paddingTop: '30px' }}>
                            <DoughnutChart data={level1Config} fundValue={fundValue} />
                        </div>
                    ) 
                    : (
                        tabsData.map((tab, index) => (
                            <TabPanel key={index} value={value} index={index}>
                                <div style={{ width: '100%', height: '200px' }}>
                                    <DoughnutChart data={tab} fundValue={fundValue} />
                                </div>
                            </TabPanel>
                        ))
                    )
                }
            </Box>
        </>
    );
};

export default AssetAllocation;
