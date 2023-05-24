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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AddCircleOutline, FmdGood, Person } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

const validationSchema = yup.object({
  loginName: yup
    .string('Enter detail address')
    .required('Detail address is required'),
});

const provinceList = [
  { name: 'Ha Noi', key: 1 },
  { name: 'Ho Chi Minh', key: 2 },
  { name: 'Khanh Hoa', key: 3 },
];
const districtList = [
  { name: 'Vinh Phuc', key: 1 },
  { name: 'Long Thanh My', key: 2 },
  { name: 'Nha Trang', key: 3 },
];
const wardList = [
  { name: 'Vinh Long', key: 1 },
  { name: 'Xuan Oai', key: 2 },
  { name: 'Phuoc Hoa', key: 3 },
];
const ownerList = [
  { name: 'Tran Nguyen Khoi Nguyen', id: 1 },
  { name: 'Ton Trong Nghia', id: 2 },
  { name: 'Le Minh Khoa', id: 3 },
];
const storeTypeList = [
  { name: 'University', id: 1 },
  { name: 'Apartment', id: 3 },
];
const areaList = [
  { name: 'SHTP', id: 1 },
  { name: 'Quan 9', id: 2 },
];
const serviceTypeList = [{ name: 'Normal Price', id: 1 }];
const index = () => {
  const navigate = useNavigate();
  const [province, setProvince] = useState({ name: 'Choose province', key: 0 });
  const [district, setDistrict] = useState({ name: 'Choose district', key: 0 });
  const [ward, setWard] = useState({ name: 'Choose ward', key: 0 });
  const [owner, setOwner] = useState({ name: 'Choose owner', key: 0 });
  const formik = useFormik({
    initialValues: {
      address: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box sx={{ p: '5%' }}>
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
          variant='contained'
          // onClick={() => navigate('/admin/new-store', { replace: true })}
        >
          Create new store
        </Button>
      </Box>
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
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
                options={provinceList}
                getOptionLabel={(option) => option.name}
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
                onChange={(value) => {
                  setDistrict(value);
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
                onChange={(value) => {
                  setWard(value);
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
                autoFocus
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              <TextField
                margin='normal'
                fullWidth
                id='description'
                label='Description'
                autoFocus
                value={formik.values.description}
                onChange={formik.handleChange}
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
                <Person sx={{ color: blue[500] }} />
                <span>Store Owner</span>
              </Typography>
              <Divider />
              <Box sx={{ paddingTop: '2rem' }}>
                <Autocomplete
                  disablePortal
                  id='owner'
                  options={ownerList}
                  getOptionLabel={(option) => option.name}
                  onChange={(value) => {
                    setWard(value);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Owner' />
                  )}
                />
              </Box>
            </Paper>
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

                  gap: 1,
                }}
              >
                <Autocomplete
                  disablePortal
                  id='storeType'
                  options={storeTypeList}
                  getOptionLabel={(option) => option.name}
                  onChange={(value) => {
                    setWard(value);
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
                  onChange={(value) => {
                    setWard(value);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Area' />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id='serviceType'
                  options={serviceTypeList}
                  getOptionLabel={(option) => option.name}
                  onChange={(value) => {
                    setWard(value);
                  }}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Service type' />
                  )}
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
