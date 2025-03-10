import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const HorizontalChart = ({ fundInfoData, fundValue }) => {    

  // State for chart data and popup visibility
  const [showPopup, setShowPopup] = useState(false);

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
    // Get X-Axis and Y-Axis fields dynamically
    const { xField, yField } = getXAxisAndYAxisFields(fundInfoData, "Bar");    

    return {
      chart: {
        type: "bar",
        // height: Math.max(250, data.length * 50), // Dynamically adjust height
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: data?.map((d) => d[xField] || "N/A"), // X-Axis field dynamically
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
          // name: "Value",
          data: data?.map((d) => Number(d[yField]) || 0), // Y-Axis field dynamically
          colorByPoint: true,
          colors: [
            "#15224B", "#18335E", "#224471", "#355684",
            "#466895", "#567AA7", "#668AB9", "#769CCB",
            "#87ADDB", "#9BBEE6"
          ],
          borderRadius: 5, // Rounded edges
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
        options={getChartOptions(fundValue?.slice(0, 5))}
      />

      {/* View More Button */}
      <button onClick={() => setShowPopup(true)} className="addtocartbtn newaddbtnssec">View More +</button>

      {/* Popup for full chart */}
      {showPopup && (
        <div style={popupStyles}>
          <div style={popupContentStyles}>
            <h2>Sectors</h2>
            <div className="maxhgt300"
            // style={chartScrollContainerStyles}
            >
              <HighchartsReact
                highcharts={Highcharts}
                containerProps={{ style: { height: "800px", width: "100%" } }}
                options={getChartOptions(fundValue)}
              />
            </div>
            <button style={closeButtonStyles} className="closebtn" onClick={() => setShowPopup(false)}>
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
  zIndex: 2,
};

const popupContentStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "90%",
  maxHeight: "90%",
  overflowY: "auto",
  zIndex: 9999999999,
  width: "65%",
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

export default HorizontalChart;
