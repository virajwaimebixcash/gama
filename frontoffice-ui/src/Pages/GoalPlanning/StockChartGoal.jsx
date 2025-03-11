import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const StockChartGoal = () => {
  const options = {
    chart: {
      type: "line",
      height: 350 
    },
    
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      scrollbar: { enabled: false }, 
    },
    yAxis: {
      title: { text: "Values" },
    },
    rangeSelector: { enabled: false }, // Remove range selector
    navigator: { enabled: false }, // Disable navigator
    legend: {
      enabled: true, // First legend (default)
    },
    series: [
      {
        name: "Stock Price",
        data: [100, 120, 150, 130, 160],
        color: "#FCD633",
      },
      {
        name: "Moving Average",
        data: [110, 115, 140, 135, 155],
        color: "#7351D5",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} />;
};

export default StockChartGoal;
