import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import Sortdropdown from './Sortdropdown';
import AccordionUsage from './AccordionUsage';
import peer from "../../../images/peer.png";
import api from '../../../APIs/interceptor';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',

}));

const MoreFunds = ({ fundInfoData, fundValue }) => {
  const [fundData, setMoreFundData] = useState([]);
  const [moreFundScheme, setMoreFundScheme] = useState([]);
  const widgetDetails = fundInfoData?.widgetDetail || [];
  const clientCode = import.meta.env.VITE_CLIENT_CODE;
  const selectedSearchedValue = useSelector((state) => {
    const data = state.getSchemeList.data;
    return Array.isArray(data) && data.length === 1 ? data[0] : null;
  });
  const navigation = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.post('/schemes/FundDetails', {
          "schemeCode": selectedSearchedValue.SchemeCode,
          "mwiclientCode": clientCode,
          "category": fundValue?.Category,
          "issuerCode": fundValue?.IssuerCode,
          "topSecurity": 0,
          "isSortedbyAUM": 0,
        });
        setMoreFundData(res.data || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setMoreFundData([]); // Fallback to empty array
      }
    };

    fetchData();
    fetchSchemeFunds();
  }, []);
  const fetchSchemeFunds = async () => {

    try {
      const res = await api.post('/schemes', {
        "clientCode": clientCode,
        "userId": "integra",
        "transactionType": 1,
        "searchString": "",
        "lastBusinessDate": "2025-02-20T13:23:03.942Z",
        "getData": 1,
        "schemeCode": selectedSearchedValue.SchemeCode,
        "issuerCode": fundValue?.IssuerCode,
        "MultipleSchemeCode": "",
        "Category": "",
        "SubCategory": "",

        // "schemeCode": selectedSearchedValue.SchemeCode,
        // "clientCode": clientCode,
        // "category": fundValue?.Category,
        // "issuerCode": fundValue?.IssuerCode,
        // "topSecurity":0,
        // "isSortedbyAUM": 0, 
        // getData: 1
      });
      setMoreFundScheme(res.data || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
      setMoreFundData([]); // Fallback to empty array
    }
  };
  const clickOnMoreFunds = () => {
    dispatch({
      type: "ADD_FUND_UNIVERSE_DATA",
      payload: moreFundScheme
    });
    navigation(`/fundExplorerThree`)
  }

  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
      <Item className='fixheights mostly-customized-scrollbar'>
        <div className='fullsize logospac '>
          <div><div className="peer12"><div className="texleft"><img src={peer} /></div></div>
            <div className="width60 peerbotbor">
              <div className="wid54">
                <div className="texleft">
                  <span className="padmeleftheader">{fundInfoData?.widgetDisplayName}</span>
                  <span className='subfont'> </span>
                </div>
              </div>
              {/* <div className='wid15'>
                Sort By:
              </div>
              <div className='wid20'><Sortdropdown></Sortdropdown></div> */}
            </div>

            <div className='peerbotbor'>
              <Grid container spacing={0} >
                {widgetDetails.map((item) => (
                  <Grid
                    key={item.morefundsConfigId}
                    minHeight={10}
                    size={{ xs: 6, sm: 6, md: 6, lg: 6 }}
                  >
                    <Item>
                      <div className="newth12">{item?.fieldDisplayName}</div>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className="container">
              <AccordionUsage clickOnMoreFunds={clickOnMoreFunds} data={fundData} />
            </div>
          </div>
        </div>

      </Item>
    </Grid>
  )
}

export default MoreFunds