import { useTheme, Box, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import {
  CloseOutlined,
  Store,
  Person,
  MenuOutlined,
} from '@mui/icons-material';
import logo from '.././../../../assets/images/DeliveryPNG.png';
import { blue } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';

const index = () => {
  const [selected, setSelected] = useState('Store Management');
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const theme = useTheme();
  const bacolors = blue[50];
  const acolors = blue[500];
  const navigate = useNavigate();

  const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
      <MenuItem
        active={selected === title}
        icon={icon}
        routerLink={<Link to={to} />}
        onClick={() => {
          setSelected(title);
          navigate(to, { replace: true });
        }}
      >
        <Typography variant='caption'>{title}</Typography>
      </MenuItem>
    );
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        display: 'flex',
        height: '100vh',
        top: 0,
        bottom: 0,
        zIndex: 10000,
        '& .ps-menu-icon': {
          backgroundColor: 'transparent !important',
        },
        '& .ps-menuitem-root': {
          backgroundColor: 'transparent !important',
        },
        '& .ps-menu-button': {
          color: 'inherit !important',
          backgroundColor: 'transparent !important',
        },
        '& .ps-menuitem-root:hover': {
          color: acolors,
          backgroundColor: 'transparent !important',
        },
        '& .ps-menu-button.ps-active': {
          color: `${acolors} !important`,
          backgroundColor: `${bacolors} !important`,
        },
      }}
    >
      <Sidebar backgroundColor='white'>
        <Menu>
          {collapsed && (
            <MenuItem
              icon={<MenuOutlined onClick={() => collapseSidebar()} />}
              style={{ margin: '9% 0' }}
            />
          )}

          {!collapsed && (
            <Box
              display='flex'
              justifyContent='space-between'
              sx={{ p: '5% 0 5% 12%' }}
            >
              <img src={logo} width='120' height='40' />
              <IconButton
                onClick={
                  broken ? () => toggleSidebar() : () => collapseSidebar()
                }
              >
                <CloseOutlined />
              </IconButton>
            </Box>
          )}

          <Box>
            {!collapsed && (
              <Typography
                variant='subtitle2'
                sx={{ p: '10% 0 5% 12%', color: '#5f748d' }}
              >
                Management
              </Typography>
            )}
            <Item
              title='Store Management'
              icon={<Store />}
              to='/admin/store'
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Account Management'
              icon={<Person />}
              to='/admin/account'
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default index;
