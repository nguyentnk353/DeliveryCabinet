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
  Snackbar,
  Alert,
} from '@mui/material';
import getStoreList from '../../../../services/getStoreList';
import { Delete, DeleteForever, Edit, MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { blue, red } from '@mui/material/colors';
import deleteStore from '../../../../services/deleteStore';
import { CloseIcon } from '@mui/icons-material/Close';
import useNotification from '../../../../utils/useNotification';

const StoreTable = ({ province, city, district, search, isEnable }) => {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const navigate = useNavigate();
  const [msg, sendNotification] = useNotification();
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
      IsEnable: isEnable,
    };
    getStoreList(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setTableTotal(res.totalRecord);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  useEffect(() => {
    const payload = search
      ? {
          PageIndex: 1,
          PageSize: rpg,
          Province: province.name,
          City: city.name,
          District: district.name,
          Name: search,
          Address: search,
          IsEnable: isEnable,
        }
      : {
          PageIndex: pg + 1,
          PageSize: rpg,
          Province: province.name,
          City: city.name,
          District: district.name,
          Name: search,
          Address: search,
          IsEnable: isEnable,
        };
    getStoreList(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pg, rpg, province, city, district, search, msg]);

  function deleteStoreId(storeId) {
    deleteStore(storeId)
      .then((res) => {
        if (res.status == 200) {
          sendNotification({ msg: 'Store delete success', variant: 'success' });
        } else {
          sendNotification({ msg: 'Store delete fail', variant: 'error' });
        }
      })
      .catch((err) => {
        sendNotification({ msg: 'Store delete fail', variant: 'error' });
      });
  }

  return (
    <Box>
      {table ? (
        <Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Owner</TableCell>
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
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      navigate('/admin/store-detail', {
                        state: {
                          storeInfo: row,
                        },
                      })
                    }
                  >
                    <TableCell component='th' scope='row'>
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.user.fullName}</TableCell>
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
                            navigate('/admin/update-store', {
                              state: {
                                storeInfo: row,
                              },
                            });
                          }}
                        >
                          <Edit sx={{ color: blue[500] }} />
                        </IconButton>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteStoreId(row.id);
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

export default StoreTable;
