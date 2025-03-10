
import InstructionSummary from "../../../images/InstructionSummary.svg";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import SIPhover from "../../../images/SIPhover.svg";
import SIP from "../../../images/SIP.svg";
import SWPhover from "../../../images/SWPhover.svg";
import SWP from "../../../images/SWP.svg";
import STPhover from "../../../images/STPhover.svg";
import STP from "../../../images/STP.svg";




const StandingInstructionsSummaryWidget = ({ StandingInstructionsSummaryConfig, StandingInstructionsData }) => {
    const navigate = useNavigate();

    const SIPConfig = StandingInstructionsSummaryConfig?.standingInstructionsSummaryTab.find((instruction) => instruction.sisTabDispatcherName === 'SIP');
    const SWPConfig = StandingInstructionsSummaryConfig?.standingInstructionsSummaryTab.find((instruction) => instruction.sisTabDispatcherName === 'SWP');
    const STPConfig = StandingInstructionsSummaryConfig?.standingInstructionsSummaryTab.find((instruction) => instruction.sisTabDispatcherName === 'STP');

    const handleNavigation = (path) => {
        navigate(`/investmentcarts?path=${path}`)
    };
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    return (
        <div className="container3box">
            {
                SIPConfig.isHide === 'N' &&
                <div onClick={() => handleNavigation("sip")} className="box3box pointerClass w-64 h-64 flex items-center justify-center rounded-xl transition-all duration-500"
                style={{
                    background: isHovered
                      ? "linear-gradient(352deg, rgba(158, 89, 243, 1) 0%, rgba(88, 53, 130, 1) 35%)"
                      : "#F3F3F3",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                    <table >
                        <tr >
                            <td><img 
                             src={isHovered ? SIPhover : SIP}
                             alt="hover-img"
                             className="w-32 h-32 transition-all duration-500"
                            /></td>
                            <td className='innerhbox'>{SIPConfig?.sisTabDisplayName}</td>
                            <td><span className='countsizeinhover'>{StandingInstructionsData?.sipDueCount}</span></td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                {StandingInstructionsData?.sipTotalDueAmt}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <img src= {InstructionSummary} className="rightfloats" />
                            </td>
                        </tr>
                    </table>
                </div>
            }
            {
                SWPConfig.isHide === 'N' &&
                <div onClick={() => handleNavigation("swp")} className="box3box pointerClass w-64 h-64 flex items-center justify-center rounded-xl transition-all duration-500"
                style={{
                    background: isHovered1
                      ? "linear-gradient(352deg, rgba(158, 89, 243, 1) 0%, rgba(88, 53, 130, 1) 35%)"
                      : "#F3F3F3",
                  }}
                  onMouseEnter={() => setIsHovered1(true)}
                  onMouseLeave={() => setIsHovered1(false)}
                >
                    <table >
                        <tr>
                            <td><img 
                             src={isHovered1 ? SWPhover : SWP}
                             alt="hover-img"
                             className="w-32 h-32 transition-all duration-500"
                            /></td>
                            <td className='innerhbox'>{SWPConfig?.sisTabDisplayName}</td>
                            <td><span className='countsizeinhover'>{StandingInstructionsData?.swpDueCount}</span></td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                {StandingInstructionsData?.swpTotalDueAmt}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <img src= {InstructionSummary} className="rightfloats" />
                            </td>
                        </tr>
                    </table>
                </div>
            }
            {
                STPConfig.isHide === 'N' &&
                <div onClick={() => handleNavigation("stp")} className="box3box pointerClass w-64 h-64 flex items-center justify-center rounded-xl transition-all duration-500"
                style={{
                    background: isHovered2
                      ? "linear-gradient(352deg, rgba(158, 89, 243, 1) 0%, rgba(88, 53, 130, 1) 35%)"
                      : "#F3F3F3",
                  }}
                  onMouseEnter={() => setIsHovered2(true)}
                  onMouseLeave={() => setIsHovered2(false)}
                >
                    <table >
                        <tr>
                            <td><img 
                             src={isHovered2 ? STPhover : STP}
                             alt="hover-img"
                             className="w-32 h-32 transition-all duration-500"
                            
                            /></td>
                            <td className='innerhbox'>{STPConfig?.sisTabDisplayName}</td>
                            <td><span className='countsizeinhover'>{StandingInstructionsData?.stpDueCount}</span></td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                {StandingInstructionsData?.stpTotalDueAmt}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <img src= {InstructionSummary} className="rightfloats" />
                            </td>
                        </tr>
                    </table>
                </div>
            }
        </div>
    );
};

export default StandingInstructionsSummaryWidget;