import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import logo from '../../../assets/images/DeliveryPNG.png';
import login from '../../../services/login';
import { Alert, Paper, useTheme } from '@mui/material';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  loginName: yup.string('Enter your username').required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});
export default function Login() {
  const navigate = useNavigate();
  const [isInvalid, setIsinvalid] = useState(false);
  const formik = useFormik({
    initialValues: {
      loginName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values)
        .then((data) => {
          const errLogin = 'Invalid Login';

          if (
            data.localeCompare(errLogin, 'en', { sensitivity: 'base' }) == 0
          ) {
            setIsinvalid(true);
          } else {
            setIsinvalid(false);
            const decoded = jwt_decode(data);
            localStorage.setItem('loginUser', JSON.stringify(decoded));
            localStorage.setItem('token', data);
            console.log(decoded.Role);
            switch (decoded.Role) {
              case '1':
                return navigate('/admin/store', { replace: true });
              case '2':
                return navigate('/store-owner/home', { replace: true });
              case '3':
                return navigate('/staff/home', { replace: true });
              case '4':
                return navigate('/customer/home', { replace: true });
              default:
                return null;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const theme = useTheme();
  const mcolor = theme.palette.primary.main;

  return (
    <div className='loginBG'>
      <Box sx={{ margin: 'auto', width: '30%', padding: '5% 0 15% 0' }}>
        <Paper elevation={3} sx={{ p: '10% 15%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              display='flex'
              justifyContent='space-between'
              sx={{
                marginBottom: '5%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant='h4'
                  sx={{ fontWeight: '900', color: mcolor }}
                >
                  Sign in
                </Typography>
                <Typography
                  variant='subtitle1'
                  sx={{ color: 'text.secondary' }}
                >
                  Welcome Back
                </Typography>
              </Box>
              <img src={logo} width='auto' height='60px' />
            </Box>
            {isInvalid && (
              <Alert severity='error'>
                Incorrect username or password ! Try again.
              </Alert>
            )}

            <Box
              component='form'
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='loginName'
                label='Username'
                autoFocus
                value={formik.values.loginName}
                onChange={formik.handleChange}
                error={
                  formik.touched.loginName && Boolean(formik.errors.loginName)
                }
                helperText={formik.touched.loginName && formik.errors.loginName}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Box display='flex' justifyContent='space-between'>
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />

                <Link paddingTop='3%' href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Box>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href='#' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
