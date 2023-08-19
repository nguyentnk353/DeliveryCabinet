import { useMount } from 'ahooks';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import getUserList from '../../services/getUserList';
import CustomBreadcrumb from '../CustomBreadcrumb';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { IconUser } from '@tabler/icons-react';
import { IconKey } from '@tabler/icons-react';
import EditProfile from './components/EditProfile';
import { Formik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import * as Yup from 'yup';
import useScriptRef from './hooks/useScriptRef';
import useNotification from '../../utils/useNotification';
import moment from 'moment';
import { FaUpload } from 'react-icons/fa';
import postImage from '../../services/postImage';
import updateUser from '../../services/updateUser';
import Navbar from '../Navbar';
import { CameraAlt } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: '100%' }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const index = () => {
  const navigate = useNavigate();
  const scriptedRef = useScriptRef();
  const loginUser = JSON.parse(localStorage.getItem('loginUser'));
  if (!loginUser) {
    return <Navigate to='/login' />;
  }
  const [user, setUser] = useState({});
  const [value, setValue] = React.useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsinvalid] = useState(false);
  const [msg, sendNotification] = useNotification();
  // const phoneRegExp =
  //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const phoneRegExp = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  const [image, setImage] = useState(user?.imgUrl);
  const [file, setFile] = useState(null);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    document.getElementById('img-input').click();
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useMount(() => {
    const payload = {
      Id: loginUser?.Id,
    };
    getUserList(payload)
      .then((res) => {
        setUser(res.items[0]);
        setImage(res.items[0].imgUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  function checkRole(r) {
    if (r) {
      switch (r) {
        case 1:
          return 'Admin';
        case 2:
          return 'Store Owner';
        case 3:
          return 'Staff';
        case 4:
          return 'Customer';
        default:
          return 'Unknown role';
      }
    }
  }
  const bcList = [
    { name: 'Profile', sidebar: 'Dashboard', to: '/admin/profile' },
  ];
  return (
    <Box>
      <Box
        sx={{
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            variant='h5'
            sx={{ fontWeight: '600', marginBottom: '0.25rem' }}
          >
            Profile
          </Typography>
          <Box>
            <CustomBreadcrumb list={bcList} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Paper
          sx={{
            padding: '5rem 0 3rem 0',
            width: '40%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px',
          }}
        >
          {/* <Chip sx={{ position: 'absolute', top: '24px', right: '24px' }}>
            Active
          </Chip> */}

          {user?.isEnable ? (
            <Chip
              label='Active'
              // size='small'
              sx={{
                color: '#1bcd7a',
                bgcolor: '#e5fceb',
                position: 'absolute',
                top: '24px',
                right: '24px',
              }}
            />
          ) : (
            <Chip
              label='Inactive'
              // size='small'
              sx={{
                color: '#e26e2a',
                bgcolor: '#fdf4f3',
                position: 'absolute',
                top: '24px',
                right: '24px',
              }}
            />
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                padding: '8px',
                margin: 'auto',
                width: '164px',
                height: '164px',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '50%',
                border: '1px dashed rgba(145, 158, 171, 0.2)',
              }}
              onClick={handleClick}
            >
              <input
                id='img-input'
                type='file'
                hidden
                accept='image/png, image/jpeg'
                onChange={handleImageChange}
              />
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: '50%',
                  position: 'relative',
                }}
              >
                <Avatar
                  src={image}
                  alt='upload image'
                  sx={{ width: '144px', height: '144px' }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    // -webkit-box-align: 'center',
                    // WebkitBoxAlign: 'center',
                    alignItems: 'center',
                    // -webkit-box-pack: 'center',
                    // WebkitBoxPack: 'center',
                    justifyContent: 'center',
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: '100%',
                    zIndex: '9',
                    borderRadius: '50%',
                    position: ' absolute',
                    color: 'rgb(255, 255, 255)',
                    backgroundColor: 'rgba(22, 28, 36, 0.64)',
                    transition:
                      'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    opacity: '0',
                    ':hover': {
                      opacity: '1',
                    },
                  }}
                >
                  <CameraAlt />
                  <Typography variant='caption'>Update photo</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ margin: '1rem 0' }}>
              <Typography
                variant='caption'
                sx={{
                  color: 'rgb(145, 158, 171)',
                  fontWeight: '400',
                  textAlign: 'center',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png
              </Typography>
            </Box>
            <Button
              variant='contained'
              size='large'
              startIcon={<FaUpload />}
              sx={{
                borderRadius: '99px',
                // fontSize: '1.25rem',
                // lineheight: '1.5',
                padding: '0.5rem 1.5rem',
                fontWeight: '700',
                marginTop: '0.5rem',
              }}
              onClick={handleClick}
            >
              Upload Image
            </Button>
          </Box>
        </Paper>
        <Paper
          sx={{ padding: '2rem 3rem', width: '100%', borderRadius: '12px' }}
        >
          <Formik
            enableReinitialize
            initialValues={{
              username: user?.loginName,
              name: user?.fullName,
              email: user?.email,
              phone: user?.phone,
              dob: user?.dob ? moment(user?.dob) : null,
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .max(255)
                .required('Username can not be empty'),
              name: Yup.string()
                .max(255)
                .required('Full name can not be empty'),
              email: Yup.string()
                .email('Phải nhập theo định dạng email')
                .max(255)
                .required('Email can not be empty'),
              phone: Yup.string()
                .required('Phone can not be empty')
                .matches(
                  phoneRegExp,
                  'Phone number must be in Vietnamese number format'
                ),
              dob: Yup.date().required('Date of birth can not be empty'),
              // password: Yup.string()
              //   .min(6, 'Password needs at least 6 characters ')
              //   .max(255)
              //   .required('Password can not be empty'),
              // confirm: Yup.string()
              //   .min(6)
              //   .max(255)
              //   .oneOf(
              //     [Yup.ref('password'), null],
              //     'Confirm password must match the password'
              //   )
              //   .required('Confirm password can not be empty'),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                if (scriptedRef.current) {
                  setStatus({ success: true });
                  setSubmitting(false);
                }
                // const payload = {
                //   loginName: values.username,
                //   password: values.password,
                //   confirmPassword: values.confirm,
                //   fullName: values.name,
                //   email: values.email,
                //   phone: values.phone,
                //   dob: moment(values.dob).format('YYYY-MM-DDTHH:mm[Z]'),
                //   role: 4,
                //   storeId: 0,
                // };

                if (file) {
                  const formData = new FormData();
                  formData.append('file', file);
                  postImage(formData)
                    .then((res) => {
                      if (res.status === 200) {
                        const payload = {
                          id: user?.id,
                          fullName: values.name,
                          email: values.email,
                          phone: values.phone,
                          dob: moment(values.dob).format('YYYY-MM-DDTHH:mm[Z]'),
                          isEnable: user?.isEnable,
                          storeId: user?.storeId,
                          imgUrl: res.data.url,
                        };
                        updateUser(payload)
                          .then((res) => {
                            if (res.status == 200) {
                              sendNotification({
                                msg: 'Update profile success',
                                variant: 'success',
                              });
                              // localStorage.setItem(
                              //   'updateProfile',
                              //   res.data.url
                              // );
                            } else {
                              sendNotification({
                                msg: 'Update profile fail',
                                variant: 'error',
                              });
                            }
                          })
                          .catch((err) => console.log(err));
                      } else {
                        sendNotification({
                          msg: 'Update profile fail',
                          variant: 'error',
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  const payload = {
                    id: user?.id,
                    fullName: values.name,
                    email: values.email,
                    phone: values.phone,
                    dob: moment(values.dob).format('YYYY-MM-DDTHH:mm[Z]'),
                    isEnable: user?.isEnable,
                    storeId: user?.storeId,
                    imgUrl: user?.imgUrl,
                  };
                  updateUser(payload)
                    .then((res) => {
                      if (res.status == 200) {
                        sendNotification({
                          msg: 'Update profile success',
                          variant: 'success',
                        });
                        // localStorage.setItem('updateProfile', res.data.url);
                      } else {
                        sendNotification({
                          msg: 'Update profile fail',
                          variant: 'error',
                        });
                      }
                    })
                    .catch((err) => console.log(err));
                }
                // register(payload)
                //   .then((res) => {
                //     if (res.status == 200) {
                //       navigate('/login', { replace: true });
                //       sendNotification({
                //         msg: 'Đã đăng ký thành công, hãy đăng nhập',
                //         variant: 'success',
                //       });
                //     } else if (res.code == 400) {
                //       sendNotification({
                //         msg: 'Tên đăng nhập đã tồn tại',
                //         variant: 'warning',
                //       });
                //     } else {
                //       sendNotification({
                //         msg: 'Không thể đăng ký',
                //         variant: 'error',
                //       });
                //     }
                //   })
                //   .catch((err) => console.log(err));
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
              <form noValidate onSubmit={handleSubmit}>
                {/* {isInvalid && (
              <Alert severity='error'>
                Incorrect username or password ! Try again.
              </Alert>
            )} */}
                {/* <FormControl
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
                </FormControl> */}
                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', gap: 4 }}>
                    <FormControl fullWidth sx={{ ...customInput }}>
                      <TextField
                        id='outlined-adornment-username-login'
                        value={values.username}
                        // value={user?.loginName}
                        defaultValue='Username'
                        name='username'
                        variant='outlined'
                        disabled
                        label='Username'
                      />
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
                        defaultValue='Phone'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label='Phone'
                        error={touched.phone && Boolean(errors.phone)}
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
                  </Box>

                  <Box sx={{ display: 'flex', gap: 4 }}>
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
                        defaultValue='Full name'
                        onChange={handleChange}
                        label='Full name'
                        error={touched.name && Boolean(errors.name)}
                      />
                      {/* {errors.name && touched.name && (
                        <p className='text-red-500'>{errors.name}</p>
                      )} */}
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
                          label='Date of birth'
                          format='DD/MM/YYYY'
                          // defaultValue='Date of birth'
                          value={values.dob}
                          onChange={(value) =>
                            setFieldValue('dob', value, true)
                          }
                          slotProps={{
                            textField: {
                              variant: 'outlined',
                              error: touched.dob && Boolean(errors.dob),
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
                  </Box>
                  <Box sx={{ display: 'flex', gap: 4 }}>
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
                        defaultValue='Email'
                        onChange={handleChange}
                        label='Email'
                        error={touched.email && Boolean(errors.email)}
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
                    <FormControl fullWidth sx={{ ...customInput }}>
                      <TextField
                        id='outlined-adornment-role'
                        value={checkRole(user?.role)}
                        defaultValue='Role'
                        fullWidth
                        name='role'
                        variant='outlined'
                        disabled
                        label='Role'
                      />
                    </FormControl>
                  </Box>
                </Box>

                {/* <FormControl
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
            </FormControl> */}
                {/* <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                  spacing={1}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name='checked'
                        color='primary'
                      />
                    }
                    label='Remember me'
                  />
                </Stack> */}
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}

                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Button
                    // disableElevation
                    disabled={isSubmitting}
                    // fullWidth
                    // size='large'
                    type='submit'
                    variant='contained'
                    // color='secondary'
                  >
                    Save change
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
        </Paper>
      </Box>
    </Box>
  );
};

export default index;
