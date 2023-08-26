import { Avatar, Box, Button, Divider, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import { useLocation } from 'react-router-dom';
import { useMount } from 'ahooks';
import getLockerList from '../../../services/getLockerList';
import { blue, yellow } from '@mui/material/colors';
import dayjs from 'dayjs';
import { VisibilityOutlined } from '@mui/icons-material';
import ModalPriceTable from './ModalPriceTable';

const index = () => {
  const location = useLocation();
  const orderInfo = location?.state?.orderInfo;
  const [locker, setLocker] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const bcList = [
    { name: 'Order', sidebar: 'Order', to: '/admin/order' },
    { name: 'Order detail', sidebar: 'Order', to: '/admin/order-detail' },
  ];

  useMount(() => {
    const payload = {
      Name: '',
      IsEnable: true,
      Id: orderInfo?.box?.lockerId,
      StoreId: '',
      PageIndex: 1,
      PageSize: 5,
    };
    getLockerList(payload)
      .then((res) => {
        const newTable = res.items[0];
        setLocker(newTable);
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  });
  return (
    <Box>
      <ModalPriceTable
        open={open}
        setOpen={setOpen}
        storeId={locker?.store?.id}
      />
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
            Order #{orderInfo.id}
          </Typography>
          <Box>
            <CustomBreadcrumb list={bcList} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ width: '70%' }}>
          <Paper sx={{ borderRadius: '8px', width: '100%' }}>
            <Box sx={{ padding: '1rem 2rem' }}>
              <Typography variant='body1' sx={{ fontWeight: '700' }}>
                Order Details
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box sx={{ width: '50%' }}>
                <div
                  id='grid'
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${locker?.col}, 1fr)`,
                    gridTemplateRows: `repeat(${locker?.row}, 1fr)`,
                    gridGap: '8px',
                    width: '100%',
                    // height: 'auto',
                  }}
                >
                  {locker?.boxes &&
                    locker.boxes?.map((e, i) => {
                      if (e?.id == orderInfo?.box?.id) {
                        return (
                          <Paper
                            className='grid-item'
                            key={i}
                            sx={{
                              gridRow: `span ${e.boxSize.height}`,
                              gridColumn: `span ${e.boxSize.length}`,
                              cursor: 'pointer',
                              backgroundColor: blue[100],
                              textAlign: 'center',
                              paddingBottom: '60%',
                              paddingTop: '10%',
                            }}
                          >
                            {e.code}
                            <br />
                            Order's box
                          </Paper>
                        );
                      } else {
                        return (
                          <Paper
                            className='grid-item'
                            key={i}
                            sx={{
                              gridRow: `span ${e.boxSize.height}`,
                              gridColumn: `span ${e.boxSize.length}`,
                              cursor: 'pointer',
                              backgroundColor: yellow[100],
                              textAlign: 'center',
                              paddingBottom: '60%',
                              paddingTop: '10%',
                            }}
                          >
                            {e.code}
                          </Paper>
                        );
                      }
                    })}
                </div>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: '1rem',
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'right',
                    }}
                  >
                    <Typography variant='body1'>Box ID: </Typography>
                    <Typography variant='body1'>Box size: </Typography>
                    <Typography variant='body1'>Box type: </Typography>
                    <Typography variant='body1'>Start time: </Typography>
                    <Typography variant='body1'>End time: </Typography>
                  </Box>
                  <Box
                    sx={{
                      textAlign: 'right',
                    }}
                  >
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                      #{orderInfo?.box?.id}
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                      {orderInfo?.box?.boxSize?.length} x{' '}
                      {orderInfo?.box?.boxSize?.height}
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                      {orderInfo?.box?.boxType?.name}
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                      {dayjs(orderInfo?.createTime).format(
                        'DD/MM/YYYY [at] HH:mm'
                      )}
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                      {
                        {
                          0: 'Cancel',
                          1: 'Ongoing',
                          2: dayjs(orderInfo?.endTime).format(
                            'DD/MM/YYYY [at] HH:mm'
                          ),
                          3: orderInfo?.endTime
                            ? dayjs(orderInfo?.endTime).format(
                                'DD/MM/YYYY [at] HH:mm'
                              )
                            : 'Overdue',
                          4: dayjs(orderInfo?.endTime).format(
                            'DD/MM/YYYY [at] HH:mm'
                          ),
                        }[orderInfo.status]
                      }
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    textAlign: 'right',
                    gap: 5,
                    padding: '1rem 0',
                  }}
                >
                  <Box>
                    <Typography variant='body1' sx={{ opacity: '50%' }}>
                      Sub total
                    </Typography>
                    <Typography variant='body1' sx={{ opacity: '50%' }}>
                      Overdue fines (10%)
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                      Total
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                      {orderInfo?.status == 4
                        ? (orderInfo?.total * 100) / 110
                        : orderInfo?.total}{' '}
                      (VND)
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                      {orderInfo?.status == 4
                        ? orderInfo?.total - (orderInfo?.total * 100) / 110
                        : 0}{' '}
                      (VND)
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                      {orderInfo?.total} (VND)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ width: '30%' }}>
          <Paper sx={{ borderRadius: '8px', width: '100%' }}>
            <Box sx={{ padding: '1rem 1rem 0.25rem 1rem' }}>
              <Typography variant='body1' sx={{ fontWeight: '700' }}>
                Customer Info
              </Typography>
            </Box>
            {/* <Divider /> */}
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  padding: '8px 16px',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {orderInfo?.user ? (
                  <Avatar
                    alt='login user avatar'
                    // variant='rounded'
                    src={orderInfo?.user.imgUrl}
                    sx={{ width: '60px', height: '60px' }}
                  />
                ) : (
                  <Avatar
                    // variant='rounded'
                    sx={{ width: '60px', height: '60px' }}
                  >
                    <Person />
                  </Avatar>
                )}
                <Box sx={{ marginLeft: '1rem' }}>
                  <Typography variant='body1' sx={{ fontWeight: '700' }}>
                    {orderInfo?.user.fullName}
                  </Typography>
                  <Typography variant='body2' sx={{ fontWeight: '400' }}>
                    Email:
                    <Typography
                      display='inline'
                      variant='body2'
                      sx={{ fontWeight: '600', marginLeft: '1rem' }}
                    >
                      {orderInfo?.user.email}
                    </Typography>
                  </Typography>{' '}
                  <Typography variant='body2' sx={{ fontWeight: '400' }}>
                    Phone:
                    <Typography
                      display='inline'
                      variant='body2'
                      sx={{ fontWeight: '600', marginLeft: '1rem' }}
                    >
                      {orderInfo?.user.phone}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ padding: '1rem 1rem 0.25rem 1rem' }}>
              <Typography variant='body1' sx={{ fontWeight: '700' }}>
                Store Info
              </Typography>
            </Box>
            <Box sx={{ padding: '8px 16px' }}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body1' sx={{ minWidth: '80px' }}>
                  Name:{' '}
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                  {locker?.store?.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body1' sx={{ minWidth: '80px' }}>
                  Phone:{' '}
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                  {locker?.store?.user?.phone}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body1' sx={{ minWidth: '80px' }}>
                  Address:{' '}
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                  {locker?.store?.address}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ padding: '1rem 1rem 0.25rem 1rem' }}>
              <Typography variant='body1' sx={{ fontWeight: '700' }}>
                Cabinet Info
              </Typography>
            </Box>
            <Box sx={{ padding: '8px 16px' }}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body1' sx={{ minWidth: '140px' }}>
                  ID:{' '}
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                  {locker?.id}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body1' sx={{ minWidth: '140px' }}>
                  Name:{' '}
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                  {locker?.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body1' sx={{ minWidth: '140px' }}>
                  Size (Row x Col):{' '}
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                  {locker?.row} x {locker?.col}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body1' sx={{ minWidth: '140px' }}>
                  Description:{' '}
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                  {locker?.description}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ padding: '1rem 1rem 0.25rem 1rem' }}>
              <Typography variant='body1' sx={{ fontWeight: '700' }}>
                Payment Info
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                padding: '8px 16px',
              }}
            >
              <Box>
                <Typography variant='body1'>Payment method: </Typography>
                <Button startIcon={<VisibilityOutlined />} onClick={handleOpen}>
                  View price table
                </Button>
              </Box>
              <Box>
                <Typography variant='body1' sx={{ fontWeight: '600' }}>
                  DC pay wallet
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default index;
