import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import flogo from "../../../images/flogo.png";

export default function PerformerPopup({ PortfolioPerformersData, PortfolioPerformersField, TabData }) {
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <div>
         {/* Conditionally render the "View More" button */}
         {PortfolioPerformersData?.length >= 3 && (
            <span className='viewmorespan' onClick={handleClickOpen}>
               View More +
            </span>
         )}
         <Dialog open={open} onClose={handleClose}
            PaperProps={{
               sx: { width: '1200px' } // Custom width using sx
            }}>
            <div className="fontsbold texleft tabheadersintabsspac popupheadingsall">{TabData.ppTabDisplayName}</div>
            <DialogContent sx={{ maxHeight: '300px', overflowY: 'auto' }}>
               <table className="fullw">
                  {PortfolioPerformersData?.map((item, index) => (
                     <tbody key={index}>
                        <tr>
                           <td><img src={flogo} /></td>
                           <td colSpan="2" className="texleft fontsize12">{item.securityName}</td>
                           <td className="texright"><span className="ligray">{PortfolioPerformersField.find(item => item.ppfieldDispatcherName === "absoluteReturns")?.ppfieldDisplayName}</span>
                              <span className="returncss">{item.absoluteReturns}</span>
                           </td>
                        </tr>
                        <tr>
                           <td></td>
                           <td className="texleft tbsizewid30"><span className="ligray">{PortfolioPerformersField.find(item => item.ppfieldDispatcherName === "XIRR")?.ppfieldDisplayName}</span>
                              <span className="redxirr">{item.XIRR}</span>
                           </td>
                           <td className="texleft tbsizewid30"><span className="ligray">{PortfolioPerformersField.find(item => item.ppfieldDispatcherName === "TWRR")?.ppfieldDisplayName}</span>
                              <span className="greenxirr">{item.TWRR}</span>
                           </td>
                           <td className="texright tbsizewid30"><span className="ligray">{PortfolioPerformersField.find(item => item.ppfieldDispatcherName === "absoluteReturnsPer")?.ppfieldDisplayName}</span>
                              <span className="greenxirrlight">{item.absoluteReturnsPer}</span>
                           </td>
                        </tr>
                        <tr>
                           <td colSpan="5">
                              <div className="linediv"></div>
                           </td>
                        </tr>
                     </tbody>
                  ))}
               </table>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} className='popupclose'>Close</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}