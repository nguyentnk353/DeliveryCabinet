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
import {
  Add,
  DeleteOutline,
  MoreVert,
  SearchOutlined,
} from '@mui/icons-material';
import OrderTable from './components/OrderTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloseIcon } from '@mui/icons-material/Close';
import { useMount } from 'ahooks';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
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
  // const storeId = location.state.storeId;
  const notifyState = location?.state?.notify;
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
  const bcList = [{ name: 'Order', sidebar: 'Order', to: '/admin/order' }];
  return (
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
            Order List
          </Typography>
          <Box>
            <CustomBreadcrumb list={bcList} />
          </Box>
        </Box>
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
            <Tab label='Ongoing' {...a11yProps(1)} />
            <Tab label='Complete' {...a11yProps(2)} />
            <Tab label='Cancel' {...a11yProps(3)} />
            <Tab label='Overdue' {...a11yProps(4)} />
          </Tabs>
        </Box>
        <Box
          sx={{
            p: '2%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TextField
            id='filled-search'
            placeholder='Search...'
            type='search'
            variant='outlined'
            fullWidth
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
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
          <OrderTable search={searchText} isEnable={''} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrderTable search={searchText} isEnable={1} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <OrderTable search={searchText} isEnable={2} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <OrderTable search={searchText} isEnable={0} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <OrderTable search={searchText} isEnable={3} />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default index;
