import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography
} from "@mui/material";
import whitestar from '../../images/whitestar.png';
import styles from "../../styles/FundCompare.module.css"

const data = [
  { id: 1, name: "Fund A", risk: "High", return: "12%", expense: "1.2%", aum: "₹10,000 Cr" },
 
];
import { useSelector } from "react-redux";

export default function ScrollTableInside({ fundInfoData }) {
  const fundScheme = useSelector((state) => 
    state.getFundCompareScheme?.fundInfo ? JSON.parse(JSON.stringify(state.getFundCompareScheme.fundInfo)) : []
  );

  const [selectedFund, setSelectedFund] = useState('FundInformation');
  const [fundGrouping, setFundGrouping] = useState({});

  useEffect(() => {
    if (fundInfoData?.widgetDetail) {
      const groups = fundInfoData.widgetDetail.reduce((acc, item) => {
        if (!acc[item.groupName]) {
          acc[item.groupName] = [];
        }
        acc[item.groupName].push(item);
        return acc;
      }, {});

      setFundGrouping(groups);
    }
  }, [fundInfoData]);

  const selectedFundData = useMemo(() => fundGrouping[selectedFund] || [], [fundGrouping, selectedFund]);

  return (
<Typography variant="body1">
{/* Tab Navigation */}
  <div className={styles.negabox}>
    {Object.keys(fundGrouping).map((key) => (
      <span 
        key={key} 
        className={[key === selectedFund ? styles.seltabdiv : styles.unseltabdiv].join(' ')}
        // className={key === selectedFund ? "seltabdiv" : "unseltabdiv"} 
        onClick={() => setSelectedFund(key)}
      >
        {fundGrouping[key][0].groupDisplayName}
      </span>
    ))}
  </div>
   <TableContainer component={Paper} sx={{  overflowX: "auto" , mt:2 }}>
         <Table stickyHeader>
           
           <TableBody>
           {selectedFundData.length > 0 ? (
              selectedFundData.map((item) => (
                <TableRow key={item.dispatcherName}>
              <TableCell className={[styles.fixincell, styles.subfontgray, 'bxshadowfortd'].join(' ')} >
              {item.fieldName}
              </TableCell>
              {Array.from({ length: 4 }).map((_, index) => (
                    <TableCell 
                      key={index} 
                      className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}
                    >
                      {fundScheme[index]?.fundInfo?.[item.dispatcherName] || '--'}
                    </TableCell>
                  ))}
                  </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", fontStyle: "italic" }}>
                  No data available
                </TableCell>
              </TableRow>
            )}
           </TableBody>
         </Table>
       </TableContainer>
       </Typography>
  );
}
