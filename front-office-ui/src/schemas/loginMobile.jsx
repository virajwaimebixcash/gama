import * as Yup from "yup";

export const loginViaMobileSchema = Yup.object({
  mobile: Yup.string()
    .required('Mobile Number is required')
    .matches(/^[0-9]{10}$/, 'Mobile Number is not valid'),
});

export const validateOtpSchema = Yup.object({
  otp: Yup.string()
    .required("Please Enter OTP")
    .matches(/^[1-9][0-9]{5}$/, "Please Enter Valid OTP"),
});