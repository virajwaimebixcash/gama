import { Box, Breadcrumbs, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import Backbtn from '../../Common/FormComponent/Backbtn';
import api from '../../APIs/interceptor';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styled from '@mui/system/styled';
import innersboxhover from '../../images/innersboxhover.png';
import FundExplorerFooter from './FundExplorerFooter';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/actions/actionCreators';
import dayjs from 'dayjs';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
  cursor: 'pointer',
}));

const today = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

const FundsExplorer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [levelData, setLevelData] = useState([]);
  const [currentData, setCurrentData] = useState([]); // Current displayed categories
  const [breadcrumbs, setBreadcrumbs] = useState([]); // Breadcrumb trail

  // Fetch initial data
  const getCategories = async () => {
    try {
      const response = await api.post('/fundExplorer/getFundSegregatorDetail', {
        productClassId: 1,
      });
      const data = response?.data?.data?.levelData || [];
      setLevelData(data);
      setCurrentData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getSeggregatorKeys = (customBreadcrumbs = breadcrumbs) => {
    const keys = {};

    customBreadcrumbs.forEach((crumb) => {
      if (crumb?.levelDispatcher && crumb.levelValue) {
        keys[crumb.levelDispatcher] = crumb.levelValue;
      }
    });

    return keys;
  };


  // Handle category click and update breadcrumb & data
  const handleCategoryClick = (category) => {
    if (category.childData.length <= 0) {
      const updatedBreadcrumbs = [...breadcrumbs, category];
      const body = {
        "clientCode": "35",
        "userId": "integra",
        "transactionType": 2,
        "searchString": "",
        "lastBusinessDate": today,
        "getData": 1,
        "schemeCode": "",
        "multipleSchemeCode": 0,
        ...getSeggregatorKeys(updatedBreadcrumbs)
      };

      Promise.all([dispatch(actionCreators.GetFundUniverseData(body))]).then(() => {
        navigate('/fundExplorerThree', { state: { ...getSeggregatorKeys(updatedBreadcrumbs) } });
      });

      return;
    }

    setBreadcrumbs((prev) => [...prev, category]);
    setCurrentData(category.childData || []);
  };


  const handleBreadcrumbClick = (index) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);
    setCurrentData(newBreadcrumbs[index]?.childData || levelData);
  };

  const handleBackButtonClick = () => {
    if (breadcrumbs.length === 0) {
      navigate('/dashboard'); // Go to the dashboard if no breadcrumbs exist
    } else {
      const newBreadcrumbs = breadcrumbs.slice(0, -1);
      setBreadcrumbs(newBreadcrumbs);
      setCurrentData(newBreadcrumbs.length > 0 ? newBreadcrumbs[newBreadcrumbs.length - 1].childData : levelData);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Box>
      <div className="newspacesinblock1">
        {/* Breadcrumb Navigation */}
        <div className='uppersear '>
          <Breadcrumbs separator="›" aria-label="breadcrumb" className='herar'>
            <Link
              underline="hover"
              color="inherit"
              onClick={() => {
                setBreadcrumbs([]);
                setCurrentData(levelData);
              }}
              style={{ cursor: 'pointer' }}
            >
              Dashboard
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <Link
                key={index}
                underline="hover"
                color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
                onClick={() => handleBreadcrumbClick(index)}
                style={{ cursor: 'pointer' }}
              >
                {crumb.levelValue}
              </Link>
            ))}
          </Breadcrumbs>

          <Backbtn
            className="backbtn"
            label={
              <div>
                <ArrowBackIosIcon className="bckbtn" /> Back
              </div>
            }
            onClick={handleBackButtonClick}
          />
        </div>

        {/* Dynamic Header */}
        <Grid container spacing={2} className="width100">
          <div className="width50">
            <h3 className='width50'>Explore {breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].levelValue : 'Fund'}</h3>
          </div>
        </Grid>

        {/* Category Display */}
        <Grid container spacing={2}>
          {currentData.map((category, index) => (
            <Grid key={index} size={{ xs: 12, md: 6, lg: 2.4, sm: 12 }}>
              <Item onClick={() => handleCategoryClick(category)} className="hoveffects minscchei">
                <div>
                  <img src={innersboxhover} alt={category.levelValue} />
                </div>
                <div className="whitecssnew">{category.levelValue}</div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </div>
      <FundExplorerFooter />
    </Box>
  );
};

export default FundsExplorer;
