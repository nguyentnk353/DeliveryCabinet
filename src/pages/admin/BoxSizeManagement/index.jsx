import {
  Box,
  Button,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Modal,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DeleteOutline, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import * as yup from 'yup';
import { useFormik } from 'formik';
import createBoxSize from '../../../services/createBoxSize';
import BoxSizeTable from './components/BoxSizeTable';
import useNotification from '../../../utils/useNotification';

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
  name: yup.string('Enter box size name').required('Name is required'),
  length: yup
    .number()
    .required('Length is required')
    .positive('Accept only positive integer > 0')
    .integer('Accept only positive integer > 0'),
  height: yup
    .number()
    .required('Height is required')
    .positive('Accept only positive integer > 0')
    .integer('Accept only positive integer > 0'),
  price: yup
    .number('Accept only positive number > 0')
    .required('Price is required')
    .positive('Accept only positive number > 0'),
});
const index = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [msg, sendNotification] = useNotification();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm({
      values: {
        name: '',
        length: 0,
        height: 0,
        description: '',
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

  const [createSuccess, setCreateSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      length: 0,
      height: 0,
      description: '',
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const api = {
        name: val.name,
        length: val.length,
        height: val.height,
        description: val.description,
        multiplyPrice: val.price,
      };

      createBoxSize(api)
        .then((res) => {
          if (res.status == 201) {
            sendNotification({
              msg: 'Box size create success',
              variant: 'success',
            });
            setCreateSuccess(true);
          } else {
            sendNotification({ msg: 'Box size create fail', variant: 'error' });
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
            ADD NEW BOX SIZE
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
                required
                id='name'
                label='Name'
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='length'
                  label='Length'
                  autoFocus
                  value={formik.values.length}
                  onChange={formik.handleChange}
                  error={formik.touched.length && Boolean(formik.errors.length)}
                  helperText={formik.touched.length && formik.errors.length}
                />
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='height'
                  label='Height'
                  autoFocus
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  error={formik.touched.height && Boolean(formik.errors.height)}
                  helperText={formik.touched.height && formik.errors.height}
                />
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='price'
                  label='Price'
                  autoFocus
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Box>
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
          Box size management
        </Typography>
        <Button variant='contained' onClick={handleOpen}>
          + New box size
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
            <BoxSizeTable
              searchText={searchText}
              createSuccess={createSuccess}
              isEnable={''}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BoxSizeTable
              searchText={searchText}
              createSuccess={createSuccess}
              isEnable={true}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BoxSizeTable
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
