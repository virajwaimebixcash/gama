import React, { useState } from "react";
import Marraigehover from "../../images/Marraigehover.svg";
import Marraige from "../../images/Marraige.svg"
const Smallhoverbox6 = () => {
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
                                    src={isHovered ? Marraigehover : Marraige}
                                    alt="hover-img"
                                    className="w-32 h-32 transition-all duration-500"
                                />
                    
       
                     </td>
                   </tr>
                   <tr>
                     <td><div className='boxmain'>Marriage</div></td>
                   </tr>
               </table>
      

      
    </div>
  );
};

export default Smallhoverbox6;
