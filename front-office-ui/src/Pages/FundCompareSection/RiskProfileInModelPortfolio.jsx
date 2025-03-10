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
// import RiskProfile from "../Security/SecurityViewWidgets/RiskProfile";
 import RiskProfile from "./RiskProfile"
import { useSelector } from "react-redux";
import styles from "../../styles/FundCompare.module.css"
const RiskProfileInModelPortfolio = ({ fundInfoData }) => {
  const fundScheme = useSelector((state) => JSON.parse(JSON.stringify(state.getFundCompareScheme.fundInfo)));
  // Static Data
  const rows = [
    { id: 1, name: "John Doe", age: 28, country: "USA" },
    { id: 2, name: "Jane Smith", age: 34, country: "UK" },
    { id: 3, name: "Michael Johnson", age: 45, country: "Canada" },
    { id: 4, name: "Emily Davis", age: 32, country: "Australia" }
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
         
            <TableRow >
              <TableCell className={styles.fixincell}>
                As provided by the fundhouse documents, this risk is specifice to this fund category (Equity). To know the risk of this fund perticularly , check 'Risk Vs Category'
              </TableCell>
              <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
              {fundScheme[0] && <RiskProfile fundInfoData={fundInfoData} fundValue={fundScheme[0].fundInfo}></RiskProfile>}
               {/* <div className={styles.riskratings}>Medium</div> */}
              </TableCell>
              <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
              {fundScheme[1] && <RiskProfile fundInfoData={fundInfoData} fundValue={fundScheme[1].fundInfo}></RiskProfile>}
              {/* <div className={styles.riskratings}>Medium</div> */}
              </TableCell>
              {/* <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')}>
              
            </TableCell> */}
            <TableCell className="bxshadowfortd whitbacks new18per">
              {fundScheme[2] && <RiskProfile fundInfoData={fundInfoData} fundValue={fundScheme[2].fundInfo}></RiskProfile>}
            </TableCell>
            <TableCell className="bxshadowfortd whitbacks new18per">
              {fundScheme[3] && <RiskProfile fundInfoData={fundInfoData} fundValue={fundScheme[3].fundInfo}></RiskProfile>}
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RiskProfileInModelPortfolio;
