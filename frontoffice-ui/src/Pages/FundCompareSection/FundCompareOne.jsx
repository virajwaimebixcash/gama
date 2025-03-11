import React, { useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Backbtn from '../../Common/FormComponent/Backbtn';
import ExpandCollapse from './ExpandCollapse';
import styles from "../../styles/FundCompare.module.css"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/actions/actionCreators";


const mutualFunds = [
    {
        id: 1,
        name: "SBI Bluechip Fund",
        risk: "Moderate",
        return: "12.5% (3Y CAGR)",
        expenseRatio: "1.2%",
        aum: "₹20,000 Cr",
        details: "This is a large-cap fund investing in stable blue-chip companies."
    }
];

export default function FundCompare() {
    const dispatch = useDispatch();
    const location = useLocation();
    const peerCompareData = location.state?.selectedData || []; // Default to empty array if undefined
    const [openRow, setOpenRow] = useState(null);
    const [schemeCode, setSchemeCode] = useState(peerCompareData || []);
    const fundConfig = useSelector((state) => state.getFundCompareConfig);
    const fundScheme = useSelector((state) => state.getFundCompareScheme);

    useEffect(() => {
        dispatch(actionCreators.GetFundCompareConfig({}))
            .then(() => dispatch(actionCreators.GetFundCompareScheme(schemeCode.map(sec => sec.SchemeCode))))
            .catch((err) => console.error("Error fetching fund data:", err));

    }, [dispatch, schemeCode]);

    useEffect(() => {
        if (peerCompareData.length) {
            setSchemeCode(peerCompareData)
        }
    }, [peerCompareData])

    const handleToggle = (id) => {
        setOpenRow(openRow === id ? null : id);
    };

    return (
        <>

        <div className={styles.uppersearnew}>
            <div className={[styles.herar, styles.newherar].join(' ')}>
                <span className='activetabs'>Home -{'>'}</span><span className='activetabs'>Equity -{'>'}</span><span className='inactivetabs'>Mutual Fund</span>
            </div>
           
            <Backbtn className="backbtn" label={<div>
                <ArrowBackIosIcon className='bckbtn' /> Back
            </div>}></Backbtn>

        </div>
        {!(fundConfig.isLoading && fundScheme.isLoading) && (
        <div className={styles.newspacesinblock1}>
            <ExpandCollapse setSchemeCode={setSchemeCode} schemeCode={schemeCode} />
            </div>
        )}
    </>
    );
}
