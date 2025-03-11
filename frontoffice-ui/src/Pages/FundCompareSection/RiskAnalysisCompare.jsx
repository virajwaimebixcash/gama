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
import styles from "../../styles/FundCompare.module.css"

import { useSelector } from "react-redux";
const data = [
  { id: 1, name: "Fund A", risk: "High", return: "12%", expense: "1.2%", aum: "₹10,000 Cr" },

];
const createRiskAnalysisSkeleton = (widgetDetail = [], fundValue) => {
  if (!widgetDetail || widgetDetail.length === 0) {
    return Array.from({ length: 10 }).map((_, index) => ({
      label: `Placeholder Label ${index + 1}`,
      value: '---',
    }));
  }

  return widgetDetail.map((item) => ({
    ...item,
    fieldDisplayName: item?.fieldDisplayName || '--',
    value: fundValue.map((funds) => funds.fundInfo?.[item?.dispatcherName] != null ? funds?.fundInfo?.[item?.dispatcherName] : '--',)
  }));
};

export default function RiskAnalysisCompare({ fundInfoData }) {
  const fundScheme = useSelector((state) => JSON.parse(JSON.stringify(state.getFundCompareScheme.fundInfo)));
  const riskAnalysisData = createRiskAnalysisSkeleton(fundInfoData?.widgetDetail, fundScheme);

  return (
   <TableContainer component={Paper} sx={{  overflowX: "auto" }}>
         <Table stickyHeader>
           
           <TableBody>
           {riskAnalysisData.map((items) => <TableRow >
              <TableCell className={[styles.fixincell, styles.subfontgray, 'bxshadowfortd'].join(' ')} >
              {items.fieldDisplayName}
              </TableCell>
              
              <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd','leftsizeincell'].join(' ')}>
              {items.value[0]}
              </TableCell>
              <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
              {items.value[1]}
              </TableCell>
              <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
              {items.value[2]}
              </TableCell>
              <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
            
              </TableCell>
            </TableRow>)}
           </TableBody>
         </Table>
       </TableContainer>
  );
}
