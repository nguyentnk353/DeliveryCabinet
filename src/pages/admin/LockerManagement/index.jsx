import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import PropTypes from 'prop-types';
import { DeleteOutline, MoreVert, SearchOutlined } from '@mui/icons-material';
import LockerTable from './components/LockerTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloseIcon } from '@mui/icons-material/Close';
import { useMount } from 'ahooks';

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
  const location = useLocation();
  const storeId = location.state.storeId;
  const notifyState = location.state.notify;
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searchText, setSearchText] = useState('');

  const [notify, setNotify] = React.useState({
    isOpen: false,
    msg: '',
    type: 'info',
  });

  const handleNotifyClick = () => {
    setNotify((preState) => ({ ...preState, isOpen: true }));
  };

  const handleNotifyClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotify((preState) => ({ ...preState, isOpen: false }));
  };

  useMount(() => {
    if (notifyState) {
      setNotify((preState) => ({
        ...preState,
        isOpen: notifyState.isOpen,
        msg: notifyState.msg,
        type: notifyState.type,
      }));
    }
  });

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleNotifyClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

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
          Locker List
        </Typography>
        <Button
          variant='contained'
          onClick={() =>
            navigate('/admin/new-locker', {
              state: {
                storeId: storeId,
              },
            })
          }
        >
          + New locker
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
        <TabPanel value={value} index={0}>
          <LockerTable search={searchText} isEnable={''} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LockerTable search={searchText} isEnable={true} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <LockerTable search={searchText} isEnable={false} />
        </TabPanel>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={notify.isOpen}
        autoHideDuration={3000}
        onClose={handleNotifyClose}
        action={action}
        variant={notify.type}
      >
        <Alert
          severity={notify.type}
          onClose={handleNotifyClose}
          autoHideDuration={3000}
        >
          {notify.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default index;
