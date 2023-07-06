import { useTheme, Box, Typography, IconButton, Divider } from '@mui/material';
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
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
} from '@mui/icons-material';
import logo from '.././../../../assets/images/DeliveryPNG.png';
import dlogo from '.././../../../assets/images/DeliveryLogo.png';
import { blue } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BiCabinet, BiMenu, BiMenuAltLeft } from 'react-icons/bi';
import { BsBox } from 'react-icons/bs';
import './index.scss';

const index = () => {
  const selected = localStorage.getItem('selected');
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const theme = useTheme();
  const pcolor = theme.palette.primary.main;
  const plcolor = blue[50];
  const navigate = useNavigate();
  function setSelected(s) {
    localStorage.setItem('selected', s);
  }

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
              borderRadius: '12px',
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
              padding: '10px 16px 10px 24px',
              borderRadius: '12px',
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
          color: 'white !important',
          backgroundColor: `${pcolor} !important`,
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
                    to='/admin/store'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Order'
                    icon={<ListAltOutlined />}
                    to='/admin/store'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Customer'
                    icon={<PersonOutlineOutlined />}
                    to='/admin/customer'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Cabinet'
                    icon={<BiCabinet />}
                    to='/admin/cabinet'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Store'
                    icon={<StoreOutlined />}
                    to='/admin/store'
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Divider />
                <Typography
                  variant='body2'
                  sx={{ p: '16px 0 11px 6px', fontWeight: '600' }}
                >
                  Service
                </Typography>
                <Box>
                  <Item
                    title='Service price'
                    icon={<RequestQuoteOutlined />}
                    to='/admin/price-table'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Account'
                    icon={<PersonOutlineOutlined />}
                    to='/admin/account'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Config'
                    icon={<SettingsOutlined />}
                    to='/admin/config'
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Divider />

                <Box sx={{ width: '200px', height: '50px' }} />
              </Box>
            ) : (
              <Box sx={{ padding: '0 15px 0 10px' }}>
                <Box>
                  <Item
                    title='Store'
                    icon={<StoreOutlined />}
                    to='/admin/store'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Store Type'
                    icon={<StorefrontOutlined />}
                    to='/admin/store-type'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Area'
                    icon={<FmdGoodOutlined />}
                    to='/admin/store'
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Divider sx={{ marginBottom: '4px' }} />

                <Box>
                  <Item
                    title='Account'
                    icon={<PersonOutlineOutlined />}
                    to='/admin/account'
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Divider sx={{ marginBottom: '4px' }} />

                <Box>
                  <Item
                    title='Cabinet'
                    icon={<BiCabinet />}
                    to='/admin/cabinet'
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Divider />

                <Box>
                  <Item
                    title='Box size'
                    icon={<BiCabinet />}
                    to='/admin/box-size'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Box type'
                    icon={<BsBox />}
                    to='/admin/box-type'
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Divider sx={{ marginBottom: '4px' }} />
                <Box>
                  <Item
                    title='Price table'
                    icon={<RequestQuoteOutlined />}
                    to='/admin/price-table'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Service type'
                    icon={<RoomServiceOutlined />}
                    to='/admin/service-type'
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title='Service config'
                    icon={<SettingsOutlined />}
                    to='/admin/service-config'
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                <Divider sx={{ marginBottom: '4px' }} />
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
