import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import dlogo from '.././../../../assets/images/DeliveryLogo2.png';
import { Fragment } from 'react';
import { json, useNavigate } from 'react-router-dom';
import CustomerMobileSibar from '../CustomerMobileSibar/CustomerMobileSibar';
import LogoutFunction from './../../../../utils/LogoutFunction';
import LogoutCustomer from '../../../../utils/LogoutCustomer';
import { useMount } from 'ahooks';
import getLoginUser from './../../../../services/Customer/getLoginUser';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function CustomerHeader02() {
  const navigate = useNavigate();
  const logout = LogoutCustomer();
  const loginUser = JSON.parse(localStorage.getItem('loginUser'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [imgSrc, setImgSrc] = React.useState('');

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={(e) => { handleMobileMenuClose(); handleMenuClose(); }}
    >
      <MenuItem onClick={(e) => { e.stopPropagation(); handleMenuClose(); handleMobileMenuClose(); navigate('/customer/profile', { replace: true }); }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <img className='w-8 h-8 rounded-full' src={imgSrc} alt='user photo' />
        </IconButton>
        <p>Tài khoản</p>
      </MenuItem>
      <MenuItem onClick={(e) => { e.stopPropagation(); handleMenuClose(); handleMobileMenuClose(); logout() }} className='text-red-500'>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <LogoutIcon />
        </IconButton>
        <p>Đăng xuất</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={(e) => { handleMobileMenuClose(); handleMenuClose(); }}
    >
        {/* <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={0} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem> */}
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}

      <MenuItem onClick={(e) => { e.stopPropagation(); handleMenuClose(); handleMobileMenuClose(); navigate('/customer/profile', { replace: true }); }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <img className='w-8 h-8 rounded-full' src={imgSrc} alt='user photo' />
        </IconButton>
        <p>Tài khoản</p>
      </MenuItem>
      <MenuItem onClick={(e) => { e.stopPropagation(); handleMenuClose(); handleMobileMenuClose(); logout() }} className='text-red-500'>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <LogoutIcon />
        </IconButton>
        <p>Đăng xuất</p>
      </MenuItem>
    </Menu>
  );

  useMount(() => {
    getLoginUser()
      .then((res) => {
        setImgSrc(res?.imgUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar className='flex justify-between'>
          <CustomerMobileSibar />

          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
            {loginUser ? (
              <Box className='flex justify-end space-x-10 cursor-pointer'>
                <Typography
                  variant='h7'
                  noWrap
                  component='div'
                  // sx={{ display: { xs: 'none', sm: 'block' } }}
                  onClick={() =>
                    navigate(
                      '/customer'
                      // {
                      //   state: {
                      //       storeInfo: store,
                      //   },
                      // }
                    )
                  }
                >
                  Trang chủ
                </Typography>
                <Typography
                  variant='h7'
                  noWrap
                  component='div'
                  onClick={() =>
                    navigate(
                      '/customer/order'
                      // {
                      //   state: {
                      //       storeInfo: store,
                      //   },
                      // }
                    )
                  }
                >
                  Đơn hàng
                </Typography>
                <Typography
                  variant='h7'
                  noWrap
                  component='div'
                  // sx={{ display: { xs: 'none', sm: 'block' } }}
                  onClick={() =>
                    navigate(
                      '/customer/wallet'
                      // {
                      //   state: {
                      //       storeInfo: store,
                      //   },
                      // }
                    )
                  }
                >
                  Ví
                </Typography>
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <div className='md:hidden'>
            <img className="h-7 text-blue-600" alt="DC Logo"
                src={dlogo} 
              />
          </div>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {loginUser ? (
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                {/* <AccountCircle /> */}
                <img
                  className='w-8 h-8 rounded-full'
                  src={imgSrc}
                  alt='user photo'
                />
              </IconButton>
            ) : (
              <button
                className='font-semibold'
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/login');
                }}
              >
                Đăng nhập
              </button>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {loginUser ? (
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            ) : (
              <button
                className='font-semibold'
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/login');
                }}
              >
                Đăng nhập
              </button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
