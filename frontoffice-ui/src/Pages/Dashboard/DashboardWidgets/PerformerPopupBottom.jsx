import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import flogo from "../../../images/flogo.png";
import flogo1 from "../../../images/flogo1.png";
export default function PerformerPopup() {
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <div>
         <span className='viewmorespan' onClick={handleClickOpen}>
            View More +
         </span>
         <Dialog open={open} onClose={handleClose}
            PaperProps={{
               sx: { width: '1200px' } // Custom width using sx
            }}>
            <div className="fontsbold texleft tabheadersintabsspac popupheadingsall">Bottom Performers</div>
            <DialogContent sx={{ maxHeight: '300px', overflowY: 'auto' }}>

               <table className="fullw ">
                  <tbody>
                     <tr>
                        <td><img src={flogo} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo1} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo1} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo1} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo1} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo1} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo1} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo1} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo1} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo1} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
                  <tbody>
                     <tr>
                        <td><img src={flogo1} /></td>
                        <td colSpan="2" className="texleft fontsize12"> Axis Frontline Equity Reg-G</td>
                        <td className="texright"><span className="ligray">Abs Return</span><span className="returncss">20000</span></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className="texleft tbsizewid30"><span className="ligray">XIRR</span><span className="redxirr">-0.53</span></td>
                        <td className="texleft tbsizewid30"><span className="ligray">TWRR</span><span className="greenxirr">1.23%</span></td>
                        <td className="texright tbsizewid30"><span className="ligray">Abs Rts %</span><span className="greenxirrlight">4.23</span></td>
                     </tr>
                     <tr>
                        <td colSpan="5">
                           <div className="linediv"></div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} className='popupclose'>Close</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}