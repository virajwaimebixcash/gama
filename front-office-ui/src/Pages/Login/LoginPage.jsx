import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import MyButton from '../../Common/FormComponent/MyButton';
import Grid from '@mui/material/Grid2';
import { loginSchema } from "../../schemas/login"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/actions/actionCreators';
import CustomAlert from '../../Common/CustomComponents/CustomAlert';
import { useEffect, useState } from 'react';
import { getLocalIP } from '../../utils/UtilityFunctions';

const LoginPage = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcon, setAlertIcon] = useState('error');
  const [ip, setIp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const handleMobileLoginClick = () => {
    navigate('/loginmobile');
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

 
  // useEffect(() => {
  //   getLocalIP()
  //     .then((ipAddress) => setIp(ipAddress))
  //     .catch((error) => console.error('Failed to get IP address:', error));
  // }, []);
  useEffect(() => {
    getLocalIP()
      .then((ipAddress) => {
        setIp(ipAddress);
        localStorage.setItem("userIP", ipAddress); // Save IP in local storage
      })
      .catch((error) => console.error('Failed to get IP address:', error));
  }, []);
  


  const onSubmit = (data) => {
    const body = {
      userName: data.username,
      password: data.password,
      mobileNumber: "",
      loginMode: "UserName",
      // loginMethod: "UserName",
      hostName: window.location.hostname,
      ipAddress: ip
    }
    dispatch(actionCreators.validateLogin(body,false,navigate))
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorMessage = error;


      // Determine which field to set the error for
      if (errorMessage.includes('Username')) {
        setError("username", {
          type: "manual",
          message: errorMessage, // Set error message for username
        });
      } else if (errorMessage.includes('password')) {
        setError("password", {
          type: "manual",
          message: errorMessage, // Set error message for password
        });
      } else {
        // Fallback if the message does not contain known keywords
        setError("username", {
          type: "manual",
          message: errorMessage, // Optionally set a generic error
        });
      }

      });
  };


  return (
    <Grid size={{ xs: 12, md: 12 }}>
      <div className='center'>
        <h3>Client Login</h3><p>Take your first step towards getting Wealthy</p>
      </div>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)} className='logintxt'>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          inputProps={{ maxLength: 50 }}
          autoFocus
          {...register('username')}
          error={!!errors.username}
          helperText={
            errors.username?.message && (
              <span className="custom-error">{errors.username.message}</span>
            )
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          inputProps={{ maxLength: 50 }}
          {...register('password')}
          error={!!errors.password}
          helperText={
            errors.password?.message && (
              <span className="custom-error">{errors.password.message}</span>
            )
          }
        />
        <MyButton label="Sign In" type="submit" />
        <Grid container>
          <Grid size={{ xs: 12, md: 5, lg: 5 }}>
            <Button href="#" variant="text" size="small" className='textnorm'>
              Forgot password?
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 7, lg: 7 }}>
            <Button href="#" variant="text" size="small" className='textnorm'>
              {"Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
        <Grid container className='left'>
          <Grid>
            <Button href="#" variant="text" size="small" className='textnorm' onClick={handleMobileLoginClick}>
              <b>Login With Mobile No. </b>
            </Button>
          </Grid>
        </Grid>
      </Box>
      <CustomAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        text={alertMessage}
        icon={alertIcon}
        confirmButtonText="OK"
        cancelButtonText="Cancel"
        allowOutsideClick={false}
        width="40vw"
      />
    </Grid>

  );
};

export default LoginPage;
