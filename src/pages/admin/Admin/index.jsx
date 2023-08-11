import React, { useEffect } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/AdminSideBar';
import { Outlet } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import Footer from '../../../components/Footer';
import {
  IconBox,
  IconBuildingStore,
  IconFileDollar,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { IconDashboard, IconNotes } from '@tabler/icons-react';

import './index.scss';
import { IconArticle } from '@tabler/icons-react';
import { IconMapPinPlus } from '@tabler/icons-react';
import { styled } from '@mui/material/styles';

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
          to: '/admin/dashboard',
          icon: IconDashboard,
        },
        {
          id: 'order',
          title: 'Order',
          type: 'item',
          to: '/admin/order',
          icon: IconNotes,
        },
        {
          id: 'user',
          title: 'User',
          type: 'item',
          to: '/admin/user',
          icon: IconUser,
        },
        {
          id: 'cabinet',
          title: 'Cabinet',
          type: 'item',
          to: '/admin/cabinet',
          icon: IconArticle,
        },
        {
          id: 'store',
          title: 'Store',
          type: 'item',
          to: '/admin/store',
          icon: IconBuildingStore,
        },
      ],
    },
    {
      id: 'service',
      title: 'Service',
      type: 'group',
      children: [
        {
          id: 'servicePrice',
          title: 'Service price',
          type: 'item',
          to: '/admin/price-table',
          icon: IconFileDollar,
        },

        {
          id: 'customer',
          title: 'Customer',
          type: 'item',
          to: '/admin/customer',
          icon: IconUser,
        },
        {
          id: 'config',
          title: 'Config',
          type: 'collapse',
          // to: '/admin/config',
          icon: IconSettings,
          children: [
            {
              id: 'storeConfig',
              title: 'Store config',
              type: 'item',
              to: '/admin/store-config',
              // icon: IconMapPinPlus,
            },
            {
              id: 'boxConfig',
              title: 'Box config',
              type: 'item',
              to: '/admin/box-config',
              // icon: IconBox,
            },
          ],
        },
      ],
    },
  ];
  const [toggle, setToggle] = React.useState(true);
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      ...theme.typography.mainContent,
      ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }),
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
      }),
    })
  );

  return (
    // <Box
    //   sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#fafafb' }}
    // >
    //   <AdminSideBar />
    //   <Box sx={{ display: 'flex', flex: '1 1', flexDirection: 'column' }}>
    //     <AdminNavBar />
    //     <Box sx={{ p: '2% 4%' }}>
    //       <Outlet />
    //     </Box>
    //     <Footer />
    //   </Box>
    // </Box>
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
