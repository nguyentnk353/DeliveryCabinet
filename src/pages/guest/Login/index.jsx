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
import {
  Alert,
  IconButton,
  InputAdornment,
  Paper,
  useTheme,
} from '@mui/material';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import paperBg from '../../../assets/images/LoginPaper.png';
import LoginImg1 from '../../../assets/images/LoginImg1.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useNotification from '../../../utils/useNotification';

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
  const [showPassword, setShowPassword] = React.useState(false);
  const [msg, sendNotification] = useNotification();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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

            switch (decoded.Role) {
              case '1':
                localStorage.setItem('selected', 'Store');
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
          sendNotification({ msg: error, variant: 'error' });
        });
    },
  });
  const theme = useTheme();
  const mcolor = theme.palette.primary.main;

  return (
    <div className='loginBG'>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{
              height: '580px',
              width: '1120px',
              padding: '60px 0 40px 120px',
              backgroundImage: `url(${paperBg})`,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '400px',
                }}
              >
                <Box>
                  <img
                    src={logo}
                    width='auto'
                    height='50px'
                    style={{ marginBottom: '20px' }}
                  />
                </Box>
                <Box>
                  <Typography variant='h5' sx={{ fontWeight: '900' }}>
                    LOGIN
                  </Typography>
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
                      formik.touched.loginName &&
                      Boolean(formik.errors.loginName)
                    }
                    helperText={
                      formik.touched.loginName && formik.errors.loginName
                    }
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    id='password'
                    autoComplete='current-password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                    Login
                  </Button>
                </Box>
              </Box>
              <Box>
                <img
                  src={LoginImg1}
                  alt='Login character img'
                  width='554px'
                  height='420px'
                  style={{ marginTop: '20px' }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
