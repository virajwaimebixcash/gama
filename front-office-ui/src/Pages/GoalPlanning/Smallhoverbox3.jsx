import React, { useState } from "react";
import Carhover from "../../images/Carhover.svg";
import Car from "../../images/Car.svg"
const Smallhoverbox3 = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="box3boxgoalsmall w-64 h-64 flex items-center justify-center rounded-xl transition-all duration-500"
      style={{
        background: isHovered
        ? "linear-gradient(352deg, rgba(158, 89, 243, 1) 0%, rgba(88, 53, 130, 1) 35%)"
        : "#fff",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <table className="fullwiselect">
                   <tr>
                     <td className="fxheigs">
                       
                    <img
                                   src={isHovered ? Carhover : Car}
                                   alt="hover-img"
                                   className="w-32 h-32 transition-all duration-500"
                               />
       
                     </td>
                   </tr>
                   <tr>
                     <td><div className='boxmain'>Cars</div></td>
                   </tr>
               </table>
      

      
    </div>
  );
};

export default Smallhoverbox3;
