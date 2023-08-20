import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useScriptRef from '../hooks/useScriptRef';

const EditProfile = () => {
  const scriptedRef = useScriptRef();
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
    <Box>
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
          <form noValidate onSubmit={handleSubmit}>
            {/* {isInvalid && (
              <Alert severity='error'>
                Sai tên đăng nhập hoặc mật khẩu! Hãy thử lại.
              </Alert>
            )} */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                    sx={{ ...customInput }}
                  >
                    <TextField
                      id='outlined-adornment-name-login'
                      type='name'
                      variant='outlined'
                      value={values.name}
                      name='name'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label='Full name'
                      sx={{ width: '300px' }}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText
                        error
                        id='standard-weight-helper-text-username-login'
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
                      type='email'
                      variant='outlined'
                      value={values.email}
                      name='email'
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
                </Box>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    sx={{ ...customInput }}
                  >
                    <TextField
                      id='outlined-adornment-phone-login'
                      type='phone'
                      variant='outlined'
                      value={values.phone}
                      name='phone'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label='Phone'
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
                    <TextField
                      id='outlined-adornment-dob-login'
                      type='dob'
                      variant='outlined'
                      value={values.dob}
                      name='dob'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label='Date of birth'
                    />
                    {touched.dob && errors.dob && (
                      <FormHelperText
                        error
                        id='standard-weight-helper-text-username-login'
                      >
                        {errors.dob}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Box>
              <img
                src='https://anime.atsit.in/l/wp-content/uploads/2023/01/tuoi-chieu-cao-can-nang-cua-cac-nhan-vat-chinh-trong-anime-overlord.jpg'
                style={{ width: '150px', height: '150px' }}
              />
            </Box>
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
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfile;
