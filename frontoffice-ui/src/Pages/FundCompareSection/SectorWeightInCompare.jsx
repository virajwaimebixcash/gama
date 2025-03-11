import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import HorizontalBarChartCompare from './HorizontalBarChartCompare';
import styles from "../../styles/FundCompare.module.css"
import { useSelector } from "react-redux";

const data = [
  { id: 1, name: "Fund A", risk: "High", return: "12%", expense: "1.2%", aum: "₹10,000 Cr" },
 
];
const groupByCategory = (details) => {
  return details.reduce((result, item) => {
    const { tabName } = item;
    if (!result[tabName]) result[tabName] = [];
    result[tabName].push(item);
    return result;
  }, {});
};

export default function SectorWeightInCompare({fundInfoData}) {
  const fundScheme = useSelector((state) => JSON.parse(JSON.stringify(state.getFundCompareScheme.fundInfo)));
  const widgetDetails = fundInfoData?.widgetDetail || [];
  const groupedConfig = groupByCategory(widgetDetails);

  return (
   <> <TableContainer component={Paper} sx={{  overflowX: "auto" }}>
   <Table stickyHeader>
     
     <TableBody>
     <TableRow >
        <TableCell rowSpan={6} className={[styles.fixincell, styles.subfontgray, 'bxshadowfortd'].join(' ')}>
         
           
        </TableCell>
        
        <TableCell rowSpan={6} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd','leftsizeincell'].join(' ')}>
        {fundScheme[0]&&<HorizontalBarChartCompare fundInfoData={groupedConfig?.TopHolding} fundValue={fundScheme[0]?.fundInfo?.StockAllocationResponseCollection}></HorizontalBarChartCompare>}
        </TableCell>
        
        <TableCell rowSpan={6} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
        {fundScheme[1] && <HorizontalBarChartCompare fundInfoData={groupedConfig?.TopHolding} fundValue={fundScheme[1]?.fundInfo?.StockAllocationResponseCollection}></HorizontalBarChartCompare>}
        </TableCell>
        <TableCell rowSpan={6} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
        {fundScheme[2]&&<HorizontalBarChartCompare fundInfoData={groupedConfig?.TopHolding} fundValue={fundScheme[2]?.fundInfo?.StockAllocationResponseCollection}></HorizontalBarChartCompare>}
        </TableCell>
        <TableCell rowSpan={6} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
        {fundScheme[3]&& <HorizontalBarChartCompare fundInfoData={groupedConfig?.TopHolding} fundValue={fundScheme[3]?.fundInfo?.StockAllocationResponseCollection}></HorizontalBarChartCompare>}
        </TableCell>
      </TableRow>
     </TableBody>
   </Table>
 </TableContainer>
      </>
  );
}
