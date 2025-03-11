import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import dayjs from 'dayjs';

export default function UpComingPopUp({ UpcomingOfferingsData, UpcomingOfferingsField, TabData }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <div>
      {/* Conditionally render the "View More" button */}
      {UpcomingOfferingsData?.length >= 3 && (
        <span className='viewmorespan' onClick={handleClickOpen}>
          View More +
        </span>
      )}
      <Dialog open={open} onClose={handleClose}
        PaperProps={{
          sx: { width: '600px' } // Custom width using sx
        }}>
        <div className="fontsbold texleft tabheadersintabsspac popupheadingsall">{TabData.upTabDispatcherName}</div>
        <DialogContent sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          <div>
            {sortedOfferings?.map((item, index) => (
              <React.Fragment key={index}>
                <div className='bosbott'>
                  <div className='paddsfortops'>{item.SchemeName} </div>
                  <div className='wid5pers'><span className={item.status === 'Live' ? 'redbacks' : 'greenredbacks'}>{item.status}</span></div>
                  <table className='fullw'>
                    <tbody>
                      <tr>
                        <td className='gapspaddingspace texleft'>
                          <div className='fons12px'>{UpcomingOfferingsField.find(field => field.upfieldDispatcherName === "Opendate")?.upfieldDisplayName}</div>
                        </td>
                        <td className='gapspaddingspace texleft'>
                          <div className='fons12pxblc'>{item.nfoOpenDate?.format('DD-MMM-YYYY')}</div>
                        </td>
                        <td className='gapspaddingspace texleft'>
                          <div className='fons12px'>{UpcomingOfferingsField.find(field => field.upfieldDispatcherName === "Closedate")?.upfieldDisplayName}</div>
                        </td>
                        <td className='gapspaddingspace texleft'>
                          <div className='fons12pxblc'>{item.nfoClosedDate?.format('DD-MMM-YYYY')}</div>
                        </td>
                      </tr>
                      {/* <tr>
                            <td className='gapspaddingspace texleft'>
                              <div className='fons12px'>{UpcomingOfferingsField.find(item => item.upfieldDispatcherName === "Listingdate")?.upfieldDisplayName}</div>
                            </td>
                            <td className='gapspaddingspace texleft'>
                              <div className='fons12pxblc'>{item.nfoListingDate?.format('DD-MMM-YYYY')}</div>
                            </td>
                            <td className='gapspaddingspace texleft'>
                              <div className='fons12px'>{UpcomingOfferingsField.find(item => item.upfieldDispatcherName === "Allotmentdate")?.upfieldDisplayName}</div>
                            </td>
                            <td className='gapspaddingspace texleft'>
                              <div className='fons12pxblc'>{item.nfoAllotmentDate?.format('DD-MMM-YYYY')}</div>
                            </td>
                          </tr> */}
                    </tbody>
                  </table>
                </div>
              </React.Fragment>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='popupclose'>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}