import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/AdminSideBar';
import { Outlet } from 'react-router-dom';
import './index.scss';
import { Box } from '@mui/material';

const index = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#fafafb' }}
    >
      <AdminSideBar />
      <Box sx={{ display: 'flex', flex: '1 1', flexDirection: 'column' }}>
        <AdminNavBar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default index;
