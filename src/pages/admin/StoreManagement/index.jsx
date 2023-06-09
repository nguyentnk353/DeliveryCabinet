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
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DeleteOutline, MoreVert, SearchOutlined } from '@mui/icons-material';
import getStoreList from '../../../services/getStoreList';
import { useMount } from 'ahooks';
import { green } from '@mui/material/colors';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import StoreTable from './components/StoreTable';
import { CloseIcon } from '@mui/icons-material/Close';
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

const index = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [msg, sendNotification] = useNotification();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searchText, setSearchText] = useState('');
  const [province, setProvince] = useState({ name: '', key: 0 });
  const [district, setDistrict] = useState({ name: '', key: 0 });
  const [ward, setWard] = useState({ name: '', key: 0 });
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const host = 'https://provinces.open-api.vn/api/';

  useMount(() => {
    if (location?.state?.notifyState?.msg) {
      sendNotification(location?.state?.notifyState);
    }
    return axios.get(host).then((res) => {
      setProvinceList(res.data);
    });
  });
  function callApiDistrict(api) {
    return axios.get(api).then((res) => {
      setDistrictList(res.data.districts);
    });
  }
  function callApiWard(api) {
    return axios.get(api).then((res) => {
      setWardList(res.data.wards);
    });
  }

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
          Store List
        </Typography>
        {/* <Button
          variant='contained'
          onClick={() => navigate('/admin/new-store', { replace: true })}
        >
          + New store
        </Button> */}
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
          <Autocomplete
            disablePortal
            id='province'
            autoFocus
            options={provinceList}
            disableClearable
            getOptionLabel={(option) => option.name}
            value={province}
            onChange={(_, e) => {
              setProvince(e);
              callApiDistrict(host + 'p/' + e.code + '?depth=2');
            }}
            sx={{ width: '20%' }}
            renderInput={(params) => <TextField {...params} label='Province' />}
          />
          <Autocomplete
            disablePortal
            id='district'
            options={districtList}
            disableClearable
            getOptionLabel={(option) => option.name}
            value={district}
            onChange={(_, e) => {
              setDistrict(e);
              callApiWard(host + 'd/' + e.code + '?depth=2');
            }}
            sx={{ width: '20%' }}
            renderInput={(params) => <TextField {...params} label='District' />}
          />
          <Autocomplete
            disablePortal
            id='ward'
            options={wardList}
            disableClearable
            getOptionLabel={(option) => option.name}
            value={ward}
            onChange={(_, e) => {
              setWard(e);
            }}
            // value={ward}
            sx={{ width: '20%' }}
            renderInput={(params) => <TextField {...params} label='Ward' />}
          />
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
                setDistrictList([]);
                setWardList([]);
                setProvince({ name: '', key: 0 });
                setDistrict({ name: '', key: 0 });
                setWard({ name: '', key: 0 });
                setSearchText('');
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          <StoreTable
            province={province}
            city={district}
            district={ward}
            search={searchText}
            isEnable={''}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StoreTable
            province={province}
            city={district}
            district={ward}
            search={searchText}
            isEnable={true}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <StoreTable
            province={province}
            city={district}
            district={ward}
            search={searchText}
            isEnable={false}
          />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default index;
