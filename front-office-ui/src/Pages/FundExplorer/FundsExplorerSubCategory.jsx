import React from 'react'
import { Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@mui/system/styled';
import Backbtn from '../../Common/FormComponent/Backbtn';
import innersboxhover from '../../images/innersboxhover.png';
import manstanding from '../../images/manstanding.png';
import wp from '../../images/wp.png';
import api from '../../APIs/interceptor';
import link from '../../images/link.png';
// import SearchAutocomplete from './SearchAutocomplete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useParams } from "react-router-dom";
import Carosole1 from './Carosole1'
import Testimonials from './Testimonials'
import boximg from '../../images/boximg.png';
// import TopBar from './TopBar'

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',

}));


const FundExplorerSubCategory = () => {
  const navigate = useNavigate();
  const { category } = useParams(); // Get category from URL
  const [subCategories, setSubCategories] = useState([]);

  // -------------------------Fetching Sub Categories--------------------
  const getSubCategories = () => {
    api.post('/fundExplorer/getFundSegregatorDetail', {
      "productClass": "Fund"
    }).then((response) => {
      const filteredSubCategories = response.data.data
        .filter((item) => item.category === category)
        .map((item) => item.subCategory);

      setSubCategories(filteredSubCategories);

    });
  }
  useEffect(() => {
    getSubCategories()
  }, [category])
  // ---------------------Back button Navigation------------
  const handleBackButton = () => {
    navigate(`/fundExplorer`);
  };

  function search(e) {
    e.preventDefault()
    setQuery(e.target.value)

  }
  return (
    <Box>

      {/* <TopBar></TopBar> */}
      <div>
        <div className='newspacesinblock1'>
          {/* <div className='uppersear '>
            <div className='herar'>
              <span className='activetabs'>Home -{'>'}</span><span className='activetabs'>Equity -{'>'}</span><span className='inactivetabs'>Mutual Fund</span>

            </div>

            <Backbtn onClick={() => handleBackButton()} className="backbtn" label={
              <div>
                <ArrowBackIosIcon className='bckbtn' /> Back
              </div>
            } ></Backbtn>

          </div> */}
          <div className='uppersear '>
            <div className='herar'>
              <span className='activetabs'>Home -{'>'}</span><span className='activetabs'>Equity -{'>'}</span><span className='inactivetabs'>Mutual Fund</span>

            </div>

            <Backbtn onClick={() => handleBackButton()} className="backbtn" label={
              <div>
                <ArrowBackIosIcon className='bckbtn' /> Back
              </div>
            } ></Backbtn>

          </div>
          <Grid container spacing={2} className="width100">
            <div className="width50">

              <div className='width50'>{category}</div>


            </div>

          </Grid>
          {/* -------------------Sub Categories---------------------- */}
          <Grid container spacing={2}>
            {subCategories.map((subCategory, index) => (
              <Grid key={index} size={{ xs: 12, md: 6, lg: 2.4, sm: 12 }}>
                <Item className="hoveffects minscchei">
                  <div>
                    <img src={innersboxhover} alt={subCategory} />
                  </div>
                  <div className="whitecssnew">{subCategory}</div>
                </Item>
              </Grid>
            ))}
          </Grid>

        </div>


        <div className='fullw whitebackfrdiv'>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 12, lg: 12, sm: 12 }}>
                <Item>
                  <div className='manimgbox'>
                    <div className='stndman twentcss'><img src={manstanding} /></div>
                    <div className='fortycss speechdiv'>
                      <div className='alintxtnote'>
                        <div className='lagfont1'>Note</div>
                        <div className='newspacetb'><b>a)</b> Values should be displayed based on Category selected. Kindly refer to the table for value</div>
                        <div className='newspacetb'><b>b)</b> If the category is not selected, then user should be able to explore funds accross categories </div>
                        <div className='newspacetb'><b>c)</b> If the subcategory is not selected, then user should be able to explore funds accross sub categories </div>
                      </div>
                    </div>
                    <div className='fortycss1'>
                      <table>
                        <tr>
                          <td className='lagfont'>Realted Blogs</td>
                          <td><img src={wp} /></td>
                          <td><img src={link} /></td>
                        </tr>
                      </table>

                      <div><img src={boximg} className='imgfullwid' /></div>
                    </div>
                  </div>
                  <div className='tableborder'></div>
                </Item>
              </Grid>
              <Grid size={{ xs: 12, md: 12, lg: 8, sm: 12 }} >
                <Item>
                  <div className='lagfont lefttextalign newspacesinblock1' >Investment Calculator</div>
                  <Carosole1></Carosole1>
                </Item>
              </Grid>

              <Grid size={{ xs: 12, md: 12, lg: 4, sm: 12 }}>
                <Item>
                  <div className='lagfont lefttextalign leftme35'>View 15+ Mutual Fund Partners</div>
                  <Testimonials></Testimonials>
                </Item>
              </Grid>

            </Grid>
          </Box>
        </div>
      </div>
    </Box>
  )
}

export default FundExplorerSubCategory


