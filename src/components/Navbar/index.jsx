import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import logo from '../../assets/images/DeliveryPNG.png';
import React, { useEffect } from 'react';
import { BiMenu, BiMenuAltLeft } from 'react-icons/bi';
import {
  AccountCircle,
  KeyboardArrowDown,
  Logout,
  Person,
  PersonOutlineOutlined,
} from '@mui/icons-material';
import LogoutFunction from '../../utils/LogoutFunction';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'ahooks';
import getUserList from '../../services/getUserList';
import { useState } from 'react';
import useNotification from '../../utils/useNotification';

const index = ({ toggle, setToggle }) => {
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem('loginUser'));
  const [user, setUser] = useState(null);
  const sidebarToggle = JSON.parse(localStorage.getItem('sidebarToggle'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  useMount(() => {
    const payload = {
      Id: loginUser?.Id,
    };
    getUserList(payload)
      .then((res) => {
        setUser(res.items[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // useEffect(() => {
  //   const payload = {
  //     Id: loginUser?.Id,
  //   };
  //   getUserList(payload)
  //     .then((res) => {
  //       setUser(res.items[0]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  const logout = LogoutFunction();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDrawerOpen() {
    setToggle(true);
  }
  function handleDrawerClose() {
    setToggle(false);
  }
  function toProfile() {
    handleClose();
    loginUser.Role == 1
      ? navigate('/admin/profile', { replace: true })
      : navigate('/store-owner/profile', { replace: true });
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: (theme) => theme.palette.background.default,
        color: 'black',
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* <Typography variant='h6'>Clipped drawer</Typography> */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 228,
            alignItems: 'center',
          }}
        >
          <img src={logo} style={{ width: '120px', height: '45px' }} />
          {toggle ? (
            <Avatar
              variant='rounded'
              sx={{
                height: '34px',
                width: '34px',
                fontSize: '1.2rem',
                backgroundColor: '#e3f2fd',
                color: '#2196f3',
                transition: 'all .2s ease-in-out',
                cursor: 'pointer',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#2196f3',
                  color: 'white',
                },
              }}
              color='inherit'
              onClick={handleDrawerClose}
            >
              <BiMenu stroke={1.5} size='1.3rem' />
            </Avatar>
          ) : (
            <Avatar
              variant='rounded'
              sx={{
                height: '34px',
                width: '34px',
                fontSize: '1.2rem',
                backgroundColor: '#e3f2fd',
                color: '#2196f3',
                transition: 'all .2s ease-in-out',
                cursor: 'pointer',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#2196f3',
                  color: 'white',
                },
              }}
              color='inherit'
              onClick={handleDrawerOpen}
            >
              <BiMenuAltLeft stroke={1.5} size='1.3rem' />
            </Avatar>
          )}
        </Box>
        <Box>
          <ButtonBase
            sx={{ display: 'flex', gap: 1, padding: 1, borderRadius: '8px' }}
            onClick={handleMenu}
          >
            {user ? (
              <Avatar
                alt='login user avatar'
                src={user?.imgUrl}
                sx={{ width: '34px', height: '34px' }}
              />
            ) : (
              <Avatar sx={{ width: '34px', height: '34px' }}>
                <Person />
              </Avatar>
            )}
            <Typography variant='body1' sx={{ fontWeight: '600' }}>
              {user?.fullName}
            </Typography>
            <KeyboardArrowDown />
          </ButtonBase>
        </Box>
      </Toolbar>
      <Menu
        id='account-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '8px 16px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {user ? (
            <Avatar
              alt='login user avatar'
              variant='rounded'
              src={user?.imgUrl}
              sx={{ width: '40px!important', height: '40px!important' }}
            />
          ) : (
            <Avatar variant='rounded' sx={{ width: '40px', height: '40px' }}>
              <Person />
            </Avatar>
          )}
          <Box>
            <Typography variant='body1' sx={{ fontWeight: '600' }}>
              {user?.fullName}
            </Typography>
            <Typography variant='body2' sx={{ fontWeight: '400' }}>
              {loginUser?.Role == 1 ? 'Admin' : 'Store owner'}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <MenuItem onClick={toProfile}>
          <ListItemIcon>
            <PersonOutlineOutlined fontSize='small' />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default index;
