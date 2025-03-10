import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MainRebalancings from './MainRebalancings';
import PaginationComponent from '../../Common/CustomComponents/Pagination';
import { Button } from "@mui/material";
import "../../styles/PortfolioRebalance.css"
import { useNavigate } from "react-router-dom";
import api from "../../APIs/interceptor";
const PortfolioRebalancingMain = () => {
  const navigate = useNavigate();
  const [modelListingData, setModelListingData] = useState({ records: [], totalRecord: 0 });
  const [radioValues, setRadioValues] = useState('');
  const [payload, setPayload] = useState({
    "modelType": 1,
    "searchModelName": "",
    "pageNum": 1,
    "pageSize": 10
  });

  useEffect(() => {
    fetchListingData()

  }, [payload])

  const fetchListingData = () => {
    api.post('/ModelPortfolio/getAllModelPortfolioList',
      payload).then((response) => {
        setModelListingData(response.data.data);
      });
  }

  console.log(modelListingData,modelListingData.records.find(item => item.modelPortfolioId === radioValues),radioValues, "fetchListingData")
  const handleGenerateDeviation = () => {
    navigate("/rebalancingSummary", { state: { selectedModel: modelListingData.records.find(item => item.modelPortfolioId === Number(radioValues)) } })
  }
  return (
    <>
      <div className="newspacesinblock1">
        <div className='uppersearport '>
          <div className='herar'>
          </div>
          <div className='width50'>Portfolio Rebalancing</div>
        </div>
        <div> <div className="whitcolbg">
          <div className=' fullw fon60012'>Select Model</div>
          <div className="rebalbox"><MainRebalancings setRadioValues={setRadioValues} radioValues={radioValues} modelListingData={modelListingData} payload={payload} setPayload={setPayload}></MainRebalancings></div>

        </div>
          <div className="tententwenty">
            <Button variant="contained" className="Generatebtn opcthalf" sx={{ float: 'left' }}>
              Cancel
            </Button>
            <Button variant="contained" className="Generatebtn"
            disabled={!radioValues}
            sx={{ float: 'left', m: 1 }} onClick={handleGenerateDeviation}>
              Generate Deviation
            </Button>
          </div>
        </div>
        <div class="pagin">
          <PaginationComponent modelListingData={modelListingData} payload={payload} setPayload={setPayload}></PaginationComponent>

        </div>
      </div></>
  );
};

export default PortfolioRebalancingMain;
