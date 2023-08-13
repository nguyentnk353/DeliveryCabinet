import { Formik } from 'formik';
import React from 'react';
import useScriptRef from './../hooks/useScriptRef';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import login from '../../../../services/login';
import useNotification from '../../../../utils/useNotification';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthLogin = ({ ...others }) => {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsinvalid] = useState(false);
  const [msg, sendNotification] = useNotification();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const customInput = {
    marginTop: 1,
    marginBottom: 1,
    '& > label': {
      top: 23,
      left: 0,
      // color: theme.grey500,
      '&[data-shrink="false"]': {
        top: 5,
      },
    },
    '& > div > input': {
      padding: '30.5px 14px 11.5px !important',
    },
    // '& legend': {
    //   //   display: 'none',
    // },
    '& fieldset': {
      top: 0,
    },
  };
  return (
    <div>
      {' '}
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            // .email('Must be a valid email')
            .max(255)
            .required('Tên đăng nhập không thể trống'),
          password: Yup.string().max(255).required('Mật khẩu không thể trống'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            // console.log(values);
            const payload = {
              loginName: values.username,
              password: values.password,
            };
            login(payload)
              .then((res) => {
                if (res.status == 200) {
                  setIsinvalid(false);
                  const decoded = jwt_decode(res.data);
                  localStorage.setItem('loginUser', JSON.stringify(decoded));
                  localStorage.setItem('token', res.data);

                  switch (decoded.Role) {
                    case '1':
                      localStorage.setItem('selected', 'Dashboard');
                      localStorage.setItem('subConfig', false);
                      localStorage.setItem('sidebarToggle', 'true');
                      return navigate('/admin/dashboard', { replace: true });
                    case '2':
                      localStorage.setItem('selected', 'Dashboard');
                      return navigate('/store-owner/dashboard', {
                        replace: true,
                      });
                    case '3':
                      return navigate('/staff/home', { replace: true });
                    case '4':
                      return navigate('/customer/home', { replace: true });
                    default:
                      return null;
                  }
                } else if (res.code == 404) {
                  setIsinvalid(true);
                } else {
                  sendNotification({
                    msg: 'Không thể đăng nhập',
                    variant: 'error',
                  });
                }
              })
              .catch((err) => console.log(err));
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            {isInvalid && (
              <Alert severity='error'>
                Sai tên đăng nhập hoặc mật khẩu! Hãy thử lại.
              </Alert>
            )}
            <FormControl
              fullWidth
              error={Boolean(touched.username && errors.username)}
              sx={{ ...customInput }}
            >
              {/* <InputLabel htmlFor='outlined-adornment-username-login'>
                Username
              </InputLabel> */}
              <TextField
                id='outlined-adornment-username-login'
                type='username'
                variant='outlined'
                // size='small'
                value={values.username}
                name='username'
                onBlur={handleBlur}
                onChange={handleChange}
                label='Tên đăng nhập'
                // inputProps={{}}
                // inputProps={{
                //   style: {
                //     height: '20px',
                //   },
                // }}
              />
              {touched.username && errors.username && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-username-login'
                >
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...customInput }}
            >
              {/* <InputLabel htmlFor='outlined-adornment-password-login'>
                Password
              </InputLabel> */}
              <TextField
                id='outlined-adornment-password-login'
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                variant='outlined'
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                label='Mật khẩu'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                        // size='large'
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-password-login'
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              spacing={1}
            >
              {/* <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            name="checked"
                            color="primary"
                        />
                    }
                    label="Remember me"
                /> */}
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                // disableElevation
                disabled={isSubmitting}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                // color='secondary'
              >
                Đăng nhập
              </Button>
            </Box>
            {/* <Box sx={{ textAlign: 'center' }}>
              {' '}
              <Typography
                variant='subtitle1'
                color='primary'
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                Forgot Password?
              </Typography>
            </Box> */}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AuthLogin;
