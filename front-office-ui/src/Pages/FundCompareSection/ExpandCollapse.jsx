import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper

} from "@mui/material";
// import "../../styles/FundCompare.css"
import styles from "../../styles/FundCompare.module.css";
import ExpandedTabs from './ExpandedTabs';
import user1 from '../../images/user1.png';
import user2 from '../../images/user2.png';
import close1 from '../../images/close1.png';
import plusintable from '../../images/plusintable.png';
import Button from '@mui/material/Button';
import FundComparePopup from "./FundComparePopup";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/actions/actionCreators";

export default function ExpandCollapse({schemeCode,setSchemeCode}) {
  const dispatch = useDispatch();
  const fundConfig = useSelector((state) => state.getFundCompareConfig.configInfo);
  const [open, setOpen] = useState(false);
  const selectedSearchedValue = useSelector((state) => {
    const data = state.getSchemeList.data;
    return Array.isArray(data) && data.length === 1 ? data[0] : null;
  });

  // Function to add a security
  const handleAddSecurity = (newSecurity) => {
    if (
      schemeCode.length < 4 &&
      !schemeCode.some(sec => sec.SchemeCode === newSecurity.SchemeCode)
    ) {
      setSchemeCode([...schemeCode, newSecurity]);
    }
    // setOpen(false);
  };

  // Function to remove a security
  const handleRemoveSecurity = (schemeCodeId) => {
    setSchemeCode(schemeCode.filter(security => security.SchemeCode !== schemeCodeId));
  };

  useEffect(() => {
    dispatch(actionCreators.GetSchemeList(null, true));
  }, [dispatch]);

  // Automatically add selected searched value if available
  useEffect(() => {
    if (
      selectedSearchedValue &&
      !schemeCode.some(sec => sec.SchemeCode === selectedSearchedValue.SchemeCode)
    ) {
      setSchemeCode([...schemeCode, selectedSearchedValue]);
      setOpen(false)
    }
  }, [selectedSearchedValue]);

  return (

    <TableContainer component={Paper} className={styles.expandCollapse} >
    <Table stickyHeader className="fixed-table maintablecompare">
      <TableHead>
        {/* <TableCell className=" bxshadowfortd fixincell"> */}
        <TableCell className={[styles.fixincell, 'bxshadowfortd'].join(' ')}>
          <div className={styles.headersintabel}>{fundConfig?.fundCompare?.screenHeaderName} <br /> based on various parameter</div>
        </TableCell>
{/* Dynamically Added Securities */}
        {schemeCode.map((security) => (
        <TableCell  key={security.SchemeCode} className={[styles.whitbacks, styles.new18per,'leftsizeincell', 'leftsizeincell'].join(' ')} >
          <table className={[styles.fullw, styles.whitbacks,].join(' ')}>
            <tr className={[styles.fixheig, styles.whitbacks,].join(' ')}>
              <td><img src={user1} /></td>
              <td>{security.SchemeName}</td>
              <td colSpan={3}  className={[styles.heifornoclose, 'texright','minheis'].join(' ')}><img src={close1}  alt="Remove" onClick={() => handleRemoveSecurity(security.SchemeCode)} style={{ cursor: "pointer" }} /></td>
            </tr>
            <tr className={styles.whitbacks} >
              <td colSpan={3} className={styles.texcenter}>
                <Button variant="contained" color="secondary" className={styles.fundcombtn} >
                  View
                </Button>

              </td>
            </tr>
          </table>
        </TableCell>
        ))}
      {schemeCode.length < 4 &&
            Array(4 - schemeCode.length)
              .fill(null)
              .map((_, index) => (
        <TableCell className={[styles.whitbacks, styles.new18per, 'bxshadowfortd'].join(' ')} >
          <table className={[styles.whitbacks,styles.fullw].join(' ')} >
            <tr className={[styles.whitbacks,styles.fixheig ].join(' ')} >
              <td className={styles.texcenter}><img src={plusintable} /></td>
            </tr>
            <tr className={styles.whitbacks}>
              <td colSpan={3} className={styles.texcenter}>
              <FundComparePopup setOpen={setOpen} open={open} onAddSecurity={handleAddSecurity} />
              </td>
            </tr>
          </table>
        </TableCell>
           ))}
     

      </TableHead>
      <TableBody sx={{backgroundColor:"#ecebeb"}}>
        <TableRow >

          <TableCell colSpan={7} className={styles.zeropadsinout}>
          {schemeCode.length &&  <ExpandedTabs />}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

  </TableContainer>
  );
}
