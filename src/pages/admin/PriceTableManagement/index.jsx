import {
  Box,
  Button,
  Paper,
  Typography,
  Tabs,
  Tab,
  Autocomplete,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Divider,
  Chip,
  useTheme,
  IconButton,
  Modal,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DeleteOutline, SearchOutlined } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';

import * as yup from 'yup';
import { useFormik } from 'formik';
import useNotification from '../../../utils/useNotification';
import PriceTableTable from './components/PriceTableTable';
import createPriceTable from './../../../services/createPriceTable';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

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

const validationSchema = yup.object({});
const index = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [msg, sendNotification] = useNotification();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm({
      values: {
        name: '',
        price: 0,
      },
    });
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [searchText, setSearchText] = useState('');
  const [createSuccess, setCreateSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      applyFrom: null,
      applyTo: null,
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

      const api = {
        name: val.name,
        applyFrom: moment(val.applyFrom).format(),
        applyTo: moment(val.applyTo).format(),
        dateFilter: parseInt(bi.join(''), 2),
      };

      createPriceTable(api)
        .then((res) => {
          if (res.status == 201) {
            sendNotification({
              msg: 'Price table create success',
              variant: 'success',
            });
            setCreateSuccess(true);
          } else {
            sendNotification({
              msg: 'Price table create fail',
              variant: 'error',
            });
          }
          handleClose();
        })
        .catch((err) => {
          sendNotification({ msg: err, variant: 'error' });
        });
    },
  });
  return (
    <Box sx={{ p: '5%' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h5'
            component='h2'
            textAlign='center'
            fontWeight='bold'
            color={blue[500]}
          >
            ADD NEW PRICE TABLE
          </Typography>
          <Box
            component='form'
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box sx={{ padding: '2rem' }}>
              <TextField
                margin='normal'
                fullWidth
                id='name'
                label='Name'
                autoFocus
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label='Apply from'
                    id='applyFrom'
                    name='applyFrom'
                    value={formik.values.applyFrom}
                    onChange={(value) => {
                      formik.setFieldValue('applyFrom', value);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label='Apply to'
                    id='applyTo'
                    name='applyTo'
                    value={formik.values.applyTo}
                    onChange={(value) => {
                      formik.setFieldValue('applyTo', value);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
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
              <Button variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <Typography variant='h6' fontWeight='bold'>
          Price table management
        </Typography>
        <Button variant='contained' onClick={handleOpen}>
          + New price table
        </Button>
      </Box>

      <Paper sx={{ borderRadius: '16px' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: '#f4f6f8',
            borderRadius: '16px 16px 0 0',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='All' {...a11yProps(0)} />
            <Tab label='Active' {...a11yProps(1)} />
            <Tab label='Inactive' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box
          sx={{
            p: '2%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <TextField
            id='filled-search'
            placeholder='Search...'
            type='search'
            variant='outlined'
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            sx={{ width: '30%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
          <Box>
            <Button
              color='error'
              startIcon={<DeleteOutline />}
              sx={{ marginLeft: '1rem' }}
              onClick={() => {
                setSearchText('');
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
        <Box>
          <TabPanel value={value} index={0}>
            <PriceTableTable
              searchText={searchText}
              createSuccess={createSuccess}
              isEnable={''}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PriceTableTable
              searchText={searchText}
              createSuccess={createSuccess}
              isEnable={true}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PriceTableTable
              searchText={searchText}
              createSuccess={createSuccess}
              isEnable={false}
            />
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};

export default index;
