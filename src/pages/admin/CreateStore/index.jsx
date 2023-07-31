import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AddCircleOutline, FmdGood, Person } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import { useMount } from 'ahooks';
import getAreaList from './../../../services/getAreaList';
import getStoreTypeList from '../../../services/getStoreTypeList';
import getServiceTypeList from './../../../services/getServiceTypeList';
import createStore from '../../../services/createStore';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import uploadImg from '../../../assets/images/uploadImg.png';
import download from '../../../assets/images/download.png';
import { styled, useTheme } from '@mui/material/styles';
import { FaUpload } from 'react-icons/fa';
import postImage from '../../../services/postImage';
import useNotification from '../../../utils/useNotification';

const validationSchema = yup.object({
  name: yup.string('Enter name').required('Store name is required'),
  address: yup
    .string('Enter detail address')
    .required('Detail address is required'),
});

const index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [msg, sendNotification] = useNotification();
  const pcolor = theme.palette.primary.main;
  const userInfo = location?.state?.storeOwnerInfo;
  const [province, setProvince] = useState({ name: 'Choose province', key: 0 });
  const [district, setDistrict] = useState({ name: 'Choose district', key: 0 });
  const [ward, setWard] = useState({ name: 'Choose ward', key: 0 });
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [storeTypeList, setStoreTypeList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [storeType, setStoreType] = useState({});
  const [area, setArea] = useState({});
  const [serviceType, setServiceType] = useState({});
  const [image, setImage] = useState(null);
  const [fileApi, setFileApi] = useState(null);
  const [fileBi, setFileBi] = useState(null);
  const [dnd, setDnd] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const api = {
        name: values.name,
        imgUrl:
          'https://reviewedu.net/wp-content/uploads/2021/11/dh-1612100077948503798298.jpg',
        province: province.name,
        city: district.name,
        district: ward.name,
        street: '',
        address: values.address,
        description: values.description,
        storeTypeId: storeType.id,
        areaId: area.id,
        serviceTypeId: serviceType.id,
        userId: userInfo.id,
      };
      createStore(api)
        .then((res) => {
          if (res.status == 201) {
            sendNotification({
              msg: 'Store create success',
              variant: 'success',
            });
            navigate('/admin/user/user-information', {
              state: {
                accountInfo: userInfo,
              },
            });
          } else {
            sendNotification({
              msg: 'Store create fail',
              variant: 'error',
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const host = 'https://provinces.open-api.vn/api/';
  // function callAPI() {
  //   return axios.get(host).then((res) => {
  //     setProvinceList(res.data);
  //   });
  // }
  useMount(() => {
    const api = {
      PageIndex: 1,
      PageSize: 100,
      IsEnable: true,
    };
    const apiService = {
      Id: '',
      PageIndex: 1,
      PageSize: 100,
      IsEnable: true,
    };
    getStoreTypeList(api)
      .then((res) => {
        const newList = res.items.map((e) => e);
        setStoreTypeList(newList);
      })
      .catch((err) => {
        console.log(err);
      });
    getAreaList(api)
      .then((res) => {
        const newList = res.items.map((e) => e);
        setAreaList(newList);
      })
      .catch((err) => {
        console.log(err);
      });
    getServiceTypeList(apiService)
      .then((res) => {
        const newList = res.items.map((e) => e);
        setServiceTypeList(newList);
      })
      .catch((err) => {
        console.log(err);
      });
    return axios.get(host).then((res) => {
      setProvinceList(res.data);
    });
  });
  function callApiDistrict(api) {
    return axios.get(api).then((res) => {
      setDistrictList(res.data.districts);
    });
  }
  function callApiWard(api) {
    return axios.get(api).then((res) => {
      setWardList(res.data.wards);
    });
  }
  const bcList = [
    { name: 'User', sidebar: 'User', to: '/admin/user' },
    {
      name: 'User detail',
      sidebar: 'User',
      state: userInfo,
      to: '/admin/user/user-information',
    },
    {
      name: 'New store',
      sidebar: 'User',
      to: '/admin/new-store',
    },
  ];
  const handleDragOver = (event) => {
    event.preventDefault();
    setDnd(true);
  };
  const handleDragEnter = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    handleImageChange(event);

    setDnd(false);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setDnd(false);
  };

  const handleImageChange = (event) => {
    fileBinary(event);
    const file = dnd ? event.dataTransfer.files[0] : event.target.files[0];
    setFileApi(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const fileBinary = (event) => {
    const file = dnd ? event.dataTransfer.files[0] : event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFileBi(reader.result);
    };
    reader.readAsBinaryString(file);
  };
  const handleClick = () => {
    document.getElementById('img-input').click();
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
            New Store
          </Typography>
          <Box>
            <CustomBreadcrumb list={bcList} />
          </Box>
        </Box>
      </Box>
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <Paper sx={{ padding: '2% 4%', width: '80%', margin: '2% auto' }}>
          <Box>
            <Box sx={{ marginBottom: '2rem' }}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: '700',
                }}
              >
                Basic information
              </Typography>
              <TextField
                margin='normal'
                fullWidth
                required
                autoFocus
                id='name'
                label='Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                margin='normal'
                fullWidth
                id='description'
                label='Description'
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <Box sx={{ marginTop: '1rem' }}>
                <Typography
                  variant='body1'
                  sx={{
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                  }}
                >
                  Cover image
                  {/* <span style={{ color: 'red' }}>*</span> */}
                </Typography>
                <Box
                  onClick={handleClick}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  sx={{
                    textAlign: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0 3%',
                    border: ' 2px lightgrey dashed',
                    borderRadius: '8px',
                    ':hover': {
                      cursor: 'pointer',
                    },
                    backgroundColor: dnd ? '#fafafa' : 'white',
                  }}
                >
                  <input
                    id='img-input'
                    type='file'
                    hidden
                    accept='image/png, image/jpeg'
                    onChange={handleImageChange}
                  />
                  {image ? (
                    <Box sx={{ padding: '2% 0' }}>
                      <img
                        src={image}
                        alt='upload image'
                        style={{ width: '400px', margin: 'auto' }}
                      />
                      <Box
                        sx={{
                          color: pcolor,
                          fontWeight: '400',
                          marginTop: '0.5rem',
                        }}
                      >
                        Choose another image
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      {dnd ? (
                        <Box
                          sx={{
                            width: '100%',
                            padding: '5.5% 0',
                          }}
                        >
                          <img
                            src={download}
                            alt='upload image'
                            style={{
                              height: '60px',
                              margin: 'auto',
                              opacity: '45%',
                            }}
                          />
                          <Box
                            sx={{
                              color: '#454545',
                              fontWeight: '400',
                              marginTop: '0.5rem',
                            }}
                          >
                            Drop image here to upload
                          </Box>
                        </Box>
                      ) : (
                        <Box sx={{ padding: '3% 0' }}>
                          <img
                            src={uploadImg}
                            alt='upload image'
                            style={{
                              height: '60px',
                              margin: 'auto',
                              opacity: '45%',
                            }}
                          />
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
                          >
                            Upload Image
                          </Button>

                          <Box
                            sx={{
                              color: '#454545',
                              fontWeight: '400',
                              marginTop: '0.5rem',
                            }}
                          >
                            Or drop a file
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ margin: '1rem 0 2rem 0' }}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                }}
              >
                Location
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 3,
                }}
              >
                <Autocomplete
                  disablePortal
                  id='province'
                  options={provinceList}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, e) => {
                    setProvince(e);
                    callApiDistrict(host + 'p/' + e.code + '?depth=2');
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Province' />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id='district'
                  options={districtList}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, e) => {
                    setDistrict(e);
                    callApiWard(host + 'd/' + e.code + '?depth=2');
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label='District' />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id='ward'
                  options={wardList}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, e) => {
                    setWard(e);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Ward' />
                  )}
                />
              </Box>
              <TextField
                margin='normal'
                fullWidth
                required
                id='address'
                label='Address'
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Box>
            <Divider />
            <Box sx={{ margin: '1rem 0 2rem 0' }}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                }}
              >
                Other
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 3,
                }}
              >
                <Autocomplete
                  disablePortal
                  id='storeType'
                  options={storeTypeList}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, e) => {
                    setStoreType(e);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Store type' />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id='area'
                  options={areaList}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, e) => {
                    setArea(e);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Area' />
                  )}
                />
                <Autocomplete
                  disablePortal
                  required
                  id='serviceType'
                  options={serviceTypeList}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, e) => {
                    setServiceType(e);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Service type' />
                  )}
                />
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Button
              variant='outlined'
              onClick={() =>
                navigate('/admin/user/user-information', {
                  state: {
                    accountInfo: userInfo,
                  },
                })
              }
            >
              Cancel
            </Button>
            <Button type='submit' variant='contained'>
              Create new store
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default index;
