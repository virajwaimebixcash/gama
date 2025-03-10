import { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import flogo from "../../../images/flogo.png";
import PerformerPopup from './PerformerPopup'
import {formatWithDecimals, formatNumberSeperator} from '../../../utils/commonFunction';


const DashBordTopBottom = ({ PortfolioPerformersWidgetDetails, PortfolioPerformersTopData, PortfolioPerformersBottomData }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const portfolioPerformersTab = PortfolioPerformersWidgetDetails.portfolioPerformersTab.filter(tab => tab.isHide !== 'Y') || [];
  const portfolioPerformersField = PortfolioPerformersWidgetDetails.portfolioPerformersField || [];

  // Dynamically render content for each tab
  const renderTabContent = (tabData) => {
    const renderData = tabData.portfolioPerfWidgetTabId === 1 ? PortfolioPerformersTopData : tabData.portfolioPerfWidgetTabId === 2 ? PortfolioPerformersBottomData : [];
    
    return (
      <div>
        <div className='tabheadersintabs'>
          <table className='fullw'>
            {renderData?.slice(0, 3).map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td><img src={flogo} /></td>
                  <td colSpan="2" className='texleft fontsize12 allblack'>{item.securityName}</td>
                  <td className='texright'>
                    <span className='ligray'>{portfolioPerformersField.find(item => item.ppfieldDispatcherName === "absoluteReturns")?.ppfieldDisplayName}</span>
                    <span className='returncss'>{formatNumberSeperator(item.absoluteReturns)}</span>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className='texleft tbsizewid33'>
                    <span className="ligray">{portfolioPerformersField.find(item => item.ppfieldDispatcherName === "XIRR")?.ppfieldDisplayName}</span>
                    <span className="redxirr"><b>{formatWithDecimals(item.XIRR)}</b></span>
                  </td>
                  <td className='texleft tbsizewid25'>
                    <span className="ligray">{portfolioPerformersField.find(item => item.ppfieldDispatcherName === "TWRR")?.ppfieldDisplayName}</span>
                    <span className="greenxirr"><b>{formatWithDecimals(item.TWRR)}</b></span>
                  </td>
                  <td className='texright tbsizewid33'>
                    <span className="ligray">{portfolioPerformersField.find(item => item.ppfieldDispatcherName === "absoluteReturnsPer")?.ppfieldDisplayName}</span>
                    <span className="greenxirrlight"><b>{formatWithDecimals(item.absoluteReturnsPer)}</b></span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <div className='linediv'></div>
                  </td>
                </tr>
              </tbody>
              
            ))}
            
          </table>
        </div>
        {/* <PerformerPopup PortfolioPerformersData={renderData} PortfolioPerformersField={portfolioPerformersField} TabData={tabData} /> */}
        {/* Show the "View More" button if there are more than 3 items */}
        {renderData?.length > 3 && (
          <PerformerPopup PortfolioPerformersData={renderData.slice(3)} PortfolioPerformersField={portfolioPerformersField} TabData={tabData} />
        )}
      </div>
    )
  }

  return (
    <Box sx={{ width: '100%' }} className='texttranssmal'>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {portfolioPerformersTab.map((tab, index) => (
          <Tab key={index} label={tab.ppTabDisplayName} />
        ))}
      </Tabs>
      <Box sx={{ padding: 3 }}>
        {portfolioPerformersTab.length > 0 && renderTabContent(portfolioPerformersTab[value])}
      </Box>
    </Box>
  );
};

export default DashBordTopBottom;