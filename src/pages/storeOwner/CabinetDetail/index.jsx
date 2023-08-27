import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import postOpenBox from '../../../services/postOpenBox';
import useNotification from '../../../utils/useNotification';
import openBox from './../../../services/Staff/openBox';
import closeBox from './../../../services/Staff/closeBox';
import getLockerList from '../../../services/getLockerList';

const index = () => {
  const location = useLocation();
  const cabinet = location?.state?.cabinetInfo;
  const [cabinetInfo, setCabinetInfo] = useState(cabinet);
  const storeInfo = location?.state?.storeInfo;
  const [msg, sendNotification] = useNotification();
  const [box, setBox] = useState();
  function boxClick(e) {
    setBox(e);
  }
  // console.log(box);
  const bcList = [
    { name: 'Store', sidebar: 'Store', to: '/store-owner/store' },
    {
      name: 'Store detail',
      sidebar: 'Store',
      state: storeInfo,
      to: '/store-owner/store-detail',
    },
    {
      name: 'Cabinet detail',
      sidebar: 'Store',
      to: '/store-owner/cabinet-detail',
    },
  ];

  const table = [
    { name: 'ID', info: cabinetInfo?.id },
    { name: 'Rows', info: cabinetInfo?.row },
    { name: 'Columns', info: cabinetInfo?.col },
    {
      name: 'Store',
      info: cabinetInfo?.store?.id == 0 ? 'Unassign' : cabinetInfo?.store?.name,
    },
    {
      name: 'Address',
      info:
        cabinetInfo?.store?.id == 0 ? 'Unassign' : cabinetInfo?.store?.address,
    },
    {
      name: 'Store owner',
      info:
        cabinetInfo?.store?.id == 0
          ? 'Unassign'
          : cabinetInfo?.store?.user?.fullName,
    },
  ];

  // function openLockBox(payload) {
  //   postOpenBox(payload)
  //     .then((res) => {
  //       if (res.status == 201) {
  //         sendNotification({
  //           msg: `Box #${payload.boxid} open success`,
  //           variant: 'success',
  //         });
  //       } else {
  //         sendNotification({
  //           msg: `Box #${payload.boxid} open fail`,
  //           variant: 'error',
  //         });
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }

  function openBoxFunc() {
    // console.log('open box');
    openBox(box?.id)
      .then((res) => {
        console.log(res);
        console.log(res.status === 200);
        if (res.status === 200) {
          sendNotification({
            msg: `Box #${box?.id} open success`,
            variant: 'success',
          });
        } else if (res.response.status === 400) {
          sendNotification({
            msg: `Box #${box?.id} had already opened!`,
            variant: 'warning',
          });
        } else {
          sendNotification({
            msg: `Box #${box?.id} open fail!`,
            variant: 'error',
          });
        }
      })
      .catch((err) => console.log(err));
  }
  function closeBoxFunc() {
    closeBox(box?.id)
      .then((res) => {
        if (res.status === 200) {
          sendNotification({
            msg: `Box #${box?.id} close success`,
            variant: 'success',
          });
        } else if (res.response.status === 400) {
          sendNotification({
            msg: `Box #${box?.id} had already closed!`,
            variant: 'warning',
          });
        } else {
          sendNotification({
            msg: `Box #${box?.id} close fail!`,
            variant: 'error',
          });
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    const payload = {
      Id: cabinet?.id,
    };

    getLockerList(payload)
      .then((res) => {
        const newTable = res.items[0];
        setCabinetInfo(newTable);
        setBox(newTable.boxes.find((e) => e.id == box?.id));
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }, [msg]);
  function colorStatus(s) {
    switch (s) {
      case 0:
        return {
          label: 'Cancel',
          color: '#e26e2a',
          bgcolor: '#fdf4f3',
        };

      case 1:
        return {
          label: 'Empty',
          color: '#1bcd7a',
          bgcolor: '#e5fceb',
        };
      case 2:
        return {
          label: 'Renting',
          color: '#2196f3',
          bgcolor: '#e3f2fd',
        };
      case 3:
        return {
          label: 'Overdue',
          color: '#ff5722',
          bgcolor: '#ffccbc',
        };
      case 4:
        return {
          label: 'Locked',
          color: '#ff5722',
          bgcolor: '#ffccbc',
        };
      default:
        return {
          label: 'unknow status',
          color: '#212121',
          bgcolor: '#f5f5f5',
        };
    }
  }
  return (
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
            Cabinet #{cabinetInfo?.id}
          </Typography>
          <Box>
            <CustomBreadcrumb list={bcList} />
          </Box>
        </Box>
      </Box>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          // gap: 2,
          padding: '2rem 3rem',
        }}
      >
        <Box sx={{ width: '50%' }}>
          <Box>
            <Box>
              <Typography variant='h4' sx={{ fontWeight: '600' }}>
                {cabinetInfo?.name}
              </Typography>
              <Divider sx={{ margin: '2% 0' }} />
              {box && (
                <Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Box>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          Box name:
                        </Typography>{' '}
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          Open code:
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          Open status:
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          Box size:
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          Box type:
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          Position (x asis / y axis):
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          Description:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          {box.code}
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          {box.openCode}
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          {box.isOpen ? (
                            <Chip
                              size='small'
                              sx={{
                                color: '#1bcd7a',
                                bgcolor: '#e5fceb',
                              }}
                              label='Open'
                            />
                          ) : (
                            <Chip
                              size='small'
                              sx={{
                                color: '#ff5722',
                                bgcolor: '#ffccbc',
                              }}
                              label='Closed'
                            />
                          )}
                          {/* 
                          {
                            {
                              1: (
                                <Chip
                                  size='small'
                                  sx={{
                                    color: '#1bcd7a',
                                    bgcolor: '#e5fceb',
                                  }}
                                  label='Open'
                                />
                              ),
                              2: (
                                <Chip
                                  size='small'
                                  sx={{
                                    color: '#ffeb3b',
                                    bgcolor: '#fff9c4',
                                  }}
                                  label='Close'
                                />
                              ),
                              3: (
                                <Chip
                                  size='small'
                                  sx={{
                                    color: '#ff5722',
                                    bgcolor: '#ffccbc',
                                  }}
                                  label='Lock'
                                />
                              ),
                            }[box.isOpen]
                          } */}
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          {box.boxSize.length} x {box.boxSize.height}
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          {box.boxType.name}
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          {box.fromTop} / {box.fromLeft}
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: '600' }}>
                          {box.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                      <Button
                        variant='outlined'
                        onClick={(e) => {
                          e.stopPropagation();
                          openBoxFunc();
                        }}
                      >
                        Open
                      </Button>
                      {/* <Button
                        variant='outlined'
                        onClick={(e) => {
                          e.stopPropagation();
                          closeBoxFunc();
                        }}
                      >
                        Close
                      </Button> */}
                      {/* <Button variant='outlined' onClick={lockBox}>
                        Lock
                      </Button> */}
                    </Box>
                  </Box>
                  <Divider sx={{ margin: '2% 0' }} />
                </Box>
              )}
              <Box>
                <Typography variant='body1' sx={{ fontWeight: '700' }}>
                  Description
                </Typography>
                <Typography variant='body1' sx={{}}>
                  {cabinetInfo?.description}
                </Typography>
              </Box>
              <Divider sx={{ margin: '2% 0' }} />
              <Box>
                <Box>
                  <Typography
                    variant='body1'
                    sx={{ fontWeight: '700', marginBottom: '1rem' }}
                  >
                    Detail information
                  </Typography>
                  <Box>
                    <Table>
                      <TableBody>
                        {table.map((row) => (
                          <TableRow
                            sx={{
                              '&:nth-of-type(odd)': {
                                backgroundColor: '#fafafa',
                              },
                            }}
                          >
                            <TableCell
                              component='th'
                              scope='row'
                              sx={{
                                backgroundColor: '#f0f2f5',
                                fontWeight: '600',
                              }}
                            >
                              {row.name}
                            </TableCell>
                            <TableCell>{row.info}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '45%' }}>
          <div
            id='grid'
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cabinetInfo.col}, 1fr)`,
              gridTemplateRows: `repeat(${cabinetInfo.row}, 1fr)`,
              gridGap: '8px',
            }}
          >
            {cabinetInfo?.boxes &&
              cabinetInfo.boxes?.map((e, i) => {
                const stat = colorStatus(e.status);
                return (
                  <Paper
                    className='grid-item'
                    sx={{
                      gridRow: `span ${e.boxSize.height}`,
                      gridColumn: `span ${e.boxSize.length}`,
                      cursor: 'pointer',
                      backgroundColor: yellow[100],
                      textAlign: 'center',
                      // paddingBottom: '60%',
                      // paddingTop: '10%',
                      padding: '10%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      // gap: '1rem',
                    }}
                    onClick={() => {
                      boxClick(e);
                    }}
                  >
                    {e.code}
                    <Chip
                      sx={{
                        marginTop: '50%',
                        color: stat.color,
                        bgcolor: stat.bgcolor,
                      }}
                      label={stat.label}
                    />
                  </Paper>
                );
              })}
          </div>
        </Box>
      </Paper>
    </Box>
  );
};

export default index;
