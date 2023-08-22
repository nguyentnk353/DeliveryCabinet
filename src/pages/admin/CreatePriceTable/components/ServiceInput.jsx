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
  function addService(a) {
    setTable((parram) => [
      ...parram,
      {
        id: Math.floor(Math.random() * 1001),
        service: a.service,
        priority: a.priority,
        applyDate: a.applyDate,
      },
    ]);
    // setSelectService(null);
    // setRowInput({ priority: '', dateRange: [] });
    setOpenRow(false);
  }
  function addServiceItem() {
    setOpenRow(true);
  }
  function cancelServiceItem() {
    // setSelectService(null);
    // setRowInput({ priority: '', dateRange: [] });
    setOpenRow(false);
  }
  function deleteServiceItem(id) {
    const newTable = table.filter((e) => e.id != id);
    setTable(newTable);
  }
  return (
    <Box component='form' onSubmit={formik.handleSubmit} noValidate>
      {table.length > 0 && (
        <Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Apply from</TableCell>
                  <TableCell>Apply to</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map((row) => (
                  <TableRow
                    // key={row.id}
                    sx={{
                      '&:last-child td,&:last-child th': {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {/* {row.service.name} */}
                    </TableCell>
                    <TableCell>{row.priority}</TableCell>
                    <TableCell>
                      {/* {moment(row?.applyDate[0]).format('DD /MM /YYYY')} */}
                    </TableCell>
                    <TableCell>
                      {/* {moment(row?.applyDate[1]).format('DD /MM /YYYY')} */}
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex' }}>
                        <IconButton
                          onClick={(e, i) => {
                            e.stopPropagation();
                            deleteServiceItem(row.id);
                            // apiDeleteBoxType(row.id);
                          }}
                        >
                          <DeleteForever sx={{ color: red[600] }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {openRow ? (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box>
                <Autocomplete
                  disablePortal
                  id='serviceType'
                  autoFocus
                  options={serviceTypeList}
                  disableClearable
                  getOptionLabel={(option) => option.name}
                  //   value={selectService}
                  onChange={(_, e) => {
                    // setSelectService(e);
                    formik.setFieldValue('serviceType', e);
                  }}
                  sx={{ width: '100%', margin: 'auto' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Service' />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <TextField
                  required
                  fullWidth
                  id='priority'
                  label='Priority'
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                />
              </Box>
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
                  id='dateRange'
                  // value={formik.values.dateRange}
                  onChange={(val) => {
                    formik.setFieldValue('dateRange'), val;
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
            <IconButton type='submit'>
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
    </Box>
  );
};

export default ServiceInput;
