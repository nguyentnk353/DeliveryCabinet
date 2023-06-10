import { SearchOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
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
import CreateStore from '../CreateStore';
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
  { name: 'Customer', id: 3 },
  { name: 'Staff', id: 4 },
];

const AccountManagement = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [role, setRole] = useState();
  const [searchText, setSearchText] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: '5%' }}>
      <Box
        sx={{
          marginBottom: '2rem',
        }}
      >
        <Grid container spacing={19} columns={16}>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ fontWeight: '700' }}>
              Account List
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='contained'
              onClick={() => navigate('/admin/new-account', { replace: true })}
            >
              Add New Account
            </Button>
          </Grid>
        </Grid>
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
          }}
        >
          <Autocomplete
            disablePortal
            id='role'
            options={roleList}
            disableClearable
            getOptionLabel={(option) => option.name}
            sx={{ width: '20%' }}
            onChange={(event, newValue) => {
              if (newValue) {
                console.log(newValue)
                setRole(newValue.id);
              }
            }}
            isOptionEqualToValue={(option, value) =>
              option.name === value.name && option.id === value.id
            }
            renderInput={(params) => <TextField {...params} label='Role' />}
          />

          <TextField
            id='search-store-type'
            placeholder='Search...'
            type='search'
            variant='outlined'
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            sx={{
              width: '78%',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TabPanel status={''} value={value} index={0}>
          <Box>
            <TableAccount role={role} search={searchText}/>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box>
            <TableAccount status={true} role={role} search={searchText}/>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box>
            <TableAccount status={false} role={role} search={searchText}/>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default AccountManagement;
