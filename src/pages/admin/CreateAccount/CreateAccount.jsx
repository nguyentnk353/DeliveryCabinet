import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React, { useState } from 'react';
import UploadAvatar from './components/UploadAvatar/UploadAvatar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment/moment';
import postAccount from './../../../services/postAccount';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import postImage from '../../../services/postImage';
import useNotification from '../../../utils/useNotification';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState({ name: 'Role', id: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [dob, setDob] = useState();
  const [fileImg, setFileImg] = useState();
  const [msg, sendNotification] = useNotification();
  const phoneRegExp = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;


  const roleList = [
    { name: 'Admin', key: 1 },
    { name: 'Store Owner', key: 2 },
    // { name: 'Staff', key: 3 },
    { name: 'Customer', key: 4 },
  ];
  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      phone: '',
      dob: null,
      role: '',
      login_name: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, 'Full Name mininum 2 characters')
        .max(30, 'Full Name maximum 30 characters')
        .required('Required!'),
      email: Yup.string().email('Invalid email format').required('Required!'),
      phone: Yup.string()
        .required('Required!')
        .matches(phoneRegExp, 'Phone number is not valid'),
      dob: Yup.date().required('Date of Birth can not be empty'),
      role: Yup.object().required('Role can not be empty'),
      login_name: Yup.string()
        .min(2, 'Login Name mininum 2 characters')
        .max(15, 'Login Name maximum 15 characters')
        .required('Required!'),
      password: Yup.string()
        .min(3, 'Password minimum 3 characters')
        .required('Required!'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], "Password's not match")
        .required('Required!'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('file', fileImg);
      const api = {
        loginName: values.login_name,
        password: values.password,
        confirmPassword: values.confirm_password,
        fullName: values.full_name,
        email: values.email,
        phone: values.phone,
        dob: values.dob,
        role: values.role?.key,
      };
      postAccount(api)
        .then((res) => {
          if (res.status == 201) {
            navigate('/admin/user');

            sendNotification({
              msg: 'User create success',
              variant: 'success',
            });
          } else if (res.response.status === 400) {
            sendNotification({
              msg: res.response.data.message,
              variant: 'error',
            });
          } else {
            sendNotification({
              msg: 'User create fail',
              variant: 'error',
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  const bcList = [
    { name: 'User', sidebar: 'User', to: '/admin/user' },
    { name: 'New user', sidebar: 'User', to: '/admin/new-user' },
  ];
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
            New User
          </Typography>
          <Box>
            <CustomBreadcrumb list={bcList} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              {/* <Paper
              sx={{ borderRadius: '16px', width: '30%', padding: '2%' }}
              elevation={3}
            >
              <Box
                sx={{
                  padding: '10% 0',
                }}
              >
                <UploadAvatar setFileImg={setFileImg} />
              </Box>
            </Paper> */}

              <Paper
                sx={{ borderRadius: '16px', width: '65%', margin: 'auto' }}
                elevation={3}
              >
                <Box
                  sx={{
                    padding: '20px',
                  }}
                >
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label='Full Name'
                        id='full_name'
                        variant='outlined'
                        value={formik.values.full_name}
                        onChange={formik.handleChange}
                        fullWidth
                        margin='normal'
                        error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                      // required
                      />
                      {formik.errors.full_name && formik.touched.full_name && (
                        <p className='text-red-500'>{formik.errors.full_name}</p>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label='Email'
                        id='email'
                        variant='outlined'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        fullWidth
                        margin='normal'
                        error={formik.touched.email && Boolean(formik.errors.email)}
                      // required
                      />
                      {formik.errors.email && formik.touched.email && (
                        <p className='text-red-500'>{formik.errors.email}</p>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label='Phone'
                        id='phone'
                        variant='outlined'
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        fullWidth
                        margin='normal'
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                      // required
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <p className='text-red-500'>{formik.errors.phone}</p>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ paddingTop: '2%' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker
                              id='dob'
                              name='dob'
                              label='Date Of Birth'
                              sx={{ width: '100%' }}
                              value={formik.values.dob}
                              onChange={(newValue) => {
                                // setDob(moment(newValue.$d).format());
                                formik.setFieldValue('dob', moment(newValue.$d).format(), true)
                              }}
                              slotProps={{
                                textField: {
                                  variant: 'outlined',
                                  error: formik.touched.dob && Boolean(formik.errors.dob),
                                },
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                      {formik.errors.dob && formik.touched.dob && (
                        <p className='text-red-500'>{formik.errors.dob}</p>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <Autocomplete
                        disablePortal
                        id='role'
                        name='role'
                        sx={{ paddingTop: '4.5%' }}
                        options={roleList}
                        getOptionLabel={(option) => option.name}
                        // value={formik.values.role}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                        onChange={(event, newValue) => {
                          // console.log(newValue)
                          formik.setFieldValue("role", newValue, true)
                          // if (newValue) {
                          //   // setRole(newValue.id);
                          //   setFieldValue("role", newValue.id)

                          // }
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name && option.id === value.id
                        }
                        renderInput={(params) => (
                          <TextField {...params} label='Role' name='role' error={formik.touched.role && Boolean(formik.errors.role)} />
                        )}
                      />
                      {formik.errors.role && formik.touched.role && (
                        <p className='text-red-500'>{formik.errors.role}</p>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label='User Name'
                        id='login_name'
                        variant='outlined'
                        value={formik.values.login_name}
                        onChange={formik.handleChange}
                        fullWidth
                        margin='normal'
                        error={formik.touched.login_name && Boolean(formik.errors.login_name)}
                      // required
                      />
                      {formik.errors.login_name &&
                        formik.touched.login_name && (
                          <p className='text-red-500'>{formik.errors.login_name}</p>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label='Password'
                        id='password'
                        variant='outlined'
                        value={formik.values.password}
                        type={showPassword ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        fullWidth
                        margin='normal'
                        error={formik.touched.password && Boolean(formik.errors.password)}
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
                      // required
                      />
                      {formik.errors.password && formik.touched.password && (
                        <p className='text-red-500'>{formik.errors.password}</p>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label='Confirm Password'
                        id='confirm_password'
                        variant='outlined'
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                        fullWidth
                        margin='normal'
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
                      // required
                      />
                      {formik.errors.confirm_password &&
                        formik.touched.confirm_password && (
                          <p className='text-red-500'>{formik.errors.confirm_password}</p>
                        )}
                    </Grid>
                    <Box sx={{ marginLeft: 'auto', marginTop: '20px' }}>
                      <Button variant='contained' type='submit'>
                        Create Account
                      </Button>
                    </Box>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAccount;
