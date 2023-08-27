import { DeleteForever, Edit } from '@mui/icons-material';
import {
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
import { blue, red } from '@mui/material/colors';
import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../../../../utils/useNotification';
import getStoreList from '../../../../../services/getStoreList';
import deleteStore from '../../../../../services/deleteStore';
import getStoreByStoreOwnerId from '../../../../../services/getStoreByStoreOwnerId';
import { Empty } from 'antd';

const TableStore = ({
  province,
  city,
  district,
  search,
  isEnable,
  storeOwnerId,
}) => {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [table, setTable] = useState([]);
  const [tableTotal, setTableTotal] = useState(0);
  const navigate = useNavigate();
  const [msg, sendNotification] = useNotification();
  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  useMount(() => {
    const payload = {
      PageIndex: pg,
      PageSize: rpg,
      isEnable: isEnable,
      UserId: storeOwnerId,
    };
    getStoreByStoreOwnerId(payload)
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
    if (search || province.name) {
      setpg(0);
    }
    const payload = search
      ? {
          PageIndex: 0,
          PageSize: rpg,
          province: province.name,
          city: city.name,
          district: district.name,
          search: search,
          isEnable: isEnable,
          UserId: storeOwnerId,
        }
      : {
          PageIndex: pg,
          PageSize: rpg,
          province: province.name,
          city: city.name,
          district: district.name,
          search: search,
          isEnable: isEnable,
          UserId: storeOwnerId,
        };
    getStoreByStoreOwnerId(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setTableTotal(res.totalRecord);
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
                {table.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Empty />
                    </TableCell>
                  </TableRow>
                )}
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

export default TableStore;
