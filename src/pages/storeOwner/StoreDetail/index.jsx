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
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import PropTypes from 'prop-types';
import { DeleteOutline, MoreVert, SearchOutlined } from '@mui/icons-material';
import LockerTable from './components/LockerTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloseIcon } from '@mui/icons-material/Close';
import { useMount } from 'ahooks';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import storeDefault from '../../../assets/images/storeDefault.jpg';
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
const index = () => {
  const location = useLocation();
  const storeInfo = location?.state?.storeInfo
    ? location?.state?.storeInfo
    : location?.state?.stateLink
    ? location?.state?.stateLink
    : null;
  const storeId = storeInfo?.id;
  const notifyState = location?.state?.notify;
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  const bcList = [
    { name: 'Store', sidebar: 'Store', to: '/store-owner/store' },
    {
      name: 'Store detail',
      sidebar: 'Store',
      to: '/store-owner/store/store-detail',
    },
  ];

  const table = [
    { name: 'Store owner', info: storeInfo?.user?.fullName },
    { name: 'Province', info: storeInfo?.province },
    { name: 'District', info: storeInfo?.city },
    { name: 'Ward', info: storeInfo?.district },
    { name: 'Store type', info: storeInfo?.storeType.name },
    { name: 'Area', info: storeInfo?.area.name },
    { name: 'Service type', info: storeInfo?.serviceType.name },
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
            Store #{storeId} detail
          </Typography>
          <Box>
            <CustomBreadcrumb list={bcList} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginBottom: '2rem' }}>
        <Paper sx={{ borderRadius: '16px', padding: '2rem' }}>
          <Box>
            <Box sx={{ display: 'flex', gap: 5 }}>
              <img
                src={storeInfo?.imgUrl ? storeInfo?.imgUrl : storeDefault}
                alt='store image'
                style={{ width: '50%', height: 'auto' }}
              />
              <Box>
                <Box>
                  <Typography variant='h4' sx={{ fontWeight: '600' }}>
                    {storeInfo?.name}
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ marginBottom: '1rem', fontWeight: '700' }}
                  >
                    Address :{' '}
                    <Typography display='inline' variant='body1'>
                      {storeInfo?.address}
                    </Typography>
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant='body1' sx={{ fontWeight: '700' }}>
                    Description
                  </Typography>
                  <Typography variant='body1' sx={{}}>
                    {storeInfo?.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ margin: '2% 0' }} />
            <Box>
              <Typography
                variant='body1'
                sx={{ fontWeight: '700', marginBottom: '1rem' }}
              >
                Detail information
              </Typography>
              <Box>
                <Table>
                  <TableBody>
                    {table.map((row) => (
                      <TableRow
                        sx={{
                          '&:nth-of-type(odd)': {
                            backgroundColor: '#fafafa',
                          },
                        }}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          sx={{ backgroundColor: '#f0f2f5', fontWeight: '600' }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell>{row.info}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        {/* <Typography variant='h5' sx={{ fontWeight: '600' }}>
          Cabinet List
        </Typography> */}
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
            <Tab label='Cabinet' {...a11yProps(0)} />
            <Tab label='Staff' {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <LockerTable storeId={storeId} isEnable={''} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableAccount
            role={3}
            status={''}
            storeId={storeId}
            storeInfo={storeInfo}
          />
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          <LockerTable search={searchText} storeId={storeId} isEnable={false} />
        </TabPanel> */}
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
