import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import LoginHeader from './LoginHeader';
import MyButton from '../../Common/FormComponent/MyButton';
import Footer from './Footer';
import { validateOtpSchema } from "../../schemas/loginMobile"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux/actions/actionCreators';
import CustomAlert from '../../Common/CustomComponents/CustomAlert';
import { getLocalIP } from '../../utils/UtilityFunctions';

export const Otp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcon, setAlertIcon] = useState('success');
  const getMobileNumber = useSelector((state) => state.validateLogin.data);
  const [ip, setIp] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm({
    resolver: yupResolver(validateOtpSchema)
  });

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts at 60 seconds
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  // Ref for OTP input field
  const otpRef = useRef(null);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    getLocalIP()
      .then((ipAddress) => setIp(ipAddress))
      .catch((error) => console.error('Failed to get IP address:', error));
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId); // Cleanup timer on component unmount
    } else {
      setIsResendEnabled(true); // Enable the "Resend OTP" button when the timer ends
    }
  }, [timeLeft]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const onSubmit = (data) => {
    const body = {
      mobileNumber: getMobileNumber.mobileNumber,
      otp: data.otp,
      hostName: window.location.hostname,
      ipAddress: ip
    }
    // setShowLoader(true);
    dispatch(actionCreators.validateLoginOtp(body,navigate))
      .then((res) => {
        // navigate('/dashboard');
        // setShowLoader(false)
      })
      .catch((error) => {
        const apiErrorMessage = error;

        setError("otp", {
          type: "manual",
          message: apiErrorMessage,  // Append both errors
        });
      });
  };  

  const handleResend = (data) => {
    const body = {
      userName: "",
      password: "",
      mobileNumber: getMobileNumber.mobileNumber,
      loginMode: "MobileNumber",
      hostName: window.location.hostname,
      ipAddress: ip
    }
    dispatch(actionCreators.validateLogin(body,false,navigate))
      .then((res) => {
        setAlertOpen(true);
        setAlertMessage(res.data.message)
        setOtp('');
        // Clear OTP validation error
        clearErrors('otp');

        otpRef.current.value = ''; // Clear the OTP input field
        setTimeLeft(60); // Reset the timer
        setIsResendEnabled(false);
      })
      .catch((error) => {
        setAlertIcon('error');
        setAlertOpen(true);
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="md">
        <div className='center'>
          <LoginHeader />
        </div>
        <Box
          component="form" className='formotp logintxt'
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Enter OTP
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            Please enter the 6-digit code sent to your mobile number.
          </Typography>
          <TextField
            id="otp"
            name="otp"
            inputRef={otpRef}  // Use ref to access the input value           
            variant="outlined"
            placeholder="• • • • • • "
            autoFocus
            {...register('otp')}
            error={!!errors.otp}
            helperText={
              errors.otp?.message && (
                <span className="custom-error">{errors.otp.message}</span>
              )
            }
            inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '10px' } }}
            sx={{ mb: 2, width: '100%' }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
          />
          <MyButton 
          label="Submit"
          // label={showLoader ? <Loader /> : "Submit"}

            type="submit"
          />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            {isResendEnabled
              ? "Didn't receive the code?"
              : `Resend OTP in ${timeLeft} seconds`}
          </Typography>
          <Button
            onClick={handleResend}
            variant="text" className='resendbtn'
            color="primary"
            disabled={!isResendEnabled}
            sx={{ mt: 1 }}
          >
            Resend OTP
          </Button>
        </Box>
        <Footer></Footer>
      </Container>
      <CustomAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        text={alertMessage}
        icon={alertIcon}
        confirmButtonText="OK"
        // cancelButtonText="Cancel"
        allowOutsideClick={false}
        width="40vw"
      />
    </div>
  )
}

export default Otp;