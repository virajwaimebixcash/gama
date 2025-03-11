import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material";
import DoughnutChartCompare from './DoughnutChartCompare';
import styles from "../../styles/FundCompare.module.css"
import { useSelector } from "react-redux";


const data = [
  { id: 1, name: "Fund A", risk: "High", return: "12%", expense: "1.2%", aum: "₹10,000 Cr" },

];

export default function ActualComparison({ fundInfoData }) {
  const fundScheme = useSelector((state) => JSON.parse(JSON.stringify(state.getFundCompareScheme.fundInfo)));
  const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const today = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-IN', options);

    const widgetDetails = fundInfoData?.widgetDetail || [];
    

    // const level = widgetDetails[0]?.level === 1 && widgetDetails[0]?.isLevelEnable !== 'Y' ? 1 : 2;
    // const level = widgetDetails[0]?.level === 1 && widgetDetails[0]?.isLevelEnable === 'Y' ? 1 : 2;

    const level1Config = widgetDetails.filter(
        (detail) => detail.level === 1
    );

    // const groupedData = widgetDetails.filter((detail) => detail.level === 2)
    //     .reduce((acc, current) => {
    //         const { category, dispatcherNameForCategory, ...rest } = current;

    //         if (!acc[category]) {
    //             acc[category] = {
    //                 category,
    //                 dispatcherNameForCategory,
    //                 subCategories: []
    //             };
    //         }
    //         acc[category].subCategories.push(rest);

    //         return acc;
    //     }, {});

    // const level2Config = Object.values(groupedData);



  return (
<Typography variant="body1">
   <TableContainer component={Paper} sx={{  overflowX: "auto" }}>
         <Table stickyHeader>
           
           <TableBody>
           <TableRow >
              <TableCell className={[styles.fixincell, styles.subfontgray, 'bxshadowfortd'].join(' ')}>
                <table>
                   <tr>
                    <td className={[styles.fxwidth, styles.pdt30].join(' ')}>Equity</td>
                    <td className={styles.pdt30}><span className={[styles.legendscompare, styles.purpleinchart].join(' ')} ></span></td>
                   </tr>
                </table>

              </TableCell>
              
              <TableCell rowSpan={5} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd','leftsizeincell'].join(' ')}>
                {fundScheme[0]&&<DoughnutChartCompare fundValue={fundScheme[0].fundInfo} data={level1Config}></DoughnutChartCompare>}
                </TableCell>
              <TableCell rowSpan={5} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
              {fundScheme[1]&&<DoughnutChartCompare fundValue={fundScheme[1].fundInfo} data={level1Config}></DoughnutChartCompare>}            
              </TableCell>
              <TableCell rowSpan={5} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
              {fundScheme[2]&&<DoughnutChartCompare fundValue={fundScheme[2].fundInfo} data={level1Config}></DoughnutChartCompare>}
              </TableCell>
              <TableCell rowSpan={5} className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
              {fundScheme[3]&&<DoughnutChartCompare fundValue={fundScheme[3].fundInfo} data={level1Config}></DoughnutChartCompare>}
              </TableCell>
            </TableRow>
            <TableRow >

            </TableRow>
            <TableRow >
              <TableCell className={[styles.fixincell, styles.subfontgray, 'bxshadowfortd'].join(' ')}>
              <table>
                   <tr>
                    <td className={styles.fxwidth}>Debt</td>
                    <td><span className={[styles.legendscompare, styles.darkcolinchart].join(' ')} ></span></td>
                   </tr>
                </table>

              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell className={[styles.fixincell, styles.subfontgray, 'bxshadowfortd'].join(' ')}>
              <table>
                   <tr>
                    <td className={styles.fxwidth}>Cash</td>
                    <td><span className={[styles.legendscompare, styles.lightskyinchart].join(' ')} ></span></td>
                   </tr>
                </table>
              </TableCell>
            </TableRow>
           </TableBody>
         </Table>
       </TableContainer>
       </Typography>
  );
}
