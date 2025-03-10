import { useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const HorizontalChart = ({fundInfoData,fundValue}) => {

  // State for chart data and popup visibility
  const [showPopup, setShowPopup] = useState(false);

  // Get the initial five data points
  // const shortedData = fundValue?.sort((a,b)=>b?.CompPercAllocation-a?.CompPercAllocation)

  const shortedData=useMemo(()=>fundValue?.sort((a,b)=>b?.CompPercAllocation-a?.CompPercAllocation),[fundValue])
  // Utility to dynamically define x-axis and y-axis fields
  const getXAxisAndYAxisFields = (config, chartType) => {
    // Filter fields corresponding to the given chartType
    const filteredConfig = config?.filter(item => item?.chartType === chartType);
  
    // Take the first as xField and second as yField (if exists)
    const xField = filteredConfig?.[0]?.dispatcherName;
    const yField = filteredConfig?.[1]?.dispatcherName;
  
    return { xField, yField };
  };
  const getChartOptions = (data) => {
    const fontFamily = '"Poppins", sans-serif';
    const { xField, yField } = getXAxisAndYAxisFields(fundInfoData, "Bar");

    return {
      chart: {
        type: "bar",
        // height: Math.max(250, data?.length * 50),
      },
      style: {
        fontFamily: fontFamily,
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: data?.map((d) => d[xField] || "N/A"),
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Value",
          align: "high",
        },
        labels: {
          overflow: "justify",
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: "Value",
          data: data?.map((d) => Number(d[yField]) || 0),
          colorByPoint: true,
          colors: [
            "#15224B", "#18335E", "#224471", "#355684",
            "#466895", "#567AA7", "#668AB9", "#769CCB",
            "#87ADDB", "#9BBEE6",
          ],
          borderRadius: 5,
          showInLegend: false, // Hide from legend
          enableMouseTracking: false, // Disable hover effects and tooltips
          events: {
            click: function () {
              return false; // Disable click functionality
            },
          },
        },
      ],
    };
  };

  return (
    <div>
      {/* Render limited data */}
      <HighchartsReact
        highcharts={Highcharts}
        containerProps={{ style: { height: "240px", width: "100%" } }}
      options={getChartOptions(shortedData.slice(0, 5))}
      />

      {/* View More Button */}
      <button onClick={() => setShowPopup(true)} className="addtocartbtn newaddbtnssec">
        View More +
      </button>

      {/* Popup for full chart */}
      {showPopup && (
        <div style={popupStyles}>
          <div style={popupContentStyles}>
            <table className="secotrstable">
              <thead>
                <tr>
                  <th>Holdings</th>
                  <th>%</th>
                </tr>
              </thead>
            </table>
            <div className="maxhgt300">
              <table className="secotrstable">
                <tbody>
                  {shortedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.Company || "N/A"}</td>
                      <td>{item?.CompPercAllocation || "0%"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              style={closeButtonStyles}
              className="closebtn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple popup styles
const popupStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "2",
};

const popupContentStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "90%",
  maxHeight: "90%",
  overflowY: "auto",
  zIndex: "9999999999",
  width: "40%",
};

const closeButtonStyles = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "red",
  color: "white",
  border: "none",
  padding: "10px",
  cursor: "pointer",
};
//   const getChartOptions = (data) => (
    
//     {
//     chart: {
//       type: "bar",

//     },
//     title: {
//       text: "",
//     },
//     xAxis: {
//       categories: data.map((d) => d.name),
//       title: {
//         text: null,
//       },
//     },
//     yAxis: {
//       min: 0,
//       title: {
//         text: "Value",
//         align: "high",
//       },
//       labels: {
//         overflow: "justify",
//       },
//     },
//     plotOptions: {
//       bar: {
//         dataLabels: {
//           enabled: true,
//         },
//       },
//     },
//     series: [
//       {
//         name: "Value",
//         data: data.map((d) => d.value),
//         colorByPoint: true, // Enable different colors for each bar
//         colors: ["#15224B", "#18335E", "#224471","#355684", "#466895", "#567AA7", "#668AB9", "#769CCB", "#87ADDB", "#9BBEE6"], // Array of colors for the bars
//         borderRadius: 5, // Rounded edges
//       },
//     ],
//   });

//   return (
//     <div>
     
//       {/* Render limited data */}
//       <HighchartsReact  
//         highcharts={Highcharts}   containerProps={{ style: { height: "270px", width: "100%" } }}

//         options={getChartOptions(limitedData)}
//       />

//       {/* View More Button */}
//       <button onClick={() => setShowPopup(true)} className="addtocartbtn newaddbtnssec">View More +</button>

//       {/* Popup for full chart */}
//       {showPopup && (
//         <div style={popupStyles}>
//           <div style={popupContentStyles}>
//           <table className="secotrstable">
//           <tr>
//               <th>Holdings</th>
//               <th>%</th>
//             </tr>
//           </table>
//           <div  className="maxhgt300" > 
//           <table className="secotrstable">
           
//             <tr>
//               <td>HDFC Bank</td>
//               <td>5%</td>
//             </tr>
//             <tr>
//               <td>Kotak Bank</td>
//               <td>7% Chang</td>
//             </tr>
//             <tr>
//               <td>IDBI Bank</td>
//               <td>6% Chang</td>
//             </tr>
//             <tr>
//               <td>HDFC Bank</td>
//               <td>5%</td>
//             </tr>
//             <tr>
//               <td>Kotak Bank</td>
//               <td>7% Chang</td>
//             </tr>
//             <tr>
//               <td>IDBI Bank</td>
//               <td>6% Chang</td>
//             </tr>
//             <tr>
//               <td>HDFC Bank</td>
//               <td>5%</td>
//             </tr>
//             <tr>
//               <td>Kotak Bank</td>
//               <td>7% Chang</td>
//             </tr>
//             <tr>
//               <td>IDBI Bank</td>
//               <td>6% Chang</td>
//             </tr>
//             <tr>
//               <td>HDFC Bank</td>
//               <td>5%</td>
//             </tr>
//             <tr>
//               <td>Kotak Bank</td>
//               <td>7% Chang</td>
//             </tr>
//             <tr>
//               <td>IDBI Bank</td>
//               <td>6% Chang</td>
//             </tr>
//             <tr>
//               <td>HDFC Bank</td>
//               <td>5%</td>
//             </tr>
//             <tr>
//               <td>Kotak Bank</td>
//               <td>7% Chang</td>
//             </tr>
//             <tr>
//               <td>IDBI Bank</td>
//               <td>6% Chang</td>
//             </tr>
//             <tr>
//               <td>HDFC Bank</td>
//               <td>5%</td>
//             </tr>
//             <tr>
//               <td>Kotak Bank</td>
//               <td>7% Chang</td>
//             </tr>
//             <tr>
//               <td>IDBI Bank</td>
//               <td>6% Chang</td>
//             </tr>
//             <tr>
//               <td>HDFC Bank</td>
//               <td>5%</td>
//             </tr>
//             <tr>
//               <td>Kotak Bank</td>
//               <td>7% Chang</td>
//             </tr>
//             <tr>
//               <td>IDBI Bank</td>
//               <td>6% Chang</td>
//             </tr>
//             <tr>
//               <td>HDFC Bank</td>
//               <td>5%</td>
//             </tr>
//             <tr>
//               <td>Kotak Bank</td>
//               <td>7% Chang</td>
//             </tr>
//             <tr>
//               <td>IDBI Bank</td>
//               <td>6% Chang</td>
//             </tr>
            
            
//           </table>
//           </div>
//              <button style={closeButtonStyles} className="closebtn" onClick={() => setShowPopup(false)}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Simple popup styles
// const popupStyles = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: "2"
// };

// const popupContentStyles = {
//   backgroundColor: "#fff",
//   padding: "20px",
//   borderRadius: "8px",
//   maxWidth: "90%",
//   maxHeight: "90%",
//   overflowY: "auto",
//   zIndex:"9999999999",
//   width: "40%"
// };

// const closeButtonStyles = {
//   position: "absolute",
//   top: "10px",
//   right: "10px",
//   background: "red",
//   color: "white",
//   border: "none",
//   padding: "10px",
//   cursor: "pointer",
// };

export default HorizontalChart;
