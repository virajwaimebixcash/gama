import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import UpComingPopUp from '../DashboardWidgets/UpComingPopUp';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function UpCommimg({ UpcomingOfferingsWidgetDetails, UpcomingOfferingsData }) {

  const navigate = useNavigate();
  // Find the index of the "Mutual Fund" tab by matching the `upcomingOWidgetTabId`
  const defaultTabIndex = UpcomingOfferingsWidgetDetails.upcomingofferingsTab.findIndex(tab => tab.upcomingOWidgetTabId === 2);
  const [value, setValue] = useState(defaultTabIndex >= 0 ? defaultTabIndex : 0); // Default to the "Mutual Fund" tab or first tab if not found
  // const [value, setValue] = useState(0); // To track the active tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const upcomingOfferingsTab = UpcomingOfferingsWidgetDetails.upcomingofferingsTab.filter(tab => tab.isHide !== 'Y') || [];
  const upcomingOfferingsField = UpcomingOfferingsWidgetDetails.upcomingOfferingsField || [];

  // Sort the UpcomingOfferingsData to show Live first, then Upcoming
  const sortedOfferings = UpcomingOfferingsData?.map(item => {
    const nfoOpenDate = dayjs(item.NFOOpenDate);
    const nfoClosedDate = dayjs(item.NFOClosedDate);
    const currentDate = dayjs(); // Get current date

    // Determine status
    let status = '';
    if (
      (currentDate.isAfter(nfoOpenDate) && currentDate.isBefore(nfoClosedDate)) ||
      currentDate.isSame(nfoOpenDate, 'day') ||
      currentDate.isSame(nfoClosedDate, 'day')
    ) {
      status = 'Live';
    } else if (currentDate.isBefore(nfoOpenDate)) {
      status = 'Upcoming';
    }

    return { ...item, status, nfoOpenDate, nfoClosedDate };
  })
    .sort((a, b) => {
      // Show "Live" first, then "Upcoming"
      if (a.status === 'Live' && b.status !== 'Live') return -1;
      if (a.status === 'Upcoming' && b.status === 'Live') return 1;
      return 0;
    }) || [];

  const navigateToSecurityPage = (item) => {
    navigate("/securityview", { state: { SchemeCode: item.SchemeCode, SchemeName: item.SchemeName } });
  }

  // Dynamically render content for each tab
  const renderTabContent = (tabData) => {
    if (tabData?.upcomingOWidgetTabId === 2) {
      return (
        <div>
          {sortedOfferings?.slice(0, 3).map((item, index) => (
            <React.Fragment key={index}>
              <div className='bosbott' style={{ cursor: 'pointer' }} onClick={() => navigateToSecurityPage(item)}>
                <div className='paddsfortops'>{item.SchemeName} </div>
                <div className='wid5pers'><span className={item.status === 'Live' ? 'redbacks' : 'greenredbacks'}>{item.status}</span></div>
                <table className='fullw'>
                  <tbody>
                    <tr>
                      <td className='gapspaddingspace texleft'>
                        <div className='fons12px'>{upcomingOfferingsField.find(field => field.upfieldDispatcherName === "Opendate")?.upfieldDisplayName}</div>
                      </td>
                      <td className='gapspaddingspace texleft'>
                        <div className='fons12pxblc'>{item.nfoOpenDate.format('DD-MMM-YYYY')}</div>
                      </td>
                      <td className='gapspaddingspace texleft'>
                        <div className='fons12px'>{upcomingOfferingsField.find(field => field.upfieldDispatcherName === "Closedate")?.upfieldDisplayName}</div>
                      </td>
                      <td className='gapspaddingspace texleft'>
                        <div className='fons12pxblc'>{item.nfoClosedDate.format('DD-MMM-YYYY')}</div>
                      </td>
                    </tr>
                    {/* <tr>
                  <td className='gapspaddingspace texleft'>
                    <div className='fons12px'>{upcomingOfferingsField.find(item => item.upfieldDispatcherName === "Listingdate")?.upfieldDisplayName}</div>
                  </td>
                  <td className='gapspaddingspace texleft'>
                    <div className='fons12pxblc'>{nfoListingDate.format('DD-MMM-YYYY')}</div>
                  </td>
                  <td className='gapspaddingspace texleft'>
                    <div className='fons12px'>{upcomingOfferingsField.find(item => item.upfieldDispatcherName === "Allotmentdate")?.upfieldDisplayName}</div>
                  </td>
                  <td className='gapspaddingspace texleft'>
                    <div className='fons12pxblc'>{nfoAllotmentDate.format('DD-MMM-YYYY')}</div>
                  </td>
                </tr> */}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ))}
          {/* <UpComingPopUp UpcomingOfferingsData={UpcomingOfferingsData} UpcomingOfferingsField={upcomingOfferingsField} TabData={tabData} /> */}
          {/* Show the "View More" button if there are more than 3 items */}
          {UpcomingOfferingsData?.length > 3 && (
            <UpComingPopUp upcomingOfferingsData={UpcomingOfferingsData.slice(3)} UpcomingOfferingsField={upcomingOfferingsField} TabData={tabData} />
          )}
        </div>
      );
    }
  }

  return (
    <Box sx={{ width: '100%' }} className='texttranssmal'>
      <Tabs value={value} onChange={handleChange} aria-label="tabs example">
        {upcomingOfferingsTab.map((tab, index) => (
          <Tab key={index} label={tab.upTabDisplayName} />
        ))}
      </Tabs>
      <Box sx={{ p: 3 }}>
        {upcomingOfferingsTab.length > 0 && renderTabContent(upcomingOfferingsTab[value])}
      </Box>
    </Box>
  );
}

export default UpCommimg;
