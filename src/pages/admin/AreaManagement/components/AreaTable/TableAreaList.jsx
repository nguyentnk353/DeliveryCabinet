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
import getAreaList from '../../../../../services/getAreaList';
import UpdateAreaModal from '../UpdateAreaModal/UpdateAreaModal';
import useNotification from '../../../../../utils/useNotification';
import deleteArea from '../../../../../services/deleteArea';

const TableAreaList = ({ status, search }) => {
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [row, setRow] = useState();
  const [showModal, setShowModal] = useState(false);
  const [infoModal, setInfoModal] = useState();
  const [msg, sendNotification] = useNotification();

  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

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
      IsEnable: status,
    };
    getAreaList(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setRow(res.totalRecord);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    if (search) {
      setPage(0);
    }
    const payload = search
      ? {
          PageIndex: 1,
          PageSize: rpg,
          search: search,
          IsEnable: status,
        }
      : {
          PageIndex: page + 1,
          PageSize: rpg,
          search: search,
          IsEnable: status,
        };
    getAreaList(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setRow(res.totalRecord);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, rpg, search]);
  function deleteAreaFunction(id) {
    deleteArea(id)
      .then((res) => {
        if (res.status == 200) {
          sendNotification({
            msg: 'Area delete success',
            variant: 'success',
          });
        } else {
          sendNotification({ msg: 'Area delete fail', variant: 'error' });
        }
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }
  return (
    <Box>
      <Box>
        <UpdateAreaModal
          showModal={showModal}
          onClose={handleModalClose}
          info={infoModal}
        />
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
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
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
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
                        setInfoModal(row);
                        handleModalOpen();
                      }}
                    >
                      <Edit sx={{ color: blue[500] }} />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAreaFunction(row.id);
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

export default TableAreaList;
