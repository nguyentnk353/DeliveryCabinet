import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  tabsClasses,
} from '@mui/material';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useNotification from '../../../utils/useNotification';
import createPriceTable from '../../../services/createPriceTable';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import { useMount } from 'ahooks';
import getServiceTypeList from '../../../services/getServiceTypeList';
import { Close, DeleteForever, Save } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import moment from 'moment';
import dayjs from 'dayjs';
import getBoxTypeList from '../../../services/getBoxTypeList';
import getBoxSizeList from '../../../services/getBoxSizeList';
import { PropTypes } from 'prop-types';
const { RangePicker } = DatePicker;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const index = () => {
  const validationSchema = yup.object({
    name: yup.string('Enter price table name').required('Name is required'),
    applyFrom: yup.date().typeError('Invalid Date!'),
    applyTo: yup.date().typeError('Invalid Date!'),
  });
  const navigate = useNavigate();
  const [msg, sendNotification] = useNotification();
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [boxTypeList, setBoxTypeList] = useState([]);
  const [boxSizeList, setBoxSizeList] = useState([]);
  const [table, setTable] = useState([]);
  const [piList, setPiList] = useState([]);
  const [openRow, setOpenRow] = useState(false);
  const [openRowItem, setOpenRowItem] = useState(false);
  const [selectService, setSelectService] = useState(null);
  const [selectBoxSize, setSelectBoxSize] = useState(null);
  const [rowInput, setRowInput] = useState({ priority: '', dateRange: [] });
  const [rowInputItem, setRowInputItem] = useState({
    min: '',
    max: '',
    price: '',
    description: '',
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useMount(() => {
    const api = {
      Id: '',
      PageIndex: 1,
      PageSize: 1000,
      IsEnable: true,
    };
    getServiceTypeList(api)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setServiceTypeList(newTable);
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });

    const api2 = {
      Name: '',
      PageIndex: 1,
      PageSize: 1000,
      IsEnable: true,
    };

    getBoxTypeList(api2)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setBoxTypeList(newTable);
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });

    getBoxSizeList(api2)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setBoxSizeList(newTable);
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      rangePicker: null,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const bi = [0, 0, 0, 0, 0, 0, 0];
      if (val.mon === true) bi[0] = 1;
      else bi[0] = 0;
      if (val.tue === true) bi[1] = 1;
      else bi[1] = 0;
      if (val.wed === true) bi[2] = 1;
      else bi[2] = 0;
      if (val.thu === true) bi[3] = 1;
      else bi[3] = 0;
      if (val.fri === true) bi[4] = 1;
      else bi[4] = 0;
      if (val.sat === true) bi[5] = 1;
      else bi[5] = 0;
      if (val.sun === true) bi[6] = 1;
      else bi[6] = 0;

      const itemList = piList.map((e) => {
        return {
          minDuration: e.min,
          maxDuration: e.max,
          price: e.price,
          description: e.description,
          boxSizeId: e.boxSize.id,
          boxTypeId: e.boxType.id,
        };
      });

      const serviceList = table.map((e) => {
        return {
          serviceTyeId: e.service.id,
          priority: e.priority,
          applyFrom: moment(e.applyDate[0].$d).utc().format(),
          applyTo: moment(e.applyDate[1].$d).utc().format(),
        };
      });
      const api = {
        name: val.name,
        applyFrom: moment(val.rangePicker[0].$d).utc().format(),
        applyTo: moment(val.rangePicker[1].$d).utc().format(),
        dateFilter: bi.join(''),
        priceTableItems: itemList,
        serviceConfigs: serviceList,
      };

      createPriceTable(api)
        .then((res) => {
          if (res.status == 201) {
            sendNotification({
              msg: 'Price table create success',
              variant: 'success',
            });

            formik.resetForm({
              values: {
                name: '',
                rangePicker: null,
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                sun: false,
              },
            });
          } else {
            sendNotification({
              msg: 'Price table create fail',
              variant: 'error',
            });
          }
        })
        .catch((err) => {
          sendNotification({ msg: err, variant: 'error' });
        });
    },
  });

  function addService() {
    setTable((parram) => [
      ...parram,
      {
        id: Math.floor(Math.random() * 1001),
        service: selectService,
        priority: rowInput.priority,
        applyDate: rowInput.dateRange,
      },
    ]);
    setSelectService(null);
    setRowInput({ priority: '', dateRange: [] });
    setOpenRow(false);
  }
  function addServiceItem() {
    setOpenRow(true);
  }
  function cancelServiceItem() {
    setSelectService(null);
    setRowInput({ priority: '', dateRange: [] });
    setOpenRow(false);
  }
  function deleteServiceItem(id) {
    const newTable = table.filter((e) => e.id != id);
    setTable(newTable);
  }
  function addRowItem() {
    setOpenRowItem(true);
  }
  function addItem() {
    setPiList((parram) => [
      ...parram,
      {
        id: Math.floor(Math.random() * 1001),
        boxSize: selectBoxSize,
        boxType: boxTypeList[value],
        min: rowInputItem.min,
        max: rowInputItem.max,
        price: rowInputItem.price,
        description: rowInputItem.description,
      },
    ]);
    setSelectBoxSize(null);
    setRowInputItem({ min: '', max: '', price: '', description: '' });
    setOpenRowItem(false);
  }
  function cancelItem() {
    setOpenRowItem(false);
  }
  function deleteItem(id) {
    const newTable = piList.filter((e) => e.id != id);
    setPiList(newTable);
  }
  return (
    <Box sx={{ p: '5%' }}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: '700' }}>
            New Price Table
          </Typography>
          {/* <Button
            type='submit'
            variant='contained'
            // onClick={() => navigate('/admin/new-store', { replace: true })}
          >
            Create new price table
          </Button> */}
        </Box>
        <Box>
          <Box
            component='form'
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Paper sx={{ padding: '2% 4%' }}>
              <Typography variant='h6' sx={{ fontWeight: '700' }}>
                Price table info
              </Typography>
              <Box>
                {/* <Box sx={{ padding: '2rem' }}> */}
                <Box>
                  <Box sx={{ marginBottom: '1rem' }}>
                    <TextField
                      margin='normal'
                      sx={{ width: '410px' }}
                      required
                      id='name'
                      label='Name'
                      autoFocus
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Box>
                  <Box sx={{ marginBottom: '1rem' }}>
                    <RangePicker
                      size='large'
                      value={formik.values.rangePicker}
                      onChange={(value) => {
                        formik.setFieldValue('rangePicker', value);
                      }}
                      style={{
                        zIndex: 10,
                        padding: '0.75rem 1rem',
                        width: '410px',
                      }}
                    />
                  </Box>
                  <Box sx={{ marginBottom: '1rem' }}>
                    <Typography variant='body1' fontWeight='bold'>
                      Date apply *
                    </Typography>
                    <Box>
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.mon} />}
                        label='2'
                        name='mon'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.tue} />}
                        label='3'
                        name='tue'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.wed} />}
                        label='4'
                        name='wed'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.thu} />}
                        label='5'
                        name='thu'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.fri} />}
                        label='6'
                        name='fri'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.sat} />}
                        label='7'
                        name='sat'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.sun} />}
                        label='Sun'
                        name='sun'
                        onChange={formik.handleChange}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Typography variant='body1' fontWeight='bold'>
                    Service apply
                  </Typography>
                  <Box>
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
                                  {row.service.name}
                                </TableCell>
                                <TableCell>{row.priority}</TableCell>
                                <TableCell>
                                  {dayjs(row?.applyDate[0]).format(
                                    'DD /MM /YYYY'
                                  )}
                                </TableCell>
                                <TableCell>
                                  {dayjs(row?.applyDate[1]).format(
                                    'DD /MM /YYYY'
                                  )}
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
                    {openRow ? (
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Autocomplete
                          disablePortal
                          id='serviceType'
                          autoFocus
                          options={serviceTypeList}
                          disableClearable
                          getOptionLabel={(option) => option.name}
                          value={selectService}
                          onChange={(_, e) => {
                            setSelectService(e);
                          }}
                          sx={{ width: '20%' }}
                          renderInput={(params) => (
                            <TextField {...params} label='Service' />
                          )}
                        />

                        <TextField
                          margin='normal'
                          required
                          id='priority'
                          label='Priority'
                          value={rowInput.priority}
                          onChange={(e) => {
                            setRowInput((param) => ({
                              ...param,
                              priority: e.target.value,
                            }));
                          }}
                        />
                        <Box>
                          <RangePicker
                            // size='large'
                            value={rowInput.dateRange}
                            onChange={(val) => {
                              setRowInput((param) => ({
                                ...param,
                                dateRange: val,
                              }));
                            }}
                            // style={{
                            //   zIndex: 10,
                            //   padding: '0.75rem 1rem',
                            //   width: '410px',
                            // }}
                          />
                        </Box>
                        <Save onClick={addService} />
                        <Close onClick={cancelServiceItem} />
                      </Box>
                    ) : (
                      <Box>
                        <Button variant='text' onClick={addServiceItem}>
                          + Add service type
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Typography variant='body1' fontWeight='bold'>
                  Price table items
                </Typography>
                <Box>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant='scrollable'
                    scrollButtons
                    aria-label='basic tabs example'
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                      },
                    }}
                  >
                    {boxTypeList.map((e, i) => {
                      return <Tab label={e.name} {...a11yProps(i)} />;
                    })}
                  </Tabs>
                  <Box>
                    {boxTypeList.map((e, i) => {
                      return (
                        <TabPanel value={value} index={i}>
                          <Box>
                            <Box>
                              <TableContainer>
                                <Table
                                  sx={{ minWidth: 650 }}
                                  aria-label='simple table'
                                >
                                  <TableHead
                                    sx={{ backgroundColor: '#f4f6f8' }}
                                  >
                                    <TableRow>
                                      <TableCell>Box size</TableCell>
                                      <TableCell>
                                        Minimum time (minute)
                                      </TableCell>
                                      <TableCell>
                                        Maximum time (minute)
                                      </TableCell>
                                      <TableCell>Price</TableCell>
                                      <TableCell>Description</TableCell>
                                      <TableCell>Action</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {piList.map((row) => {
                                      if (
                                        row.boxType.id == boxTypeList[value].id
                                      ) {
                                        return (
                                          <TableRow
                                            // key={row.id}
                                            sx={{
                                              '&:last-child td,&:last-child th':
                                                {
                                                  border: 0,
                                                },
                                            }}
                                          >
                                            <TableCell
                                              component='th'
                                              scope='row'
                                            >
                                              {row.boxSize.name}
                                            </TableCell>
                                            <TableCell>{row.min}</TableCell>
                                            <TableCell>{row.max}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>
                                              {row.description}
                                            </TableCell>

                                            <TableCell>
                                              <Box sx={{ display: 'flex' }}>
                                                <IconButton
                                                  onClick={(e, i) => {
                                                    e.stopPropagation();
                                                    deleteItem(row.id);
                                                  }}
                                                >
                                                  <DeleteForever
                                                    sx={{ color: red[600] }}
                                                  />
                                                </IconButton>
                                              </Box>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                            {openRowItem ? (
                              <Box sx={{ display: 'flex', gap: 2 }}>
                                <Autocomplete
                                  disablePortal
                                  id='boxSize'
                                  autoFocus
                                  options={boxSizeList}
                                  disableClearable
                                  getOptionLabel={(option) => option.name}
                                  value={selectBoxSize}
                                  onChange={(_, e) => {
                                    setSelectBoxSize(e);
                                  }}
                                  sx={{ width: '20%' }}
                                  renderInput={(params) => (
                                    <TextField {...params} label='Box size' />
                                  )}
                                />
                                <TextField
                                  margin='normal'
                                  required
                                  id='min'
                                  label='Minimum time (minute)'
                                  value={rowInputItem.min}
                                  onChange={(e) => {
                                    setRowInputItem((param) => ({
                                      ...param,
                                      min: e.target.value,
                                    }));
                                  }}
                                />{' '}
                                <TextField
                                  margin='normal'
                                  required
                                  id='max'
                                  label='Maximum time (minute)'
                                  value={rowInputItem.max}
                                  onChange={(e) => {
                                    setRowInputItem((param) => ({
                                      ...param,
                                      max: e.target.value,
                                    }));
                                  }}
                                />
                                <TextField
                                  margin='normal'
                                  required
                                  id='price'
                                  label='Price'
                                  value={rowInputItem.price}
                                  onChange={(e) => {
                                    setRowInputItem((param) => ({
                                      ...param,
                                      price: e.target.value,
                                    }));
                                  }}
                                />{' '}
                                <TextField
                                  margin='normal'
                                  required
                                  id='description'
                                  label='Description'
                                  value={rowInputItem.description}
                                  onChange={(e) => {
                                    setRowInputItem((param) => ({
                                      ...param,
                                      description: e.target.value,
                                    }));
                                  }}
                                />
                                <Save onClick={addItem} />
                                <Close onClick={cancelItem} />
                              </Box>
                            ) : (
                              <Box>
                                <Button variant='text' onClick={addRowItem}>
                                  + Add items
                                </Button>
                              </Box>
                            )}
                          </Box>
                        </TabPanel>
                      );
                    })}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button variant='contained' type='submit'>
                    Add
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default index;
