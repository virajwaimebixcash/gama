import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { actionCreators } from '../../redux/actions/actionCreators';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import userDetails from '../../APIs/userDetails';

const LogoutPage = () => {

  const dispatch = useDispatch();
  const handleLogout = async () => {
    const userName = await localStorage.getItem('UserName');

    const body = {
      userName: userName,
      isSessionExpired: false
      //  token: getToken,
    }

    dispatch(actionCreators.validateLogout(body)).then(() => {
      dispatch(actionCreators.validateLogin(null, true))
      localStorage.removeItem('token');
      localStorage.removeItem('UserName');
      userDetails.setToken('')
      //   window.location.href = '/';
    })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <Grid size={{ xs: 12, lg: 12, xl: 12 }}>
          <Grid container direction="column" alignItems="center">
            <Grid>
              <Typography variant="h1" align="center" sx={{ fontSize: '3rem', marginBottom: '1rem' }}>
                Logout page
              </Typography>
            </Grid>
            <Grid>
              <Button onClick={handleLogout} variant="h4" align="center" fontWeight="bold">
                logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LogoutPage;
