import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import redno from "../../../images/redno.png";
import greenyes from "../../../images/greenyes.png";
import dayjs from 'dayjs';
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatWithDecimals } from '../../../utils/commonFunction';
import api from "../../../APIs/interceptor";

export default function WatchListPopup({ tabListData = [], WatchListFieldData = [], getWatchListTabsSchemeList }) {
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const removeItem = (items) => {
      api.post('/dashboard/removeDashWatchListTabDataDetails', [
         {
            "watchlistItemId": items.watchlistItemId,
            "itemSequence": items.itemSequence
         }
      ]).then(() => {
         getWatchListTabsSchemeList()
      }).catch((error) => {
         console.log(error, "error");
      });
      // setItems(items.filter((item) => item.id !== id));
   };

   return (
      <div className='marginTopView'>
         <span className='viewmorespan' onClick={handleClickOpen}>
            View More +
         </span>
         <Dialog open={open} onClose={handleClose}
            PaperProps={{
               sx: { width: '600px' } // Custom width using sx
            }}>
            <div className="fontsbold texleft tabheadersintabsspac popupheadingsall">Watch List</div>
            <DialogContent sx={{ maxHeight: '300px', overflowY: 'auto' }}>
               {tabListData?.map((items) => {
                  const filteredData = WatchListFieldData?.filter((field) => field.isHide === "N");
                  return <><div className='bosbott'>
                     <div className='paddsfortopsforwatch paddsfortops'>{items.SchemeName}</div>
                     <div className='paddsfortopsforwatchrig paddsfortops fons12px'><span className='fullgra'>{filteredData?.find((items) => items.dispatcherName === 'MktPrice')?.displayName || 'MktPrice'}</span><span>{formatWithDecimals(items.latestnav)}</span></div>

                     <table className='fullw'>
                        <tr>
                           <td className='gapspaddingspace texleft' colSpan={2}>
                              <div className='fons12px'>{filteredData?.find((items) => items.dispatcherName === 'TrackingSince')?.displayName || 'TrackingSince'}<span className='fons12pxblc'>{dayjs(new Date(items.createdOn)).format('DD-MM-YYYY')}</span></div>
                           </td>
                           <td className='gapspaddingspace texleft' colSpan={2}>
                              <div className='fons12px'>{filteredData?.find((items) => items.dispatcherName === "TrackingPer")?.displayName || ""}<span className='fons12pxblc'>{items.NFOClosedDate}</span></div>
                           </td>
                        </tr>
                        <tr>
                           <td colSpan="4" className='gapspaddingspace texleft'>
                              <div className='oneThirdSize1'>
                                 <span>{filteredData?.find((items) => items.dispatcherName === "Returns3Month")?.displayName || ""}</span>
                                 <span className={items.trackingPercentage > 0 ? 'greenspans' : "redspans"}>{items.Returns3Month}%</span><span> <span> <img src={items.trackingPercentage > 0 ? greenyes : redno} /></span></span>
                              </div>
                              <div className='oneThirdSize1'>
                                 <span>{filteredData?.find((items) => items.dispatcherName === "Returns6Month")?.displayName || ""}</span>
                                 <span className={items.trackingPercentage > 0 ? 'greenspans' : "redspans"}>{items.Returns6Month}%</span><span> <span> <img src={items.trackingPercentage > 0 ? greenyes : redno} /></span></span>
                              </div>
                              <div className='oneThirdSize1'>
                                 <span>{filteredData?.find((items) => items.dispatcherName === "Returns1Year")?.displayName || ""}</span>
                                 <span className={items.trackingPercentage > 0 ? 'greenspans' : "redspans"}>{items.Returns1Year}%</span><span> <span> <img src={items.trackingPercentage > 0 ? greenyes : redno} /></span></span>
                              </div>
                              <IconButton size="small" onClick={() => removeItem(items)} className="closewatch">
                                 <DeleteIcon fontSize="small" />
                              </IconButton>
                              {/* <div className='oneThirdSize1'>
                                    <span>{filteredData?.find((items) => items.dispatcherName === "Absolute Returns %")?.displayName || ""}</span>
                                    <span className='redspans'>-{items.down}%</span><span> <span> <img src={redno} /></span></span>
                                 </div> */}
                              {/* <div className='oneThirdSize1'>
                                 <span>{filteredData?.find((items) => items.dispatcherName === "XIRR")?.displayName || ""}</span>
                                 <span className={items.trackingPercentage > 0 ? 'greenspans' : "redspans"}>{items.trackingPercentage}%</span><span> <span> <img src={items.trackingPercentage > 0 ? greenyes : redno} /></span></span>
                              </div> */}
                              {/* <div className='oneThirdSize1'>
                                    <span>{filteredData?.find((items) => items.dispatcherName === "TWRR")?.displayName || ""}</span>
                                    <span className='greenspans'>15 %</span><span> <span> <img src={greenyes} /></span></span>
                                 </div> */}
                           </td>
                        </tr>
                     </table>
                  </div></>
               })}
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} className='popupclose'>Close</Button>
            </DialogActions>
         </Dialog >
      </div >
   );
}