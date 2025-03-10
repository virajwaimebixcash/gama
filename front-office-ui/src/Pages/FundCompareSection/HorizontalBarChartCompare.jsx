import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Height } from "@mui/icons-material";


const HorizontalBarChart = ({ fundInfoData, fundValue }) => {
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

  return <HighchartsReact
    highcharts={Highcharts}
    containerProps={{ style: { height: "240px", width: "100%" } }}
    options={getChartOptions(fundValue?.sort((a,b)=>b.CompPercAllocation-a.CompPercAllocation).slice(0, 5))} />;
};

export default HorizontalBarChart;


