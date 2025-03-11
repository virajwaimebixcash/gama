import * as React from 'react';
import Box from '@mui/material/Box';
import { Container, Paper } from '@mui/material';
import leftimage from '../../images/leftimg.png';
import LoginHeader from './LoginHeader';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

export const LandingPage = () => {
  return (
    <div>
      <Container component="main" maxWidth="md" >
        <LoginHeader />
        <Paper elevation={3} sx={{ mt: 3, p: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <img src={leftimage} className='leftimg' alt="leftimage" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Outlet />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </div>
  )
}

export default LandingPage;