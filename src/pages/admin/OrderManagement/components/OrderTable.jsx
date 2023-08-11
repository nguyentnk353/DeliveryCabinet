import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Divider,
  Chip,
  useTheme,
  IconButton,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import {
  AssignmentTurnedIn,
  DeleteForever,
  Edit,
  MoreVert,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../../../utils/useNotification';
import getOrderList from '../../../../services/getOrderList';
import * as dayjs from 'dayjs';

const OrderTable = ({ search, isEnable }) => {
  const theme = useTheme();
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [msg, sendNotification] = useNotification();
  const navigate = useNavigate();
  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  const [table, setTable] = useState([]);
  const [tableTotal, setTableTotal] = useState(0);

  useMount(() => {
    const payload = {
      PageIndex: pg + 1,
      PageSize: rpg,
      Status: isEnable,
    };
    getOrderList(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setTableTotal(res.totalRecord);
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  });
  useEffect(() => {
    if (search) {
      setpg(0);
    }
    const payload = search
      ? {
          PageIndex: 1,
          PageSize: rpg,
          Id: search,
          Status: isEnable,
        }
      : {
          PageIndex: pg + 1,
          PageSize: rpg,
          Id: search,
          Status: isEnable,
        };
    getOrderList(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }, [pg, rpg, search, msg]);

  return (
    <Box>
      {table ? (
        <Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Total price</TableCell>
                  <TableCell>Start time</TableCell>
                  <TableCell>End time</TableCell>
                  <TableCell>Box</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td,&:last-child th': { border: 0 },
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      navigate('/admin/order-detail', {
                        state: {
                          orderInfo: row,
                        },
                      })
                    }
                  >
                    <TableCell component='th' scope='row'>
                      {row.id}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.total}
                    </TableCell>
                    <TableCell>
                      {dayjs(row.createTime).format('DD/MM/YYYY [at] HH:mm')}
                    </TableCell>
                    <TableCell>
                      {
                        {
                          0: 'Cancel',
                          1: 'Ongoing',
                          2: dayjs(row?.endTime).format(
                            'DD/MM/YYYY [at] HH:mm'
                          ),
                          3: row?.endTime
                            ? dayjs(row?.endTime).format(
                                'DD/MM/YYYY [at] HH:mm'
                              )
                            : 'Overdue',
                        }[row.status]
                      }
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.box.boxSize.length}x{row.box.boxSize.height}{' '}
                      {row.box.boxType.name}
                    </TableCell>
                    <TableCell>{row.user.fullName}</TableCell>
                    <TableCell>
                      {
                        {
                          0: (
                            <Chip
                              label='Cancel'
                              size='small'
                              sx={{
                                color: '#e26e2a',
                                bgcolor: '#fdf4f3',
                              }}
                            />
                          ),
                          1: (
                            <Chip
                              label='Ongoing'
                              size='small'
                              sx={{
                                color: '#2196f3',
                                bgcolor: '#bbdefb',
                              }}
                            />
                          ),
                          2: (
                            <Chip
                              label='Complete'
                              size='small'
                              sx={{
                                color: '#1bcd7a',
                                bgcolor: '#e5fceb',
                              }}
                            />
                          ),
                          3: (
                            <Chip
                              label='Overdue'
                              size='small'
                              sx={{
                                color: '#ff9800',
                                bgcolor: '#ffe0b2',
                              }}
                            />
                          ),
                        }[row.status]
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={tableTotal}
            rowsPerPage={rpg}
            page={pg}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      ) : (
        <Skeleton variant='rectangular' width={210} height={118} />
      )}
    </Box>
  );
};

export default OrderTable;
