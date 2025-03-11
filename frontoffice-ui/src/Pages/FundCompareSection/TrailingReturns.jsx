import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "../../styles/FundCompare.module.css"
import { useSelector } from "react-redux";

const FundTable = ({ data }) => (
  <Table>
    <TableRow>
      {data ? (
        <>
          <TableCell className={[styles.fortabspacing, styles.bld600, styles.centincell].join(' ')}>{data["Fund Returns"]}</TableCell>
          <TableCell className={[styles.fortabspacing, styles.bld600,  styles.centincell].join(' ')}>{data["Benchmark Returns"]}</TableCell>
        </>
      ) : (
        <>
          <TableCell className={[styles.fortabspacing, styles.bld600, styles.centincell].join(' ')}>--</TableCell>
          <TableCell className={[styles.fortabspacing, styles.bld600,  styles.centincell].join(' ')}>--</TableCell>
        </>
      )}
    </TableRow>
  </Table>
);

const TrailingReturns = ({ fundInfoData }) => {
  const fundScheme = useSelector((state) =>
    JSON.parse(JSON.stringify(state.getFundCompareScheme.fundInfo))
  );

  // Memoized function to group row data dynamically
  const getGroupRow = useCallback(
    (index) => {
      const groupedRows = {};
      fundInfoData?.widgetDetail.forEach((item) => {
        if (!groupedRows[item.rowHeader]) groupedRows[item.rowHeader] = {};
        groupedRows[item.rowHeader][item.columnHeader] =
          fundScheme[index]?.fundInfo?.[item.dispatcherName] || "--";
      });
      return groupedRows;
    },
    [fundScheme, fundInfoData]
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
              {/* Header Row */}
          <TableRow>
          <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}></TableCell>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableCell key={index} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
              <Table>
                <TableRow>
                  <TableCell  className={[styles.subfontgray, styles.fortabspacing, styles.leftme20, 'centincell'].join(' ')}>Fund</TableCell>
                  <TableCell className={[styles.subfontgray, styles.fortabspacing, 'centincell'].join(' ')}>Benchmark</TableCell>
                </TableRow>
              </Table>
            </TableCell>
          ))}
        </TableRow>
        
          {/* Data Rows */}
          {Object.keys(getGroupRow(0)).map((key) => (
            <TableRow key={key}>
              <TableCell className={styles.fixincell}>{key}</TableCell>
              {fundScheme.slice(0, 4).map((_, index) => (
                <TableCell key={index} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
                  <FundTable data={getGroupRow(index)[key]} />
                </TableCell>
                 
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrailingReturns;
