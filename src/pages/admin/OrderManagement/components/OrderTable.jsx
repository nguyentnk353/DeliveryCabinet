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
  Skeleton,
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
import moment from 'moment/moment';

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

  function switchEndtime(val) {
    switch (val?.status) {
      case 0:
        return 'Cancel';
      case 1:
        return 'Ongoing';
      case 2:
        return moment(val?.endTime).format('DD/MM/YYYY [at] HH:mm');
      case 3:
        return val?.endTime
          ? moment(val?.endTime).format('DD/MM/YYYY [at] HH:mm')
          : 'Overdue';
      default:
        return 'unknown end time';
    }
  }

  function switchStatus(val) {
    switch (val?.status) {
      case 0:
        return (
          <Chip
            label='Cancel'
            size='small'
            sx={{
              color: '#e26e2a',
              bgcolor: '#fdf4f3',
            }}
          />
        );
      case 1:
        return (
          <Chip
            label='Ongoing'
            size='small'
            sx={{
              color: '#2196f3',
              bgcolor: '#bbdefb',
            }}
          />
        );
      case 2:
        return (
          <Chip
            label='Complete'
            size='small'
            sx={{
              color: '#1bcd7a',
              bgcolor: '#e5fceb',
            }}
          />
        );
      case 3:
        return (
          <Chip
            label='Overdue'
            size='small'
            sx={{
              color: '#ff9800',
              bgcolor: '#ffe0b2',
            }}
          />
        );
      default:
        return 'unknown status';
    }
  }

  return (
    <Box>
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
                  key={row?.id}
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
                    {row?.id}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row?.total}
                  </TableCell>
                  <TableCell>
                    {moment(row?.createTime).format('DD/MM/YYYY [at] HH:mm')}
                  </TableCell>
                  <TableCell>{switchEndtime(row)}</TableCell>
                  <TableCell component='th' scope='row'>
                    {row?.box?.boxSize?.length}x{row?.box?.boxSize?.height}{' '}
                    {row?.box?.boxType?.name}
                  </TableCell>
                  <TableCell>{row?.user?.fullName}</TableCell>
                  <TableCell>{switchStatus(row)}</TableCell>
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
    </Box>
  );
};

export default OrderTable;
