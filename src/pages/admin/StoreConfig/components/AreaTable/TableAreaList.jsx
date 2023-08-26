import {
  Add,
  DeleteForever,
  DeleteOutline,
  Edit,
  SearchOutlined,
} from '@mui/icons-material';
import {
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
} from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import getAreaList from '../../../../../services/getAreaList';
import UpdateAreaModal from '../UpdateAreaModal/UpdateAreaModal';
import useNotification from '../../../../../utils/useNotification';
import deleteArea from '../../../../../services/deleteArea';
import AddArea from './../AddArea/AddArea';

const TableAreaList = ({ status }) => {
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [row, setRow] = useState();
  const [showModal, setShowModal] = useState(false);
  const [infoModal, setInfoModal] = useState();
  const [msg, sendNotification] = useNotification();
  const [searchText, setSearchText] = useState('');
  const [showModalAdd, setShowModalAdd] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpenAdd = () => {
    setShowModalAdd(true);
  };

  const handleModalCloseAdd = () => {
    setShowModalAdd(false);
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
    const payload = {
      PageIndex: page + 1,
      PageSize: rpg,
      Name: searchText,
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
  }, [page, rpg, searchText, msg]);
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
        console.log({ msg: err, variant: 'error' });
      });
  }
  return (
    <Box>
      <Box>
        <UpdateAreaModal
          showModal={showModal}
          setShowModal={setShowModal}
          onOpen={handleModalOpen}
          onClose={handleModalClose}
          info={infoModal}
          msg={msg}
          sendNotification={sendNotification}
        />
      </Box>
      <AddArea
        showModal={showModalAdd}
        onClose={handleModalCloseAdd}
        msg={msg}
        sendNotification={sendNotification}
      />
      <Box
        sx={{
          p: '2%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TextField
          id='filled-search'
          placeholder='Search...'
          type='search'
          variant='outlined'
          // fullWidth
          sx={{ width: '75%' }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
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
            onClick={handleModalOpenAdd}
            sx={{ marginLeft: '1rem' }}
            startIcon={<Add />}
          >
            New area
          </Button>
        </Box>
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
