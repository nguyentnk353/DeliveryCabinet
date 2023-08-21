import {
  Add,
  DeleteForever,
  DeleteOutline,
  Edit,
  Margin,
  MoreVert,
  SearchOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import getAccountList from '../../../../services/getAccountList';
import moment from 'moment/moment';
import { blue, red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import deleteAccount from '../../../../services/deleteAccount';
import useNotification from '../../../../utils/useNotification';
import getStaffByStore from './../../../../services/getStaffByStore';

const TableAccount = ({ status, role, storeId, storeInfo }) => {
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [row, setRow] = useState();
  const navigate = useNavigate();
  const [msg, sendNotification] = useNotification();
  const [searchText, setSearchText] = useState('');
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
      StoreId: storeId,
      Role: 3,
      IsEnable: status,
    };
    getStaffByStore(payload)
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
    // if (searchText || role) {
    //   setPage(0);
    // }

    const payload = searchText
      ? {
          PageIndex: 1,
          PageSize: rpg,
          StoreId: storeId,
          Role: 3,
          FullName: searchText,
          IsEnable: status,
        }
      : {
          PageIndex: page + 1,
          PageSize: rpg,
          StoreId: storeId,
          Role: 3,
          FullName: searchText,
          IsEnable: status,
        };
    getStaffByStore(payload)
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
  }, [page, rpg, searchText, role]);

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
            search: searchText,
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
      <Box
        sx={{
          p: '2%',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        <TextField
          id='filled-search'
          placeholder='Search...'
          type='search'
          variant='outlined'
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          sx={{ width: '75%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
        <Box>
          <Button
            color='error'
            startIcon={<DeleteOutline />}
            sx={{ marginLeft: '1rem' }}
            onClick={() => {
              setSearchText('');
            }}
          >
            Clear
          </Button>
        </Box>
        <Box>
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={() =>
              navigate('/store-owner/new-staff', {
                state: {
                  storeInfo: storeInfo,
                },
              })
            }
          >
            New staff
          </Button>
        </Box>
      </Box>
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
                    navigate('/store-owner/store/staff-information', {
                      state: {
                        accountInfo: row,
                        storeInfo: storeInfo,
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
                          navigate('/store-owner/store/update-staff', {
                            state: {
                              accountInfo: row,
                              storeInfo: storeInfo,
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
    </Box>
  );
};

export default TableAccount;
