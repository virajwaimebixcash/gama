import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import risk from "../../../images/risk.png";
import arrowr from "../../../images/arrowr.png";
import { Tooltip } from '@mui/material';
import exlamatiom from "../../../images/excla.png";

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

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
    value: fundValue?.[item?.dispatcherName] != null ? fundValue?.[item?.dispatcherName] : '--',
  }));
};

const RiskAnalysis = ({ fundInfoData, fundValue }) => {
  const riskAnalysisData = createRiskAnalysisSkeleton(fundInfoData?.widgetDetail, fundValue);

  return (
    <div className="bcwhite1">
      <div className="min45">
        <div className="width101">
          <div className="texleft">
            <img src={risk} alt="Risk Icon" />
          </div>
        </div>
        <div className="wid90">
          <div className="texleft">{fundInfoData?.widgetDisplayName || 'Risk Analysis'}</div>
        </div>
      </div>
      <div className="width100">
        {riskAnalysisData.map((item, index) => (
          <div className="row" key={index}>
            <div className="oneforth1">
              <span>
                <img src={arrowr} alt="Arrow Icon" />
              </span>
              <span className="mainheadcss">{item.fieldDisplayName}<span>

                {item.description && <Tooltip title={item.description}>
                  <img src={exlamatiom} alt="icon" />
                </Tooltip>}
              </span></span>
            </div>
            <div className="oneforth">
              <span className="highlight1">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskAnalysis;
