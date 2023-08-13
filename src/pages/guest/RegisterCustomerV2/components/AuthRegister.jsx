import { Formik } from 'formik';
import React from 'react';
import useScriptRef from '../hooks/useScriptRef';
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
import useNotification from '../../../../utils/useNotification';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment/moment';
import register from '../../../../services/register';

const AuthRegister = ({ ...others }) => {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsinvalid] = useState(false);
  const [msg, sendNotification] = useNotification();
  // const phoneRegExp =
  //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const phoneRegExp = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
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
    //   display: 'none',
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
          name: '',
          email: '',
          phone: '',
          dob: '',
          password: '',
          confirm: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(255)
            .required('Tên đăng nhập không thể trống'),
          name: Yup.string()
            .max(255)
            .required('Tên người dùng không thể trống'),
          email: Yup.string()
            .email('Phải nhập theo định dạng email')
            .max(255)
            .required('Email không thể trống'),
          phone: Yup.string()
            .required('Số điện thoại không thể trống!')
            .matches(
              phoneRegExp,
              'Số điện thoại phải theo định dạng số Việt Nam'
            ),
          dob: Yup.date().required('Ngày sinh không thể trống'),
          password: Yup.string()
            .min(6, 'Mật khẩu cần ít nhất 6 ký tự')
            .max(255)
            .required('Mật khẩu không thể trống'),
          confirm: Yup.string()
            .min(6, 'Mật khẩu cần ít nhất 6 ký tự')
            .max(255)
            .oneOf(
              [Yup.ref('password'), null],
              'Xác nhận mật khẩu phải trùng với mật khẩu'
            )
            .required('Xác nhận mật khẩu không thể trống'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            const payload = {
              loginName: values.username,
              password: values.password,
              confirmPassword: values.confirm,
              fullName: values.name,
              email: values.email,
              phone: values.phone,
              dob: moment(values.dob).format('YYYY-MM-DDTHH:mm[Z]'),
              role: 4,
              storeId: 0,
            };

            register(payload)
              .then((res) => {
                if (res.status == 200) {
                  navigate('/login', { replace: true });
                  sendNotification({
                    msg: 'Đã đăng ký thành công, hãy đăng nhập',
                    variant: 'success',
                  });
                } else if (res.code == 400) {
                  sendNotification({
                    msg: 'Tên đăng nhập đã tồn tại',
                    variant: 'warning',
                  });
                } else {
                  sendNotification({
                    msg: 'Không thể đăng ký',
                    variant: 'error',
                  });
                }
              })
              .catch((err) => console.log(err));
          } catch (err) {
            console.log(err);
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
          setFieldValue,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            {isInvalid && (
              <Alert severity='error'>
                Incorrect username or password ! Try again.
              </Alert>
            )}
            <FormControl
              fullWidth
              error={Boolean(touched.username && errors.username)}
              sx={{ ...customInput }}
            >
              <TextField
                id='outlined-adornment-username-login'
                value={values.username}
                name='username'
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
                label='Tên đăng nhập'
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
              error={Boolean(touched.name && errors.name)}
              sx={{ ...customInput }}
            >
              <TextField
                id='outlined-adornment-name-login'
                value={values.name}
                name='name'
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
                label='Họ & Tên'
              />
              {touched.name && errors.name && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-name-login'
                >
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...customInput }}
            >
              <TextField
                id='outlined-adornment-email-login'
                value={values.email}
                name='email'
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
                label='Email'
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-email-login'
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.phone && errors.phone)}
              sx={{ ...customInput }}
            >
              <TextField
                id='outlined-adornment-phone-login'
                value={values.phone}
                name='phone'
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
                label='Số điện thoại'
              />
              {touched.phone && errors.phone && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-phone-login'
                >
                  {errors.phone}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.dob && errors.dob)}
              sx={{ ...customInput }}
            >
              {/* <TextField
                id='outlined-adornment-dob-login'
                value={values.dob}
                name='dob'
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
                label='Date of birth'
              /> */}
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  disableFuture
                  id='dob'
                  name='dob'
                  label='Ngày sinh'
                  format='DD/MM/YYYY'
                  value={values.date}
                  onChange={(value) => setFieldValue('dob', value, true)}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      // error: formik.touched.date && Boolean(formik.errors.date),
                      // helperText: formik.touched.date && formik.errors.date
                    },
                  }}
                />
              </LocalizationProvider>
              {touched.dob && errors.dob && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-phone-login'
                >
                  {errors.dob}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...customInput }}
            >
              <TextField
                id='outlined-adornment-password-login'
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name='password'
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
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
                label='Mật khẩu'
                // inputProps={{}}
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
            <FormControl
              fullWidth
              error={Boolean(touched.confirm && errors.confirm)}
              sx={{ ...customInput }}
            >
              <TextField
                id='outlined-adornment-confirm-login'
                type={showPassword ? 'text' : 'password'}
                value={values.confirm}
                name='confirm'
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
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
                label='Xác nhận mật khẩu'
                // inputProps={{}}
              />
              {touched.confirm && errors.confirm && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-confirm-login'
                >
                  {errors.confirm}
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
                Đăng ký
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

export default AuthRegister;
