import * as Yup from "yup";

export const loginSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    username: Yup.string().required('Username is required'),
});
