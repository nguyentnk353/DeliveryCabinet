import {
  Add,
  DeleteOutline,
  Home,
  NavigateNext,
  SearchOutlined,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  InputAdornment,
  Link,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import TableAccount from './components/TableAccount';

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

const roleList = [
  { name: 'Admin', id: 1 },
  { name: 'Store Owner', id: 2 },
  { name: 'Customer', id: 4 },
  { name: 'Staff', id: 3 },
];

const CustomerManagement = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [role, setRole] = useState({ name: '', id: undefined });
  const [searchText, setSearchText] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const bcList = [
    { name: 'Customer', sidebar: 'Customer', to: '/admin/customer' },
  ];

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
            Customer List
          </Typography>
          <Box>
            <CustomBreadcrumb list={bcList} />
          </Box>
        </Box>
        {/* <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => navigate('/admin/new-user', { replace: true })}
        >
          New customer
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
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TextField
            id='search-store-type'
            placeholder='Search...'
            type='search'
            fullWidth
            variant='outlined'
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
              // sx={{ marginLeft: '1rem', paddingTop: '15px' }}
              onClick={() => {
                setRole({ name: '', id: undefined });
                setSearchText('');
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
        <TabPanel status={''} value={value} index={0}>
          <Box>
            <TableAccount role={role?.id} search={searchText} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box>
            <TableAccount status={true} role={role?.id} search={searchText} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box>
            <TableAccount status={false} role={role?.id} search={searchText} />
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default CustomerManagement;
