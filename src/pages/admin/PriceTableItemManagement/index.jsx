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

import { useLocation, useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';

import * as yup from 'yup';
import { useFormik } from 'formik';
import useNotification from '../../../utils/useNotification';
import createPriceTable from './../../../services/createPriceTable';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import moment from 'moment';
import moment from 'moment-timezone';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PriceTableItemTable from './components/PriceTableItemTable';
import createPriceTableItem from '../../../services/createPriceTableItem';

moment.tz.setDefault('America/Los_Angeles');
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

const validationSchema = yup.object({
  minDuration: yup
    .number('Accept only positive number > 0')
    .required('Price is required')
    .positive('Accept only positive number > 0'),
  maxDuration: yup
    .number('Accept only positive number > 0')
    .required('Price is required')
    .positive('Accept only positive number > 0'),
  unitPrice: yup
    .number('Accept only positive number > 0')
    .required('Price is required')
    .positive('Accept only positive number > 0'),
});
const index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [msg, sendNotification] = useNotification();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm({
      values: {
        minDuration: 0,
        maxDuration: 0,
        unitPrice: 0,
        description: '',
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
      minDuration: 0,
      maxDuration: 0,
      unitPrice: 0,
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const api = {
        minDuration: val.minDuration,
        maxDuration: val.maxDuration,
        unitPrice: val.unitPrice,
        description: val.description,
        priceTableId: location?.state?.priceTable?.id,
      };

      createPriceTableItem(api)
        .then((res) => {
          if (res.status == 201) {
            sendNotification({
              msg: 'Price table items create success',
              variant: 'success',
            });
            setCreateSuccess(true);
          } else {
            sendNotification({
              msg: 'Price table items create fail',
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
            ADD NEW PRICE TABLE ITEMS
          </Typography>
          <Box
            component='form'
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box sx={{ padding: '2rem' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='minDuration'
                  label='Min duration'
                  autoFocus
                  value={formik.values.minDuration}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.minDuration &&
                    Boolean(formik.errors.minDuration)
                  }
                  helperText={
                    formik.touched.minDuration && formik.errors.minDuration
                  }
                />
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='maxDuration'
                  label='Max duration'
                  value={formik.values.maxDuration}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.maxDuration &&
                    Boolean(formik.errors.maxDuration)
                  }
                  helperText={
                    formik.touched.maxDuration && formik.errors.maxDuration
                  }
                />
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='unitPrice'
                  label='Unit price'
                  value={formik.values.unitPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.unitPrice && Boolean(formik.errors.unitPrice)
                  }
                  helperText={
                    formik.touched.unitPrice && formik.errors.unitPrice
                  }
                />
              </Box>
              <TextField
                margin='normal'
                fullWidth
                id='description'
                label='Description'
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
          Price table items management
        </Typography>
        <Button variant='contained' onClick={handleOpen}>
          + New price table items
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
            <PriceTableItemTable
              searchText={searchText}
              createSuccess={createSuccess}
              isEnable={''}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PriceTableItemTable
              searchText={searchText}
              createSuccess={createSuccess}
              isEnable={true}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PriceTableItemTable
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
