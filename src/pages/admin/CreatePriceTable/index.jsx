import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
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
  Tooltip,
  Typography,
  tabsClasses,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import useNotification from '../../../utils/useNotification';
import createPriceTable from '../../../services/createPriceTable';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import { useMount } from 'ahooks';
import getServiceTypeList from '../../../services/getServiceTypeList';
import {
  ArrowDropDown,
  ArrowDropUp,
  ArrowLeft,
  ArrowRight,
  Close,
  DeleteForever,
  InfoOutlined,
  Save,
} from '@mui/icons-material';
import { blue, red } from '@mui/material/colors';
import moment from 'moment';
import dayjs from 'dayjs';
import getBoxTypeList from '../../../services/getBoxTypeList';
import getBoxSizeList from '../../../services/getBoxSizeList';
import { PropTypes } from 'prop-types';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import useScriptRef from './hooks/useScriptRef';
import { formatVND } from './../../../utils/formatNumber';
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

yup.addMethod(yup.number, 'multi15', function (errorMessage) {
  return this.test(`test-num`, errorMessage, function (value) {
    const { path, createError } = this;
    return value % 15 == 0 || createError({ path, message: errorMessage });
  });
});

const index = ({ ...others }) => {
  const validationSchema = yup.object({
    name: yup.string('Enter price table name').required('Name is required'),
    applyFrom: yup.date().typeError('Invalid Date!'),
    applyTo: yup.date().typeError('Invalid Date!'),
    rangePicker: yup.array().required('Date apply is required'),
  });
  const navigate = useNavigate();
  const scriptedRef = useScriptRef();
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
  const [validService, setValidService] = useState(false);
  const [validItem, setValidItem] = useState(false);
  const [rowInput, setRowInput] = useState({ priority: 1, dateRange: [] });
  const [rowInputItem, setRowInputItem] = useState({
    min: '',
    max: null,
    price: '',
    description: '',
  });
  const [value, setValue] = React.useState(0);
  const [onward, setOnward] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };
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
      if (table.length < 1) {
        setValidService(true);
      } else {
        setValidService(false);
      }
      if (piList.length < 2) {
        setValidItem(true);
      } else {
        setValidItem(false);
      }
      if (table.length > 0 && piList.length > 1) {
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
            maxDuration: e.max == 0 ? null : e.max,
            price: e.price,
            description: e.description,
            boxSizeId: e.boxSize.id,
            boxTypeId: e.boxType.id,
          };
        });

        const serviceList = table.map((e) => {
          return {
            serviceTypeId: e.service.id,
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
        const data = {
          name: '#3',
          applyFrom: '2023-07-01T07:01:04Z',
          applyTo: '2023-08-31T07:01:04Z',
          dateFilter: '1111111',
          priceTableItems: [
            {
              minDuration: '0',
              maxDuration: '15',
              price: '1000',
              description: 'FTPU',
              boxSizeId: 1,
              boxTypeId: 11,
            },
          ],
          serviceConfigs: [
            {
              serviceTypeId: 8,
              priority: '5',
              applyFrom: '2023-07-01T07:01:15Z',
              applyTo: '2023-08-31T07:01:15Z',
            },
          ],
        };

        createPriceTable(api)
          .then(async (res) => {
            if (res.status == 201) {
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
              setPiList([]);
              setTable([]);
              navigate('/admin/price-table');
              await new Promise(() => {
                sendNotification({
                  msg: 'Price table create success',
                  variant: 'success',
                });
              });
            } else {
              console.log(res);
              sendNotification({
                msg: 'Price table create fail',
                variant: 'error',
              });
            }
          })
          .catch((err) => {
            console.log(err.response.data);
            // sendNotification({ msg: err, variant: 'error' });
          });
      }
    },
  });

  function addService() {
    if (selectService && rowInput.priority && rowInput.dateRange) {
      setTable((parram) => [
        ...parram,
        {
          id: Math.floor(Math.random() * 1001),
          service: selectService,
          priority: rowInput.priority,
          applyDate: rowInput.dateRange,
        },
      ]);
    }
    setSelectService(null);
    setRowInput({ priority: 1, dateRange: [] });
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
    if (
      selectBoxSize &&
      boxTypeList[value] &&
      rowInputItem.min &&
      rowInputItem.max &&
      rowInputItem.price
    ) {
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
    }
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

  const bcList = [
    { name: 'Price table', sidebar: 'Service price', to: '/admin/price-table' },
    {
      name: 'New price table',
      sidebar: 'Service price',
      to: '/admin/new-price-table',
    },
  ];
  return (
    <Box>
      <Dialog
        open={openD}
        onClose={handleCloseD}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Conditions for creating price table'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            1. For each box size of each box type there need at least 3 items,
            start and end. <br />
            For example: box type: Normal
            <br />{' '}
            <Box sx={{ paddingLeft: '6.25rem' }}>
              box size: 1x1 , min: 0, max: 15, price: 500 (VND)
            </Box>
            <Box sx={{ paddingLeft: '6.25rem' }}>
              box size: 1x1 , min: 15, max: 60, price: 500 (VND)
            </Box>
            <Box sx={{ paddingLeft: '6.25rem' }}>
              box size: 1x1 , min: 60, max: Onward, price: 1000 (VND)
            </Box>
            2. The first item must have minimum time = 0 and maximum time = 15.
            <br />
            3. The last item must has minimum time equal to the maximum time of
            the item before it and does not have maximum time.
            <Box sx={{ paddingLeft: '2rem' }}>
              Click "Onward" arrow right icon to set maximum time onward.
            </Box>
            4. All item between the first and the last must has minimum time =
            the maximum time of the item before it and the time between minimum
            time and maximum time is multiple of 15.
            <br />
            5. The unit of renting price is VND.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseD} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
        <Box>
          <Paper sx={{ padding: '2% 4%', width: '80%', margin: '2% auto' }}>
            <Box
              component='form'
              id='form-basic'
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Box>
                <Box>
                  <Typography variant='h6' sx={{ fontWeight: '700' }}>
                    Basic information
                  </Typography>
                  <Box sx={{ marginBottom: '1rem', display: 'flex', gap: 4 }}>
                    <TextField
                      margin='normal'
                      sx={{ width: '100%' }}
                      required
                      id='name'
                      label='Name'
                      autoFocus
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                    <div
                      style={{
                        // marginTop: '0.5rem',
                        // padding: '0.75rem',
                        width: '100%',
                      }}
                    >
                      <RangePicker
                        // size='large'
                        value={formik.values.rangePicker}
                        status={
                          formik.touched.rangePicker &&
                          Boolean(formik.errors.rangePicker)
                            ? 'error'
                            : null
                        }
                        onChange={(value) => {
                          formik.setFieldValue('rangePicker', value);
                        }}
                        style={{
                          marginTop: '1rem',
                          padding: '1rem',
                          width: '100%',
                        }}
                      />
                      <Typography variant='caption' color='error'>
                        {formik.touched.rangePicker &&
                          formik.errors.rangePicker}
                      </Typography>
                    </div>
                  </Box>

                  <Box sx={{ marginBottom: '1rem' }}>
                    <Typography variant='body1' fontWeight='600'>
                      Date apply
                    </Typography>
                    <Box>
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.mon} />}
                        label='Monday'
                        name='mon'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.tue} />}
                        label='Tuesday'
                        name='tue'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.wed} />}
                        label='Wednesday'
                        name='wed'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.thu} />}
                        label='Thursday'
                        name='thu'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.fri} />}
                        label='Friday'
                        name='fri'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.sat} />}
                        label='Saturday'
                        name='sat'
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formik.values.sun} />}
                        label='Sunday'
                        name='sun'
                        onChange={formik.handleChange}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />

            <Box sx={{ margin: '1rem 0' }}>
              <Typography
                variant='h6'
                sx={{ fontWeight: '700', marginBottom: '1rem' }}
              >
                Service apply
              </Typography>
              <Box>
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
                                {row.service.name}
                              </TableCell>
                              <TableCell>
                                {
                                  {
                                    1: 'Daily (Yearly)',
                                    2: 'Seasonly (Quarterly)',
                                    3: 'Monthly',
                                    4: 'Weekly',
                                    5: 'Holiday',
                                  }[row.priority]
                                }
                              </TableCell>
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
                )}
              </Box>
              <Formik
                initialValues={{
                  serviceType: null,
                  priority: 1,
                  serviceDate: null,
                  // username: '',
                  // password: '',
                  // submit: null,
                }}
                validationSchema={yup.object().shape({
                  serviceType: yup
                    .object()
                    .required('Service type is required'),
                  serviceDate: yup
                    .array()
                    .required('Date range for service is required'),
                })}
                onSubmit={async (
                  values,
                  { setErrors, setStatus, setSubmitting, resetForm }
                ) => {
                  try {
                    if (scriptedRef.current) {
                      setStatus({ success: true });
                      setSubmitting(false);
                    }

                    setTable((parram) => [
                      ...parram,
                      {
                        id: Math.floor(Math.random() * 1001),
                        service: values.serviceType,
                        priority: values.priority,
                        applyDate: values.serviceDate,
                      },
                    ]);
                    setOpenRow(false);
                    resetForm();
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
                  resetForm,
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
                                  <TextField
                                    {...params}
                                    required
                                    label='Service'
                                    error={Boolean(
                                      touched.serviceType && errors.serviceType
                                    )}
                                    helperText={
                                      touched.serviceType && errors.serviceType
                                    }
                                  />
                                )}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box>
                              <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>
                                  Priority
                                </InputLabel>
                                <Select
                                  labelId='demo-simple-select-label'
                                  id='priority'
                                  name='priority'
                                  label='Priority'
                                  defaultValue={1}
                                  onChange={(e) => {
                                    setFieldValue('priority', e.target.value);
                                  }}
                                >
                                  <MenuItem value={1}>Daily (Yearly)</MenuItem>
                                  <MenuItem value={2}>
                                    Seasonly (Quarterly)
                                  </MenuItem>
                                  <MenuItem value={3}>Monthly</MenuItem>
                                  <MenuItem value={4}>Weekly</MenuItem>
                                  <MenuItem value={5}>Holiday</MenuItem>
                                </Select>
                              </FormControl>
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
                                form='form-service'
                                name='serviceDate'
                                status={
                                  Boolean(
                                    touched.serviceDate && errors.serviceDate
                                  )
                                    ? 'error'
                                    : null
                                }
                                onChange={(val) => {
                                  setFieldValue('serviceDate', val);
                                }}
                                style={{
                                  padding: '1rem',
                                }}
                              />
                              <Typography variant='caption' color='error'>
                                {touched.serviceDate && errors.serviceDate}
                              </Typography>
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
                            component='button'
                            disabled={isSubmitting}
                            form='form-service'
                            type='submit'
                            onClick={() => {
                              if (table.length > 1) {
                                setValidService(false);
                              }
                            }}
                          >
                            <Save sx={{ color: blue[500] }} />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              resetForm();
                              cancelServiceItem();
                            }}
                          >
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
            </Box>
            {validService && (
              <Alert severity='error'>
                Price table need at least one service type!
              </Alert>
            )}
            <Divider />
            <Box sx={{ margin: '1rem 0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='h6' sx={{ fontWeight: '700' }}>
                  Price table items
                </Typography>
                <IconButton color='info' onClick={handleClickOpenD}>
                  <InfoOutlined />
                </IconButton>
              </Box>
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
                          {piList.length > 0 && (
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
                                      <TableCell>Price (VND)</TableCell>
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
                                            <TableCell>
                                              {row.max == 0
                                                ? 'Onward'
                                                : row.max}
                                            </TableCell>
                                            <TableCell>
                                              {formatVND(row.price)}
                                            </TableCell>
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
                          )}
                          <Formik
                            initialValues={{
                              boxSize: null,
                              min: 0,
                              max: 0,
                              price: 0,
                            }}
                            validationSchema={yup.object().shape({
                              boxSize: yup
                                .object()
                                .required('Box size is required'),
                              min: yup
                                .number()
                                .typeError('Only accept number')
                                .min(0, 'Only accept number >=0')
                                .multi15('Only accept number divisible by 15')
                                .required('Min duration is required'),
                              // .test((val) => console.log(val)),
                              // .positive('Only accept number >=0'),
                              max: yup
                                .number()
                                .typeError('Only accept number')
                                .min(0, 'Only accept number >=0')
                                .multi15('Only accept number divisible by 15')
                                .required('Max duration is required'),
                              // .positive('Only accept number >=0'),
                              price: yup
                                .number()
                                .typeError('Only accept number')
                                .min(0, 'Only accept number >=0')
                                .required('Price is required'),
                              // .positive('Only accept number >=0'),
                            })}
                            onSubmit={async (
                              values,
                              { setErrors, setStatus, setSubmitting, resetForm }
                            ) => {
                              try {
                                if (scriptedRef.current) {
                                  setStatus({ success: true });
                                  setSubmitting(false);
                                }

                                setPiList((parram) => [
                                  ...parram,
                                  {
                                    id: Math.floor(Math.random() * 1001),
                                    boxSize: values.boxSize,
                                    boxType: boxTypeList[value],
                                    min: values.min,
                                    max: values.max,
                                    price: values.price,
                                    description: values.description,
                                  },
                                ]);

                                setOpenRowItem(false);
                                resetForm();
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
                              resetForm,
                            }) => (
                              <Form
                                id='form-item'
                                noValidate
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleSubmit();
                                }}
                              >
                                {openRowItem ? (
                                  <Box>
                                    <Grid container spacing={2}>
                                      <Grid item xs={3}>
                                        <Box sx={{ paddingTop: '1rem' }}>
                                          <Autocomplete
                                            disablePortal
                                            id='boxSize'
                                            name='boxSize'
                                            form='form-item'
                                            autoFocus
                                            options={boxSizeList}
                                            disableClearable
                                            getOptionLabel={(option) =>
                                              option.name
                                            }
                                            onChange={(_, e) => {
                                              setFieldValue('boxSize', e);
                                            }}
                                            sx={{
                                              width: '100%',
                                              margin: 'auto',
                                            }}
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                label='Box size'
                                                error={Boolean(
                                                  touched.boxSize &&
                                                    errors.boxSize
                                                )}
                                                helperText={
                                                  touched.boxSize &&
                                                  errors.boxSize
                                                }
                                              />
                                            )}
                                          />
                                        </Box>
                                      </Grid>
                                      <Grid item xs={3}>
                                        <TextField
                                          margin='normal'
                                          required
                                          id='min'
                                          form='form-item'
                                          name='min'
                                          label='Minimum time (minute)'
                                          value={values.min}
                                          onChange={handleChange}
                                          error={Boolean(
                                            touched.min && errors.min
                                          )}
                                          helperText={touched.min && errors.min}
                                          InputProps={{
                                            endAdornment: (
                                              <>
                                                <Tooltip title='Increase'>
                                                  <IconButton
                                                    onClick={() => {
                                                      if (!isNaN(+values.min)) {
                                                        setFieldValue(
                                                          'min',
                                                          values.min + 15
                                                        );
                                                      } else {
                                                        setFieldValue(
                                                          'min',
                                                          15
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    <ArrowDropUp />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Decrease'>
                                                  <IconButton
                                                    onClick={() => {
                                                      if (values.min > 0)
                                                        setFieldValue(
                                                          'min',
                                                          values.min - 15
                                                        );
                                                    }}
                                                  >
                                                    <ArrowDropDown />
                                                  </IconButton>
                                                </Tooltip>
                                              </>
                                            ),
                                          }}
                                        />
                                      </Grid>
                                      <Grid item xs={3}>
                                        {onward ? (
                                          <TextField
                                            margin='normal'
                                            required
                                            id='fake-max'
                                            name='fake-max'
                                            label='Maximum time (minute)'
                                            value='Onward'
                                            disabled
                                            InputProps={{
                                              endAdornment: (
                                                <>
                                                  <Tooltip title='Back'>
                                                    <IconButton
                                                      onClick={() => {
                                                        setOnward(false);
                                                      }}
                                                    >
                                                      <ArrowLeft />
                                                    </IconButton>
                                                  </Tooltip>
                                                </>
                                              ),
                                            }}
                                          />
                                        ) : (
                                          <TextField
                                            margin='normal'
                                            required
                                            id='max'
                                            form='form-item'
                                            name='max'
                                            label='Maximum time (minute)'
                                            value={values.max}
                                            onChange={handleChange}
                                            error={Boolean(
                                              touched.max && errors.max
                                            )}
                                            helperText={
                                              touched.max && errors.max
                                            }
                                            InputProps={{
                                              endAdornment: (
                                                <>
                                                  <Tooltip title='Increase'>
                                                    <IconButton
                                                      onClick={() => {
                                                        if (
                                                          !isNaN(+values.max)
                                                        ) {
                                                          setFieldValue(
                                                            'max',
                                                            values.max + 15
                                                          );
                                                        } else {
                                                          setFieldValue(
                                                            'max',
                                                            15
                                                          );
                                                        }
                                                      }}
                                                    >
                                                      <ArrowDropUp />
                                                    </IconButton>
                                                  </Tooltip>
                                                  <Tooltip title='Decrease'>
                                                    <IconButton
                                                      onClick={() => {
                                                        if (values.max > 0)
                                                          setFieldValue(
                                                            'max',
                                                            values.max - 15
                                                          );
                                                      }}
                                                    >
                                                      <ArrowDropDown />
                                                    </IconButton>
                                                  </Tooltip>
                                                  <Tooltip title='Onward'>
                                                    <IconButton
                                                      onClick={() => {
                                                        setOnward(true);
                                                        setFieldValue('max', 0);
                                                      }}
                                                    >
                                                      <ArrowRight />
                                                    </IconButton>
                                                  </Tooltip>
                                                </>
                                              ),
                                            }}
                                          />
                                        )}
                                      </Grid>
                                      <Grid item xs={3}>
                                        <TextField
                                          margin='normal'
                                          required
                                          id='price'
                                          form='form-item'
                                          nme='price'
                                          label='Price (VND)'
                                          value={values.price}
                                          onChange={handleChange}
                                          error={Boolean(
                                            touched.price && errors.price
                                          )}
                                          helperText={
                                            touched.price && errors.price
                                          }
                                        />
                                      </Grid>
                                    </Grid>
                                    <Box>
                                      <TextField
                                        margin='normal'
                                        form='form-item'
                                        id='description'
                                        name='description'
                                        label='Description'
                                        fullWidth
                                        value={values.description}
                                        onChange={handleChange}
                                      />
                                    </Box>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 1,
                                        padding: '1rem 0',
                                      }}
                                    >
                                      <IconButton
                                        type='submit'
                                        form='form-item'
                                      >
                                        <Save sx={{ color: blue[500] }} />
                                      </IconButton>
                                      <IconButton
                                        onClick={() => {
                                          resetForm();
                                          cancelItem();
                                          setOnward(false);
                                        }}
                                      >
                                        <Close sx={{ color: red[500] }} />
                                      </IconButton>
                                    </Box>
                                  </Box>
                                ) : (
                                  <Box sx={{ padding: '1rem 0' }}>
                                    <Button
                                      variant='outlined'
                                      onClick={addRowItem}
                                    >
                                      + Add items
                                    </Button>
                                  </Box>
                                )}
                              </Form>
                            )}
                          </Formik>
                        </Box>
                        {validItem && (
                          <Alert severity='error'>
                            Price table need at least 2 items of start and end
                            price!
                          </Alert>
                        )}
                      </TabPanel>
                    );
                  })}
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
                  onClick={() => navigate('/admin/price-table', {})}
                >
                  Cancel
                </Button>
                <Button type='submit' variant='contained' form='form-basic'>
                  Create new price table
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default index;
