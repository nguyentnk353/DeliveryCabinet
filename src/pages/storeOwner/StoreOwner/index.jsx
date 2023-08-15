import { Box, Toolbar } from '@mui/material';
import React from 'react';
// import SideBar from '../components/SideBar';
// import NavBar from '../components/NavBar';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/Footer';
import {
  IconBuildingStore,
  IconDashboard,
  IconNotes,
  IconUser,
} from '@tabler/icons-react';

const index = () => {
  const list = [
    {
      id: 'management',
      title: 'Management',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          to: '/store-owner/dashboard',
          icon: IconDashboard,
        },
        {
          id: 'store',
          title: 'Store',
          type: 'item',
          to: '/store-owner/store',
          icon: IconBuildingStore,
        },
        {
          id: 'order',
          title: 'Order',
          type: 'item',
          to: '/store-owner/order',
          icon: IconNotes,
        },
        {
          id: 'staff',
          title: 'Staff',
          type: 'item',
          to: '/store-owner/staff',
          icon: IconUser,
        },
      ],
    },
  ];
  const [toggle, setToggle] = React.useState(true);
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar toggle={toggle} setToggle={setToggle} />
      <Sidebar list={list} toggle={toggle} setToggle={setToggle} />
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box
          sx={{
            // backgroundColor: '#fafafb',
            backgroundColor: '#eef2f6',
            borderRadius: '8px 8px 0 0',
            p: '2% 4%',
            minHeight: 'calc(100vh - 88px)',
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default index;
