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
import FundeCompareToolTip from "./FundeCompareToolTip";
import styles from "../../styles/FundCompare.module.css"
import { useSelector } from "react-redux";

const groupByCategory = (details) => {
  return details.reduce((result, item) => {
    const { tabName } = item;
    if (!result[tabName]) result[tabName] = [];
    result[tabName].push(item);
    return result;
  }, {});
};

const TopHoldingsList = ({ fundInfoData }) => {
  const fundScheme = useSelector((state) => JSON.parse(JSON.stringify(state.getFundCompareScheme.fundInfo)));
  const widgetDetails = fundInfoData?.widgetDetail || [];
  const groupedConfig = groupByCategory(widgetDetails);

  const getTopHolding = (index, keyIndex, dispatcherName) => {
    return (
      fundScheme[index]?.fundInfo?.StockAllocationResponseCollection?.[keyIndex]?.[dispatcherName] || "--"
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
            <TableRow>
            <TableCell className={[styles.new18per, 'bxshadowfortd','fixincell'].join(' ')} rowSpan={15}></TableCell>
            {[...Array(4)].map((_, i) => (
              <TableCell key={i} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
                <div className={[styles.halfdivautosize, 'centincell'].join(' ')}>Security</div>
                <div className={[styles.halfdivautosize, styles.halfdivautosizefloatr, 'centincell'].join(' ')}>Wts%</div>
              </TableCell>
            ))}
          </TableRow>
          {[1, 2, 3, 4, 5].map((keys, index) => (
            <TableRow key={index}>
              {[0, 1, 2, 3].map((colIndex) => (
                <TableCell key={colIndex} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
                  <div className={[styles.halfdivautosize,styles.subfontgray, 'centincell', 'fonwieight500'].join(' ')}>
                    <FundeCompareToolTip text={getTopHolding(colIndex, keys, "Company")} />
                  </div>
                  <div className={[styles.halfdivautosize, styles.halfdivautosizefloatr, 'centincell'].join(' ')}>
                    {getTopHolding(colIndex, keys, "CompPercAllocation")}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopHoldingsList;