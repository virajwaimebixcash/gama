import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import newsort from '../../images/newsort.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Backbtn from '../../Common/FormComponent/Backbtn';
import SearchAutocomplete from '../../Pages/Security/SearchAutocomplete';
import DropdownWithCount from './DropdownWithCount';
import FilterComponent from '../../Common/CustomComponents/FilterComponent';
import Pagination from '../../Common/CustomComponents/Pagination';
import api from '../../APIs/interceptor';
import UniversalFundExplorerCard from './UniversalFundExplorerCard';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/actions/actionCreators';
import { today } from '../../utils/commonFunction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const sortOrder = 'desc';

export default function FundsExplorerThree() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [selectedSecurities, setSelectedSecurities] = useState([]);
  const [cardConfig, setCardConfig] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const fundUniverseData = useSelector((state) => state.getFundUniverseData.data);

  const getFundUniverseFieldDetails = () => {
    api.post('/fundExplorer/getFundUniverseFieldDetail', {
      "productClassId": 1
    }).then((res) => {
      setCardConfig(res.data.data)
    });
  }

  const getCards = () => {
    const sortingField = cardConfig.find(config => config.isSortingEnable === 'Y')?.fieldName;

    const sortedData = sortingField
      ? [...fundUniverseData].sort((a, b) => {
        const valueA = a[sortingField] || 0;
        const valueB = b[sortingField] || 0;
        return sortOrder === 'asc' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
      })
      : fundUniverseData;


    return sortedData.map((item, index) => (
      <UniversalFundExplorerCard key={index} cardConfig={cardConfig} cardData={item} selectedSecurities={selectedSecurities} setSelectedSecurities={setSelectedSecurities} />
    ));
  };

  const getUniverseData = () => {
    const body = {
      "clientCode": "35",
      "userId": "integra",
      "transactionType": 2,
      "searchString": "",
      "lastBusinessDate": today,
      "getData": 0,
      "schemeCode": "",
      "multipleSchemeCode": 0,
      ...location.state,
      ...filterValues
    };

    dispatch(actionCreators.GetFundUniverseData(body));
  }

  useEffect(() => {
    getFundUniverseFieldDetails()
  }, [])

  return (

    <div className="containersimple">
      <div className='uppersearnew '>
        <div className='herar newherar'>
          <span className='activetabs'>Home -{'>'}</span>
          <span className='activetabs'>Equity -{'>'}</span>
          <span className='inactivetabs'>Mutual Fund</span>
        </div>
        <div className='minswhitefunds'>
          <div className='searchbxcenter1 centersearchbx'><SearchAutocomplete /></div>
        </div>

        <div className='filtersicons'>
          <div className='padsforupicons countcsscode'>
            <DropdownWithCount
              selectedSecurities={selectedSecurities}
              setSelectedSecurities={setSelectedSecurities}
            />
          </div>
          <div className='padsforupicons1'>
            <img src={newsort} />
          </div>
          <div className='padsforupicons'>
            <FilterComponent
              tableConfig={cardConfig}
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              getData={getUniverseData}
              requireFilter={true}
            />
          </div>
        </div>
        <Backbtn className="backbtn" label={
          <div>
            <ArrowBackIosIcon className='bckbtn' /> Back
          </div>
        } />

      </div>
      <div className="newspacsecuview">
        <div className='subgraycol'>
          Large Cap Funds<span className='lbltxt'> -  Best Performing Funds</span>
        </div>
      </div>
      <div className='tabfullwids'>
        {getCards()}
      </div>
      <div className="clear" />
      <div className="pagin">
        <Pagination />
      </div>

      <div className='spacfornotify'>
        <p className='noticss'>
          <b className='intxts'>Note :</b>
          On selection of MF scheme , all scheme details (as per signed off Security View User story) should be displayed to user allongwith provision to invest in security<br />
          If user click on the bookmark icon in column K, then this fund should added in respective product watchlist<br />
          A message prompt should be displayed on the screen width following message upon bookmarking or removing the fund from watchlist
        </p>
      </div>

      <ol type="a">
        <li>
          <p>This fund is added to your watchlist</p>
        </li>
        <li>
          <p>This fund has been removed from your watchlist</p>
        </li>
      </ol>
    </div>
  );
}

