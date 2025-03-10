import { useEffect, useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import greenyes from "../../../images/greenyes.png";
import currentvalue from "../../../images/currentvalue.svg";
import currentpl from "../../../images/currentpl.svg";
import invested from "../../../images/invested.svg";
import cash from "../../../images/cash.svg";
import SmallDropdown from '../DashboardWidgets/SmallDropdown';
import api from '../../../APIs/interceptor';
import { formatNumberSeperator, formatWithDecimals } from '../../../utils/commonFunction';

function PortInvestAssetAllocation({ AssetAllocationWidgetDetails }) {
  const [value, setValue] = useState(0); // To track the active tab
  const [selectedOption, setSelectedOption] = useState('TWRR');
  const [assetsWidgetData, setAssetsWidgetData] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Define static tab data
  const allTab = {
    assetAllocationWidgetTabId: 1,
    tabDispatcherName: "All",
    tabDisplayName: "All",
    returnMethodId: null,
    isHide: "N",
    tabSequence: 0
  };

  // Filter out hidden tabs and prepend the static 'All' tab
  const assetAllocationTab = [
    allTab,  // Static 'All' tab
    ...AssetAllocationWidgetDetails.assetAllocationTab.filter(tab => tab.isHide !== 'Y') || []
  ];
  const assetAllocationField = AssetAllocationWidgetDetails.assetAllocationField || [];
  const assetAllocationMethod = AssetAllocationWidgetDetails.assetAllocationReturnMethod || [];

  // Dynamically render content for each tab
  const renderTabContent = (tabData) => {
    const currentTabPercentage = tabData.tabDispatcherName === "All" ? 100 : (assetsWidgetData[tabData.tabDispatcherName] || 0);
    const displayValues = currentTabPercentage > 0;
    // const fundDropdownList = assetAllocationMethod.filter(item => item.returnMethodId === tabData.returnMethodId)
    return (
      <div>
        {(tabData.tabDispatcherName === "Funds") && (
          <>
            <SmallDropdown setSelectedOption={setSelectedOption} selectedOption={selectedOption} fundTab={assetAllocationMethod}></SmallDropdown>
            <div className="clear"></div>
          </>
        )}
        <div className="containernew">
          <div className="boxnewtop">
            <table>
              <tr>
                <td className='valignintable'>
                  <img src={currentvalue} />
                </td>
                <td>
                  <div className='graintabel'>
                    {assetAllocationField.find((item) => item.fieldDispatcherName === "fundMarketValue")?.fieldDisplayName}
                  </div>
                  <div className='blackintabel'>{displayValues ? formatNumberSeperator(assetsWidgetData.fundMarketValue) : 0}</div>
                  <div className='grayinsmall'>{assetAllocationField.find((item) => item.fieldDispatcherName === "fund1RvaluePer")?.fieldDisplayName} <span className={assetsWidgetData.fund1Rvalue > 0 ? "greenbckcss" : 'redcsslatest'}>{displayValues ? formatNumberSeperator(assetsWidgetData.fund1Rvalue) : 0}</span> <span className={assetsWidgetData.fund1RvaluePer > 0 ? "greenbckcss" : 'redcsslatest'}>{displayValues ? formatWithDecimals(assetsWidgetData.fund1RvaluePer) : 0}%</span></div>
                </td>
              </tr>
            </table>
          </div>

          <div className="boxnewtop">
            <table>
              <tr>
                <td className='valignintable'>
                  <img src={currentpl} />
                </td>
                <td>
                  <div className='graintabel'>{assetAllocationField.find((item) => item.fieldDispatcherName === "fundGainLossValue")?.fieldDisplayName}</div>
                  <div className='blackintabel grrendark'>{displayValues ? formatNumberSeperator(assetsWidgetData.fundGainLossValue) : 0}</div>
                  <div className='left'><span className={assetsWidgetData[`fund${selectedOption === 'absoluteValue' ? 'AbsReturnPer' : selectedOption}`] > 0 ? "greenbckcss" : 'redcsslatest'}>{displayValues ? formatWithDecimals(assetsWidgetData[`fund${selectedOption === 'absoluteValue' ? 'AbsReturnPer' : selectedOption}`]) : 0}%</span><span> <img src={greenyes} /></span></div>
                </td>
              </tr>
            </table>
          </div>

          <div className="boxnew">
            <table>
              <tr>
                <td className='valignintable'>
                  <img src={invested} />
                </td>
                <td>
                  <div className='graintabel'>{assetAllocationField.find((item) => item.fieldDispatcherName === "fundAmountInvested")?.fieldDisplayName}</div>
                  <div className='blackintabel'>{displayValues ? formatNumberSeperator(assetsWidgetData.fundAmountInvested) : 0}</div>
                </td>
              </tr>
            </table>
          </div>
          {tabData.tabDispatcherName === "All" && <div className="boxnew">
            <table>
              <tr>
                <td className='valignintable'>
                  <img src={cash} />
                </td>
                <td>
                  <div className='graintabel'>{assetAllocationField.find((item) => item.fieldDispatcherName === "cash")?.fieldDisplayName}</div>
                  <div className='blackintabel'>{formatNumberSeperator(assetsWidgetData.fundGainLossValue)}</div>
                </td>
              </tr>
            </table>
          </div>}
        </div>
      </div>
    )
  }

  useEffect(() => {
    api.post('/dashboard/getAssetAllocation', {
      "userId": 2,
      "clientCode": 35
    }).then((res) => {
      setAssetsWidgetData(res.data.data);
    }).catch((err) => {
      console.log(err, "err");
    })
  }, [])

  return (
    <Box sx={{ width: '100%' }} className='texttranssmal fortxtpadding'>
      <Tabs value={value} onChange={handleChange} aria-label="tabs example">
        {assetAllocationTab.map((tab, index) => (
          <Tab key={index} label={
            <div>
              <span>{tab.tabDisplayName}</span>
              <small className='tabsspanbc orangetabsmallgray changewids'>
                {tab.tabDispatcherName === "All" ? "100%" : `${assetsWidgetData[tab.tabDispatcherName] || 0}%`}
              </small>
            </div>
          } />
        ))}
      </Tabs>
      <Box sx={{ p: 3 }}>
        {assetAllocationTab.length > 0 && renderTabContent(assetAllocationTab[value])}
      </Box>
    </Box>
  );
}

export default PortInvestAssetAllocation;
