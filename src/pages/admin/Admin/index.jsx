import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/AdminSideBar';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import Footer from '../../../components/Footer';

import './index.scss';
const index = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#fafafb' }}
    >
      <AdminSideBar />
      <Box sx={{ display: 'flex', flex: '1 1', flexDirection: 'column' }}>
        <AdminNavBar />
        <Box sx={{ p: '2% 4%' }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
    // <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //   <AdminNavBar />
    //   <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    //     <AdminSideBar />
    //     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //       <Box sx={{ backgroundColor: '#fafafb' }}>
    //         <Outlet />
    //       </Box>
    //       <Footer />
    //     </Box>
    //   </Box>
    // </Box>
  );
};

export default index;
