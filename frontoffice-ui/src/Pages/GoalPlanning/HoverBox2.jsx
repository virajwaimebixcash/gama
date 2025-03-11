import React, { useState } from "react";
import Educationover from "../../images/Educationhover.svg";
import Education from "../../images/Education.svg"
const HoverBox1 = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="box3boxgoal w-64 h-64 flex items-center justify-center rounded-xl transition-all duration-500"
      style={{
        background: isHovered
        ? "linear-gradient(352deg, rgba(158, 89, 243, 1) 0%, rgba(88, 53, 130, 1) 35%)"
        : "#fff",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <table>
            <tr>
              <td>
                <img
                src={isHovered ? Educationover : Education}
                alt="hover-img"
                className="w-32 h-32 transition-all duration-500"
            />

              </td>
            </tr>
            <tr>
              <td><div className='boxmain'>Education</div></td>
            </tr>
        </table>
      

      
    </div>
  );
};

export default HoverBox1;
