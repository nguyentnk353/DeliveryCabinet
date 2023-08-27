import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { blue, red } from '@mui/material/colors';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Close, DeleteForever, Save } from '@mui/icons-material';
import getServiceTypeList from '../../../../services/getServiceTypeList';
import { useMount } from 'ahooks';

const validationSchema = yup.object({
  // name: yup.string('Enter price table name').required('Name is required'),
  // applyFrom: yup.date().typeError('Invalid Date!'),
  // applyTo: yup.date().typeError('Invalid Date!'),
  // rangePicker: yup.array().required('Date apply is required'),
});
const ServiceInput = ({ serviceTypeList }) => {
  const [table, setTable] = useState([]);
  const [openRow, setOpenRow] = useState(false);
  //   const [serviceTypeList, setServiceTypeList] = useState([]);
  //   useMount(() => {
  //     const api = {
  //       IsEnable: true,
  //     };
  //     getServiceTypeList(api)
  //       .then((res) => {
  //         const newTable = res.items.map((e) => e);
  //         setServiceTypeList(newTable);
  //       })
  //       .catch((err) => {
  //         // sendNotification({ msg: err, variant: 'error' });
  //       });
  //   });
  // console.log(serviceTypeList);
  const formik = useFormik({
    initialValues: {
      serviceType: '',
      priority: '',
      dateRange: [],
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      console.log(val);
      const addTable = {
        service: val.serviceType,
        priority: val.priority,
        applyDate: val.dateRange,
      };
      // addService(addTable);
    },
  });

  return (
    <Formik
      initialValues={{
        serviceType: null,
        priority: 1,
        serviceDate: [],
        // username: '',
        // password: '',
        // submit: null,
      }}
      validationSchema={yup.object().shape({
        // username: Yup.string()
        //   // .email('Must be a valid email')
        //   .max(255)
        //   .required('Tên đăng nhập không thể trống'),
        // password: Yup.string().max(255).required('Mật khẩu không thể trống'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
          console.log(values);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form
          id='form-service'
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          {...others}
        >
          {openRow ? (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box>
                    <Autocomplete
                      disablePortal
                      id='serviceType'
                      name='serviceType'
                      form='form-service'
                      autoFocus
                      options={serviceTypeList}
                      disableClearable
                      getOptionLabel={(option) => option.name}
                      onChange={(_, e) => {
                        setFieldValue('serviceType', e, true);
                      }}
                      sx={{ width: '100%', margin: 'auto' }}
                      renderInput={(params) => (
                        <TextField {...params} required label='Service' />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  {/* <Box>
                  <Select
                    labelId='demo-simple-select-label'
                    form='form-service'
                    id='priority'
                    name='priority'
                    defaultValue={1}
                    label='Priority'
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue('priority', e.target.value);
                    }}
                  >
                    <MenuItem value={1}>
                      Daily (Yearly)
                    </MenuItem>
                    <MenuItem value={2}>
                      Seasonly (Quarterly)
                    </MenuItem>
                    <MenuItem value={3}>Monthly</MenuItem>
                    <MenuItem value={4}>Weekly</MenuItem>
                    <MenuItem value={5}>Holiday</MenuItem>
                  </Select>
                </Box> */}
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <RangePicker
                      // size='large'
                      form='form-service'
                      name='serviceDate'
                      onChange={(val) => {
                        setFieldValue('serviceDate', val);
                      }}
                      style={{
                        padding: '1rem',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                  padding: '1rem 0',
                }}
              >
                <IconButton
                  //  onClick={addService}
                  component='button'
                  disabled={isSubmitting}
                  form='form-service'
                  type='submit'
                >
                  <Save sx={{ color: blue[500] }} />
                </IconButton>
                <IconButton onClick={cancelServiceItem}>
                  <Close sx={{ color: red[500] }} />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box>
              <Button variant='outlined' onClick={addServiceItem}>
                + Add service type
              </Button>
            </Box>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ServiceInput;
