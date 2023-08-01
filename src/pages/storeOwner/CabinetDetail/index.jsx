import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';

const index = () => {
  const location = useLocation();
  const cabinetInfo = location?.state?.cabinetInfo;
  const storeInfo = location?.state?.storeInfo;

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
    { name: 'Store', info: cabinetInfo?.store?.name },
    { name: 'Address', info: cabinetInfo?.store?.address },
    { name: 'Store owner', info: cabinetInfo?.store?.user?.fullName },
  ];
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
            Cabinet #{cabinetInfo?.id} detail
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
                return (
                  <Paper
                    className='grid-item'
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
              })}
          </div>
        </Box>
      </Paper>
    </Box>
  );
};

export default index;
