import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DoughnutChart2 = ({fundValue,data}) => {
  const fontFamily = '"Poppins", sans-serif';
   const [chartOptions, setChartOptions] = useState(null);  
   useEffect(() => {
     const processData = () => {
       if (Array.isArray(data)) {
         return data.map((item) => {
           return {
             name: item.dispatcherNameForCategory,
             y: fundValue && fundValue[item.dispatcherNameForCategory] ? Number(fundValue[item.dispatcherNameForCategory]) : 0,
           };
         });
       } else if (data?.subCategories) {
         return data.subCategories.map((item) => {
           return {
             name: item.dispatcherNameForSubCategory,
             y: fundValue && fundValue[item.dispatcherNameForSubCategory] ? Number(fundValue[item.dispatcherNameForSubCategory]) : 0,
           };
         });
       }
       return [];
     };
 
   
     const processedData = processData();        
 
     setChartOptions({
       chart: {
         type: "pie", // Doughnut chart is a pie chart with innerSize
         height: '250px'
       },
       style: {
         fontFamily: fontFamily,
       },
       title: {
         text: "",
         align: "center",
         verticalAlign: "middle",
         y: 10, // Adjust vertical alignment if needed
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
             format: "{point.name}: {point.percentage:.1f}%", // Display name with percentage
           },
           showInLegend:true,
           
         },
       },
       colors: ["#D0BAEB", "#A35CFB", "#491888", "#FF33A1", "#FFC300"], // Custom colors
       series: [
         {
           name: "Share",
           data: processedData,
         },
       ],
     });
   }, [data, fundValue]);
 
  return (
    <div style={{ width: "100%", height: "300px"}}>
       <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      {/* <HighchartsReact highcharts={Highcharts} options={chartOptions} /> */}
    </div>
  );
};

export default DoughnutChart2;
