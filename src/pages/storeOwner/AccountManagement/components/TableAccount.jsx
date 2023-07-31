import { DeleteForever, Edit, Margin, MoreVert } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import getAccountList from '../../../../services/getAccountList';
import moment from 'moment/moment';
import { blue, red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import deleteAccount from '../../../../services/deleteAccount';
import useNotification from '../../../../utils/useNotification';

const TableAccount = ({ status, search, role }) => {
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [row, setRow] = useState();
  const navigate = useNavigate();
  const [msg, sendNotification] = useNotification();

  function handleChangePage(e, newpage) {
    setPage(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setPage(0);
  }

  useMount(() => {
    const payload = {
      PageIndex: page + 1,
      PageSize: rpg,
      Role: 3,
      IsEnable: status,
    };
    getAccountList(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        newTable.forEach(function (cs, index) {
          switch (cs.role) {
            case 1:
              cs.roleName = 'Admin';
              return;
            case 2:
              cs.roleName = 'Store Owner';
              return;
            case 3:
              cs.roleName = 'Staff';
              return;
            case 4:
              cs.roleName = 'Customer';
              return;
          }
        });
        setTable(newTable);
        setRow(res.totalRecord);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    if (search || role) {
      setPage(0);
    }
    const payload = search
      ? {
          PageIndex: 1,
          PageSize: rpg,
          Role: 3,
          search: search,
          IsEnable: status,
        }
      : {
          PageIndex: page + 1,
          PageSize: rpg,
          Role: 3,
          search: search,
          IsEnable: status,
        };
    getAccountList(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        newTable.forEach(function (cs, index) {
          switch (cs.role) {
            case 1:
              cs.roleName = 'Admin';
              return;
            case 2:
              cs.roleName = 'Store Owner';
              return;
            case 3:
              cs.roleName = 'Staff';
              return;
            case 4:
              cs.roleName = 'Customer';
              return;
          }
        });
        setTable(newTable);
        setRow(res.totalRecord);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, rpg, search, role]);

  function deleteAccountFunction(id) {
    deleteAccount(id)
      .then((res) => {
        if (res.status == 200) {
          sendNotification({
            msg: 'Account delete success',
            variant: 'success',
          });
          getAccountList({
            PageIndex: page + 1,
            PageSize: rpg,
            Role: role,
            search: search,
            IsEnable: status,
          })
            .then((res) => {
              const newTable = res.items.map((e) => e);
              newTable.forEach(function (cs, index) {
                switch (cs.role) {
                  case 1:
                    cs.roleName = 'Admin';
                    return;
                  case 2:
                    cs.roleName = 'Store Owner';
                    return;
                  case 3:
                    cs.roleName = 'Staff';
                    return;
                  case 4:
                    cs.roleName = 'Customer';
                    return;
                }
              });
              setTable(newTable);
              setRow(res.totalRecord);
            })
            .catch((err) => {
              console.log(err);
            });
          // window.location.reload();
        } else {
          sendNotification({ msg: 'Account delete fail', variant: 'error' });
        }
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }
  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td,&:last-child th': { border: 0 },
                  cursor: 'pointer',
                }}
                onClick={() =>
                  navigate('/admin/user/user-information', {
                    state: {
                      accountInfo: row,
                    },
                  })
                }
              >
                <TableCell
                  sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                >
                  <Avatar alt='Remy Sharp' src={row.imgUrl} />
                  {row.fullName}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{moment(row?.dob).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{row.roleName}</TableCell>

                <TableCell>
                  {row.isEnable ? (
                    <Chip
                      label='Active'
                      size='small'
                      sx={{
                        color: '#1bcd7a',
                        bgcolor: '#e5fceb',
                      }}
                    />
                  ) : (
                    <Chip
                      label='Inactive'
                      size='small'
                      sx={{
                        color: '#e26e2a',
                        bgcolor: '#fdf4f3',
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex' }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/admin/update-user', {
                          state: {
                            accountInfo: row,
                          },
                        });
                      }}
                    >
                      <Edit sx={{ color: blue[500] }} />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAccountFunction(row.id);
                      }}
                    >
                      <DeleteForever sx={{ color: red[600] }} />
                    </IconButton>
                  </Box>
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
        count={row}
        rowsPerPage={rpg}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TableAccount;
