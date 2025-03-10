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
const data = [
  { id: 1, name: "Fund A", risk: "High", return: "12%", expense: "1.2%", aum: "₹10,000 Cr" },
 
];

export default function DividentHistoryCompare() {
  return (
   <TableContainer component={Paper} sx={{  overflowX: "auto" }}>
         <Table stickyHeader>
           
           <TableBody>
           <TableRow >
              <TableCell  className={[styles.fixincell, styles.subfontgray, 'bxshadowfortd'].join(' ')}>
                Record Date/Payout Date
              </TableCell>
              
              <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd','leftsizeincell'].join(' ')}>
              5-Feb-2025
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
              5-Feb-2025
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
               
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
            
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell className={[styles.fixincell, styles.subfontgray, 'bxshadowfortd'].join(' ')}>
               NAVPU Cum IDCW
              </TableCell>
              
              <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd','leftsizeincell'].join(' ')}>
                10.4117
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
               10.4117
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
               
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
            
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell className={[styles.fixincell, styles.subfontgray, 'bxshadowfortd'].join(' ')}>
               Dividend
              </TableCell>
              
              <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd','leftsizeincell'].join(' ')}>
                0.0498
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
                0.0498
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
               
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
            
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell className={[styles.fixincell, styles.subfontgray, 'bxshadowfortd'].join(' ')}>
               NAVPU Ex IDCW
              </TableCell>
              
              <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd','leftsizeincell'].join(' ')}>
                10.4675
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
               10.4675
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
               
              </TableCell>
              <TableCell  className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
            
              </TableCell>
            </TableRow>
            
           
           </TableBody>
         </Table>
       </TableContainer>
  );
}
