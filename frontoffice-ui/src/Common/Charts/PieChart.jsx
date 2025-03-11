
import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
 
const PieChart = (fundInfo,fundInfoData) => {
  const [chartOptions, setChartOptions] = useState(null);
 
  useEffect(() => {
    // Set Highcharts options
    setChartOptions({
      chart: {
        type: "pie", // Doughnut chart is a pie chart with innerSize
        height: '280px' 
      },
      title: {
        text: "",
        align: "center",
        verticalAlign: "middle",
        y: -10, // Adjust vertical alignment if needed
        style: {
          fontSize: "12px",
        },
      },
      subtitle: {
        text: "", // Inside label (percentage or value)
        align: "center",
        verticalAlign: "middle",
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      plotOptions: {
        pie: {
          innerSize: "60%", // Creates the doughnut effect
          dataLabels: {
            enabled: true,
            format: "{point.name}: {point.percentage:.1f}%",
          },
          showInLegend: true,
        },
      },
      colors: ["#D0BAEB", "#A35CFB", "#491888", "#FF33A1", "#FFC300"], // Custom colors
 
      series: [
        {
          name: "Share",
          data: [
            { name: "Large Cap", y: 45 },
            { name: "Mid Cap", y: 30 },
            { name: "Small Cap", y: 25 },
          ],
        },
      ],
    });
  }, []);
 
  return (
<div>
      {chartOptions ? (
<HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
<p>Loading chart...</p>
      )}
</div>
  );
};
 
export default PieChart;