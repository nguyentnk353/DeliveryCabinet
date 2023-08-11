import { Inbox, Mail } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import React from 'react';
import NavGroup from './components/NavGroup';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
const index = ({ list, toggle, setToggle }) => {
  const drawerWidth = 260;
  const menuList = list.map((item) => (
    <NavGroup key={item.id} item={item} toggle={toggle} />
  ));
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const openedMixin = (theme) => ({
    width: drawerWidth,
    borderRight: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    borderRight: 'none',
    width: `calc(${theme.spacing(7)} + 16px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 16px)`,
    },
  });
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }));
  const handleLeftDrawerToggle = () => {
    setToggle(false);
  };

  return (
    <Drawer
      // container={container}
      variant='permanent'
      // variant='persistent'
      open={toggle}
      onClose={handleLeftDrawerToggle}
      // anchor='left'
      // sx={{
      //   width: drawerWidth,
      //   flexShrink: 0,
      //   [`& .MuiDrawer-paper`]: {
      //     width: drawerWidth,
      //     boxSizing: 'border-box',
      //     borderRight: 'none',
      //   },
      // }}
      // ModalProps={{ keepMounted: true }}
      // color='inherit'
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <PerfectScrollbar
          component='div'
          style={{
            height: 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {menuList}
        </PerfectScrollbar>
      </Box>
    </Drawer>
  );
};

export default index;
