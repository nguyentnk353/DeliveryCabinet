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

const validationSchema = yup.object({
  address: yup
    .string('Enter detail address')
    .required('Detail address is required'),
});

const index = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const formik = useFormik({
    initialValues: {
      address: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const api = {
        province: province,
        city: district,
        district: ward,
        address: values.address,
        description: values.description,
        storeTypeId: storeType.id,
        areaId: area.id,
        serviceTypeId: serviceType.id,
        userId: location.state.userId,
      };
      createStore(api)
        .then((res) => {
          console.log(res);
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

  return (
    <Box sx={{ p: '5%' }}>
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: '700' }}>
            New Store
          </Typography>
          <Button
            type='submit'
            variant='contained'
            // onClick={() => navigate('/admin/new-store', { replace: true })}
          >
            Create new store
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: '3rem' }}>
          <Paper sx={{ width: '50%', p: '2rem' }}>
            <Typography
              variant='h6'
              fontWeight='bold'
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <FmdGood sx={{ color: blue[500] }} />
              <span>Store Location</span>
            </Typography>
            <Divider />
            <Box
              sx={{
                paddingTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Autocomplete
                disablePortal
                id='province'
                autoFocus
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
                renderInput={(params) => <TextField {...params} label='Ward' />}
              />
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
          </Paper>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              gap: '2rem',
            }}
          >
            <Paper sx={{ p: '2rem' }}>
              <Typography
                variant='h6'
                fontWeight='bold'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <AddCircleOutline sx={{ color: blue[500] }} />
                <span>Other</span>
              </Typography>
              <Divider />
              <Box
                sx={{
                  paddingTop: '2rem',
                  display: 'flex',
                  flexDirection: 'column',

                  gap: 2,
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
                  getOptionLabel={(option) => option.description}
                  onChange={(_, e) => {
                    setServiceType(e);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Service type' />
                  )}
                />
                <TextField
                  margin='normal'
                  fullWidth
                  id='description'
                  label='Description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default index;
