import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import UpLoadImage from '../components/UpLoadImage/UpLoadImage';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemInfoAcc from './components/ItemInfoAcc';
import moment from 'moment';
import StoreManagement_2 from './components/StoreManagement_2';
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb';

const ShowAccInfo = () => {
  const loginUser = JSON.parse(localStorage.getItem('loginUser'));
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = location?.state?.accountInfo
    ? location?.state?.accountInfo
    : location?.state?.stateLink
    ? location?.state?.stateLink
    : null;

  const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: 'auto',
  }));
  const bcList = [
    { name: 'User', sidebar: 'User', to: '/admin/user' },
    {
      name: 'User detail',
      sidebar: 'User',
      to: '/admin/user/user-information',
    },
  ];
  return (
    <Box>
      <Box>
        <Box
          sx={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              variant='h5'
              sx={{ fontWeight: '600', marginBottom: '0.25rem' }}
            >
              User #{userInfo?.id}'s Information
            </Typography>
            <Box>
              <CustomBreadcrumb list={bcList} />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', gap: 6 }}>
            <Paper
              sx={{ borderRadius: '16px', width: '30%', padding: '2%' }}
              elevation={3}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginBottom: '10%',
                }}
              >
                <Chip
                  label={userInfo?.roleName}
                  size='small'
                  sx={{
                    color: '#1bcd7a',
                    bgcolor: '#e5fceb',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <StyledAvatar src={userInfo?.imgUrl}>
                {loading ? <CircularProgress /> : null}
              </StyledAvatar>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: '700',
                  textAlign: 'center',
                  paddingTop: '20px',
                }}
              >
                {userInfo?.fullName}
              </Typography>
            </Paper>

            <Paper sx={{ borderRadius: '16px', width: '65%' }} elevation={3}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: '700',
                      p: '0 20px',
                      padding: '20px 0 0 20px',
                    }}
                  >
                    Personal Information
                  </Typography>
                  {loginUser?.Id == userInfo?.id ? (
                    <></>
                  ) : (
                    <Button
                      variant='text'
                      sx={{ p: '0 1rem' }}
                      onClick={() =>
                        navigate('/admin/update-user', {
                          state: {
                            accountInfo: userInfo,
                          },
                        })
                      }
                    >
                      Edit Account
                    </Button>
                  )}
                </Box>
                <List component='nav' aria-label='mailbox folders'>
                  <ItemInfoAcc
                    primaryLabel={'Full Name'}
                    primaryContent={userInfo?.fullName}
                  />
                  <Divider />
                  <ItemInfoAcc
                    primaryLabel={'Email'}
                    primaryContent={userInfo?.email}
                  />
                  <Divider />
                  <ItemInfoAcc
                    primaryLabel={'Phone'}
                    primaryContent={userInfo?.phone}
                  />
                  <Divider />
                  <ItemInfoAcc
                    primaryLabel={'DOB'}
                    primaryContent={moment(userInfo?.dob).format('DD-MM-YYYY')}
                  />
                  <Divider />
                  <ItemInfoAcc
                    primaryLabel={'Role'}
                    primaryContent={userInfo?.roleName}
                  />
                  <Divider />
                  <ItemInfoAcc
                    primaryLabel={'Status'}
                    primaryContent={userInfo?.isEnable ? 'Active' : 'InActive'}
                  />
                </List>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>

      <Box>
        {userInfo?.role === 2 ? (
          <StoreManagement_2 storeOwnerInfo={userInfo} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default ShowAccInfo;
