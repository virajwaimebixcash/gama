import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import MyButton from '../../Common/FormComponent/MyButton';
import Grid from '@mui/material/Grid2';
import { loginViaMobileSchema } from "../../schemas/loginMobile"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/actions/actionCreators';
import CustomAlert from '../../Common/CustomComponents/CustomAlert';
import { getLocalIP } from '../../utils/UtilityFunctions';

export const LoginMobile = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcon, setAlertIcon] = useState('success');
  const [ip, setIp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(loginViaMobileSchema)
  });

  const handleUserIDLoginClick = () => {
    navigate('/loginuser');
  }
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleOtpPage = () => {
    navigate('/otp')
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
      userName: "",
      password: "",
      mobileNumber: data.mobile,
      loginMode: "MobileNumber",
      // loginMethod: "MobileNumber",
      hostName: window.location.hostname,
      ipAddress: ip
    }
    dispatch(actionCreators.validateLogin(body,false,navigate))
      .then((res) => {
        setAlertOpen(true);
        setAlertMessage(res.data.message)
      })
      .catch((error) => {
        const apiErrorMessage = error;

        setError("mobile", {
          type: "manual",
          message: apiErrorMessage,  // Append both errors

        });
      });
  };


  return (
    <div>
      <Grid size={{ xs: 12, md: 12 }}>
        <div className='center'>
          <h3>Client Login</h3><p>Take your first step towards getting Wealthy</p>
        </div>
        <Box component="form" noValidate sx={{ mt: 1 }}
         onSubmit={handleSubmit(onSubmit)} 
         className='logintxt'>
          <TextField
            variant="outlined"
            margin="normal"
            inputProps={{ maxLength: 10 }}
            required
            type='text'
            fullWidth
            id="mobile"
            label="Enter Mobile No"
            name="mobile"
            autoComplete="mobile"
            autoFocus
            {...register('mobile')}
            error={!!errors.mobile}
            helperText={
              errors.mobile?.message && (
                <span className="custom-error">{errors.mobile.message}</span>
              )
            }
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
          />
          <MyButton label="Send OTP" type="submit" />
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
          <Grid container>
            <Grid className='left'>
              <Button href="#" variant="text" size="small" className='textnorm' onClick={handleUserIDLoginClick}>
                <b>Login With User ID </b>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <CustomAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        text={alertMessage}
        icon={alertIcon}
        confirmButtonText="OK"
        cancelButtonText="Cancel"
        allowOutsideClick={false}
        width="40vw"
        onConfirmButton={
          handleOtpPage}
      />
    </div>
  )
}

export default LoginMobile;