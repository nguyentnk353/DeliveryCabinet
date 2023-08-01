import {
  useTheme,
  Box,
  Typography,
  IconButton,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from '@mui/material';
import React, { useState } from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from 'react-pro-sidebar';
import {
  StoreOutlined,
  PersonOutlineOutlined,
  StorefrontOutlined,
  FmdGoodOutlined,
  RoomServiceOutlined,
  RequestQuoteOutlined,
  SettingsOutlined,
  HomeOutlined,
  ListAltOutlined,
  StarBorder,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import logo from '.././../../../assets/images/DeliveryPNG.png';
import dlogo from '.././../../../assets/images/DeliveryLogo.png';
import { blue } from '@mui/material/colors';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BiCabinet, BiMenu, BiMenuAltLeft } from 'react-icons/bi';
import { BsBox } from 'react-icons/bs';
import './index.scss';

const index = () => {
  const selected = localStorage.getItem('selected');
  const subConfig = localStorage.getItem('subConfig');
  const { pathname: currentPath } = useLocation();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const theme = useTheme();
  const pcolor = theme.palette.primary.main;
  const plcolor = blue[50];
  const navigate = useNavigate();
  function setSelected(s) {
    localStorage.setItem('selected', s);
  }
  function setSubOpen() {
    if (subConfig === true) localStorage.setItem('subConfig', false);
    if (subConfig === false) localStorage.setItem('subConfig', true);
  }
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
      <div>
        {collapsed ? (
          <MenuItem
            active={selected === title}
            icon={icon}
            onClick={() => {
              setSelected(title);
              navigate(to, { replace: true });
            }}
            style={{
              paddingLeft: '10px',
              borderRadius: '8px',
              marginBottom: '4px',
            }}
          >
            <Typography variant='body2'>{title}</Typography>
          </MenuItem>
        ) : (
          <MenuItem
            active={selected === title}
            icon={icon}
            routerlink={<Link to={to} />}
            onClick={() => {
              setSelected(title);
              navigate(to, { replace: true });
            }}
            style={{
              // padding: '10px 16px 10px 24px',
              borderRadius: '8px',
              marginBottom: '4px',
            }}
          >
            <Typography variant='body2'>{title}</Typography>
          </MenuItem>
        )}
      </div>
    );
  };

  const SubItem = ({ title, to, icon, selected, setSelected }) => {
    return (
      <div>
        {collapsed ? (
          <MenuItem
            active={selected === title}
            icon={icon}
            onClick={() => {
              setSelected(title);
              navigate(to, { replace: true });
            }}
            style={{
              paddingLeft: '10px',
              borderRadius: '8px',
              marginBottom: '4px',
            }}
          >
            <Typography variant='body2'>{title}</Typography>
          </MenuItem>
        ) : (
          <MenuItem
            active={selected === title}
            icon={icon}
            routerlink={<Link to={to} />}
            onClick={() => {
              setSelected(title);
              navigate(to, { replace: true });
            }}
            style={{
              // padding: '10px 16px 10px 24px',
              borderRadius: '8px',
              marginBottom: '4px',
            }}
          >
            <Typography variant='body2'>{title}</Typography>
          </MenuItem>
        )}
      </div>
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
        zIndex: 100,
        '& .ps-menu-button:hover': {
          color: `${pcolor} !important`,
          backgroundColor: `${plcolor} !important`,
        },
        '& .ps-menu-button.ps-active': {
          // color: 'white !important',
          // backgroundColor: `${pcolor} !important`,
          color: `${pcolor} !important`,
          backgroundColor: `${plcolor} !important`,

          '& .css-ksh4t7-MuiTypography-root': {
            fontWeight: '600 !important',
          },
        },
        '& .ps-submenu-expand-icon': {
          display: 'none',
        },
      }}
    >
      {collapsed ? (
        <div
          className='sidebar-toggle'
          onClick={broken ? () => toggleSidebar() : () => collapseSidebar()}
        >
          <BiMenuAltLeft />
        </div>
      ) : (
        <div
          className='sidebar-toggle'
          onClick={broken ? () => toggleSidebar() : () => collapseSidebar()}
        >
          <BiMenu />
        </div>
      )}
      <Sidebar backgroundColor='white'>
        <Menu>
          {collapsed && (
            <MenuItem
              icon={<img src={dlogo} height='24px' width='24px' />}
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
            </Box>
          )}

          <Box>
            {!collapsed ? (
              <Box sx={{ padding: '0 16px' }}>
                <Typography
                  variant='body2'
                  sx={{ p: '16px 0 11px 6px', fontWeight: '600' }}
                >
                  Management
                </Typography>
                <Box>
                  <Item
                    title='Dashboard'
                    icon={<HomeOutlined />}
                    to='/store-owner/dashboard'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Store'
                    icon={<StoreOutlined />}
                    to='/store-owner/store'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  {/* <Item
                    title='Staff'
                    icon={<PersonOutlineOutlined />}
                    to='/store-owner/staff'
                    selected={selected}
                    setSelected={setSelected}
                  /> */}
                </Box>
                <Divider />

                <Box sx={{ width: '200px', height: '50px' }} />
              </Box>
            ) : (
              <Box sx={{ padding: '0 15px 0 10px' }}>
                <Box>
                  <Item
                    title='Dashboard'
                    icon={<HomeOutlined />}
                    to='/store-owner/dashboard'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Store'
                    icon={<StoreOutlined />}
                    to='/store-owner/store'
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Divider />
                <Box sx={{ width: '200px', height: '50px' }} />
              </Box>
            )}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default index;
