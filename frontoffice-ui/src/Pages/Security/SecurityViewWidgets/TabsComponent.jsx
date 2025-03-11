import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography, Grid, Tooltip } from '@mui/material';
import exlamatiom from "../../../images/excla.png";
import stars from "../../../images/samplestar.png";

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
}

const FundInfoTabsComponent = ({ fundInfoData, fundValue }) => {
  const [fundManagerData, setFundmangerData] = useState([])
  const [fundInfornationData, setfundInfornationData] = useState([])
  const [fundGrouping, setfundGrouping] = useState([])

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const groups = fundInfoData?.widgetDetail?.reduce((acc, item) => {
      // Initialize arrays for each group if not already present
      if (!acc[item.groupName]) {
        acc[item.groupName] = [];
      }
      // Push the item into the respective group array
      acc[item.groupName].push(item);
      return acc;
    }, {});
    if (groups) {
      const fundInformationArray = groups['FundInformation'] || [];
      const fundManagerArray = groups['FundManger'] || [];
      setFundmangerData(fundManagerArray)
      setfundInfornationData(fundInformationArray)
      setfundGrouping(groups)
    }
  }, [fundInfoData])

  return (
    <Box sx={{ width: '100%', marginLeft: '0px', overflowX: 'hidden' }}>
      <Tabs sx={{
        '& .MuiTabs-scroller': {
          overflow: 'auto',
          scrollbarWidth: 'none', // For Firefox
        },
        // '& .MuiTabs-scroller::-webkit-scrollbar': {
        //   display: 'none', // For Chrome, Safari, and Edge
        // },
      }} value={value} onChange={handleChange} aria-label="basic tabs example">

        {Object.keys(fundGrouping).map((key, index) => <Tab key={index} label={fundGrouping[key][0].groupDisplayName} {...a11yProps(index)} />)}
        {/* <Tab label="Fund Manager" {...a11yProps(1)} /> */}

      </Tabs>
      {Object.keys(fundGrouping).map((keys, index) => <TabPanel key={keys} value={value} index={index} className="simpaddingtabs">
        <Grid container spacing={2}>
          {fundGrouping[keys].map((item, index) => (
            <Grid item xs={12} md={6} key={item.fundWidgetConfigId} className='gapsfortablesspace'>
              <div className='centableleftside borsfottable'>
                <table className='fullw '>
                  <tr className=''>
                    <td>
                      {item?.fieldDisplayName}
                      <Tooltip title={item.description}>
                        <img src={exlamatiom} alt="icon" />
                      </Tooltip>
                      <br />
                      <span className='highlight'>
                        {fundValue && item.dispatcherName ? fundValue[item.dispatcherName] : "--"}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>)}
      {/* <TabPanel value={value} index={0} className="simpadding">
          {fundInfornationData.map((item)=>(
            
         <div >
            <div className='headerstableft'>
              <div className='mainheadcss'>{item?.fieldDisplayName}<img src={exlamatiom} />
              </div>
              <div className='subheadcss'>
                <span className='highlight'>₹ 56.57</span><span className='redcss'>-3.60</span><span>(5 August)</span>
              </div>

            </div>
            </div>
            
         ))}   
</TabPanel> */}
      {/* <TabPanel value={value} index={1} className="simpadding">
        {fundManagerData.map((item, index) => (
          <div key={index}>
            <div >
              <div className='headerstableft'>
                <div className='mainheadcss'>{item?.fieldDisplayName}<img src={exlamatiom} />
                </div>
                <div className='subheadcss'>
                  <span className='highlight'>{fundValue?.[item?.dispatcherName] || "Data not found"}</span>
                </div>

              </div>
            </div>
          </div>
        ))}
      </TabPanel> */}

      {/* <TabPanel value={value} index={3} className="simpadding">
        <div>
          <div className='tabbors'>
            <div className='headerstableft'>
              <div className='mainheadcss'>Nav<img src={exlamatiom} />
              </div>
              <div className='subheadcss'>
                <span className='highlight'>₹ 56.57</span><span className='redcss'>-3.60</span><span>(5 August)</span>
              </div>
            </div>
            <div className='headerstabright'>
              <div className='mainheadcss'>Rating</div>
              <div className='subheadcss'>
                <div className='starswid'>
                  <div className="star-rating">
                    <input type="radio" id="5-stars" name="rating" value="5" />
                    <label htmlFor="5-stars" className="star">&#9733;</label>
                    <input type="radio" id="4-stars" name="rating" value="4" />
                    <label htmlFor="4-stars" className="star">&#9733;</label>
                    <input type="radio" id="3-stars" name="rating" value="3" />
                    <label htmlFor="3-stars" className="star">&#9733;</label>
                    <input type="radio" id="2-stars" name="rating" value="2" />
                    <label htmlFor="2-stars" className="star">&#9733;</label>
                    <input type="radio" id="1-star" name="rating" value="1" />
                    <label htmlFor="1-star" className="star">&#9733;</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='tabbors'>
            <div className='headerstableft'>
              <div className='mainheadcss'>AUM<img src={exlamatiom} />
              </div>
              <div className='subheadcss'>
                <span className='highlight'>619 Cr</span>
              </div>
            </div>
            <div className='headerstabright'>
              <div className='mainheadcss'>TER<img src={exlamatiom} /></div>
              <div className='subheadcss'>
                <span className='highlight1'>1.45%</span>
              </div>
            </div>
          </div>
          <div className='tabbors'>
            <div className='headerstableft'>
              <div className='mainheadcss'>Expense Ratio
              </div>
              <div className='subheadcss'>
                <span className='highlight1'>Benchmark</span>
              </div>
            </div>
            <div className='headerstabright'>
              <div className='mainheadcss'>0.18%</div>
              <div className='subheadcss'>
                <span className='highlight1'>Nifty 50</span>
              </div>
            </div>
          </div>
          <div className='tabbors'>
            <div className='headerstableft'>
              <div className='mainheadcss'>Entry Load<img src={exlamatiom} />
              </div>
              <div className='subheadcss highlight1'>0.25%

              </div>
            </div>
            <div className='headerstabright'>
              <div className='mainheadcss'>Exit Load<img src={exlamatiom} /></div>
              <div className='subheadcss highlight1'>
                1.25%
              </div>
            </div>
          </div>
          <div className='tabbors'>
            <div className='headerstableft'>
              <div className='mainheadcss'>Min Investment
              </div>
              <div className='subheadcss'>
                <span>SIP</span><span className='highlight1 onlylepa'>₹ 1000 &</span><span>Lumpsum</span><span className='highlight1 onlylepa'>₹ 5000</span>
              </div>
            </div>
            <div className='headerstabright'>
              <div className='mainheadcss'>Inception Date</div>
              <div className='subheadcss'>
                <span className='highlight1'>10-Jan-2010</span>
              </div>
            </div>
          </div>
        </div>
      </TabPanel> */}
      {/* <TabPanel value={value} index={1} className="simpadding">
        <div>
          <div className='tabbors'>
            <div className='headerstableft'>
              <div className='mainheadcss'>Nav<img src={exlamatiom} />
              </div>
              <div className='subheadcss'>
                <span className='highlight'>₹ 56.57</span><span className='redcss'>-3.60</span><span>(5 August)</span>
              </div>
            </div>
            <div className='headerstabright'>
              <div className='mainheadcss'>Rating</div>
              <div className='subheadcss'>
                <div className='starswid'>
                  <div class="star-rating">
                    <input type="radio" id="5-stars" name="rating" value="5" />
                    <label for="5-stars" class="star">&#9733;</label>
                    <input type="radio" id="4-stars" name="rating" value="4" />
                    <label for="4-stars" class="star">&#9733;</label>
                    <input type="radio" id="3-stars" name="rating" value="3" />
                    <label for="3-stars" class="star">&#9733;</label>
                    <input type="radio" id="2-stars" name="rating" value="2" />
                    <label for="2-stars" class="star">&#9733;</label>
                    <input type="radio" id="1-star" name="rating" value="1" />
                    <label for="1-star" class="star">&#9733;</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='tabbors'>
            <div className='headerstableft'>
              <div className='mainheadcss'>AUM<img src={exlamatiom} />
              </div>
              <div className='subheadcss'>
                <span className='highlight'>619 Cr</span>
              </div>
            </div>
            <div className='headerstabright'>
              <div className='mainheadcss'>TER<img src={exlamatiom} /></div>
              <div className='subheadcss'>
                <span className='highlight1'>1.45%</span>
              </div>
            </div>
          </div>
          <div className='tabbors'>
            <div className='headerstableft'>
              <div className='mainheadcss'>Expense Ratio
              </div>
              <div className='subheadcss'>
                <span className='highlight1'>Benchmark</span>
              </div>
            </div>
            <div className='headerstabright'>
              <div className='mainheadcss'>0.18%</div>
              <div className='subheadcss'>
                <span className='highlight1'>Nifty 50</span>
              </div>
            </div>
          </div>
          <div className='tabbors'>
            <div className='headerstableft'>
              <div className='mainheadcss'>Entry Load<img src={exlamatiom} />
              </div>
              <div className='subheadcss highlight1'>0.25%

              </div>
            </div>
            <div className='headerstabright'>
              <div className='mainheadcss'>Exit Load<img src={exlamatiom} /></div>
              <div className='subheadcss highlight1'>
                1.25%
              </div>
            </div>
          </div>
          <div className='tabbors'>
            <div className='headerstableft'>
              <div className='mainheadcss'>Min Investment
              </div>
              <div className='subheadcss'>
                <span>SIP</span><span className='highlight1 onlylepa'>₹ 1000 &</span><span>Lumpsum</span><span className='highlight1 onlylepa'>₹ 5000</span>
              </div>
            </div>
            <div className='headerstabright'>
              <div className='mainheadcss'>Inception Date</div>
              <div className='subheadcss'>
                <span className='highlight1'>10-Jan-2010</span>
              </div>
            </div>
          </div>
        </div>
      </TabPanel> */}
    </Box>
  );
};

export default FundInfoTabsComponent;
