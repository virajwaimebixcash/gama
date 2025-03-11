import React, { useState } from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ScrollTableInside from './ScrollTableInside';
import RiskProfileInModelPortfolio from './RiskProfileInModelPortfolio';
// import TrailingReturns from '../Security/SecurityViewWidgets/TrailingReturn';
import TrailingReturns from './TrailingReturns';
import ActualComparison from './ActualComparison';
import SectorWeightInCompare from './SectorWeightInCompare';
import TopHoldingsList from './TopHoldingList';
import DividentHistoryCompare from './DividentHistoryCompare';
import RiskAnalysisCompare from './RiskAnalysisCompare';
import styles from "../../styles/FundCompare.module.css"
import { useSelector } from "react-redux";


export default function ExpandedTabs() {
  const fundConfig = useSelector((state) => state.getFundCompareConfig.configInfo);
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getWidget = (widgetName) => {
    if(fundConfig?.data){
      const widget = fundConfig.data.find(item => item.widgetName === widgetName);
      return widget ? JSON.parse(JSON.stringify(widget)) : null;

    }
  };

  const sections = [
    { title: "Fund Overview Comparison", component: <ScrollTableInside fundInfoData={getWidget("2FundInfo")} />, key: "fundOverview" },
    { title: "Risk Profile", component: <RiskProfileInModelPortfolio fundInfoData={getWidget("RiskoMeter")} />, key: "riskProfile" },
    { title: "Trailing Returns (%)", component: <TrailingReturns fundInfoData={getWidget("TrailingReturn")} />, key: "trailingReturns" },
    { title: "Comparison (%)", component: <ActualComparison fundInfoData={getWidget("FundAlloAssetWise")} />, key: "comparison" },
    { title: "Sector Weight", component: <SectorWeightInCompare fundInfoData={getWidget("SectorSecurityWiseHolding")} />, key: "sectorWeight" },
    { title: "Top Holdings (%)", component: <TopHoldingsList fundInfoData={getWidget("SectorSecurityWiseHolding")} />, key: "topHoldings" },
    { title: "Dividend History", component: <DividentHistoryCompare />, key: "dividendHistory" },
    { title: "Risk Analysis", component: <RiskAnalysisCompare fundInfoData={getWidget("RiskAnalysis")} />, key: "riskAnalysis" },
  ];

  return (
    <Box className={styles.boxMargin}>
      {/* Header with Name (Left) and Arrow (Right) */}

      {sections.map(({ title, component, key }) => (
        <div key={key}>
          <Button
            fullWidth
            onClick={() => toggleSection(key)}
            className={styles.expandedTabs}
          >
            <span>{title}</span>
            {openSections[key] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Button>
          <Collapse in={openSections[key]} timeout="auto">
            <Box className={styles.bgCollapse}>{component}</Box>
          </Collapse>
          <div className={styles.gapsbtwcomparetabs}></div>
        </div>
      ))}
       
    </Box>
  );
}
