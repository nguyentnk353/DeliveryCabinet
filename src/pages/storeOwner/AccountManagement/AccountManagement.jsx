import { Add, DeleteOutline, SearchOutlined } from '@mui/icons-material';
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
import TableAccount from './components/TableAccount';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import ModalNewUser from '../components/ModalNewUser';

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

const AccountManagement = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState({ name: '', id: undefined });
  const [searchText, setSearchText] = useState();
  const handleOpen = () => setOpen(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const bcList = [
    { name: 'Staff', sidebar: 'Staff', to: '/store-owner/staff' },
  ];
  return (
    <Box>
      <ModalNewUser open={open} setOpen={setOpen} />
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
            Staff List
          </Typography>
          <Box>
            <CustomBreadcrumb list={bcList} />
          </Box>
        </Box>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => navigate('/store-owner/new-staff', { replace: true })}
          // onClick={() => handleOpen()}
        >
          New user
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
            // justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {/* <Autocomplete
            disablePortal
            autoFocus
            id='role'
            options={roleList}
            disableClearable
            value={role}
            getOptionLabel={(option) => option.name}
            sx={{ width: '20%' }}
            onChange={(event, newValue) => {
              if (newValue) {
                setRole(newValue);
              }
            }}
            isOptionEqualToValue={(option, value) =>
              option.name === value.name && option.id === value.id
            }
            renderInput={(params) => <TextField {...params} label='Role' />}
          /> */}

          <TextField
            id='search-store-type'
            placeholder='Search...'
            type='search'
            variant='outlined'
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            fullWidth
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

export default AccountManagement;
