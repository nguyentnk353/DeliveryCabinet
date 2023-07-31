import { Box } from '@mui/material';
import React from 'react';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/Footer';

const index = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#fafafb' }}
    >
      <SideBar />
      <Box sx={{ display: 'flex', flex: '1 1', flexDirection: 'column' }}>
        <NavBar />
        <Box sx={{ p: '2% 4%' }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default index;
