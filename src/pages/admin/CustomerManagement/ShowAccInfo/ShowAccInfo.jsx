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
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: 'auto',
  }));
  const bcList = [
    { name: 'Customer', sidebar: 'Customer', to: '/admin/customer' },
    {
      name: 'Customer detail',
      sidebar: 'Customer',
      to: '/admin/customer/customer-information',
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
              User #{location?.state?.accountInfo.id}'s Information
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
                  label={location?.state?.accountInfo.roleName}
                  size='small'
                  sx={{
                    color: '#1bcd7a',
                    bgcolor: '#e5fceb',
                    fontSize: '16px',
                  }}
                />
              </Box>
              <StyledAvatar src={location?.state?.accountInfo.imgUrl}>
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
                {location?.state?.accountInfo.fullName}
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
                  <Button
                    variant='text'
                    sx={{ p: '0 20px 0 0' }}
                    onClick={() =>
                      navigate('/admin/update-customer', {
                        state: {
                          accountInfo: location?.state?.accountInfo,
                        },
                      })
                    }
                  >
                    Edit Account
                  </Button>
                </Box>
                <List component='nav' aria-label='mailbox folders'>
                  <ItemInfoAcc
                    primaryLabel={'Full Name'}
                    primaryContent={location?.state?.accountInfo.fullName}
                  />
                  <Divider />
                  <ItemInfoAcc
                    primaryLabel={'Email'}
                    primaryContent={location?.state?.accountInfo.email}
                  />
                  <Divider />
                  <ItemInfoAcc
                    primaryLabel={'Phone'}
                    primaryContent={location?.state?.accountInfo.phone}
                  />
                  <Divider />
                  <ItemInfoAcc
                    primaryLabel={'DOB'}
                    primaryContent={moment(
                      location?.state?.accountInfo.dob
                    ).format('DD-MM-YYYY')}
                  />
                  <Divider />
                  <ItemInfoAcc
                    primaryLabel={'Role'}
                    primaryContent={location?.state?.accountInfo.roleName}
                  />
                  <Divider />
                  <ItemInfoAcc
                    primaryLabel={'Status'}
                    primaryContent={
                      location?.state?.accountInfo.isEnable
                        ? 'Active'
                        : 'InActive'
                    }
                  />
                </List>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
      <Box>
        {location?.state?.accountInfo.role === 2 ? (
          <StoreManagement_2 storeOwnerId={location?.state?.accountInfo.id} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default ShowAccInfo;
