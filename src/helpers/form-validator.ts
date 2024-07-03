import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .max(16, 'Password should have maximum 16 characters'),
});
