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
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  InputAdornment,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMount } from 'ahooks';
import {
  Add,
  DeleteForever,
  DeleteOutline,
  Edit,
  MoreVert,
  SearchOutlined,
} from '@mui/icons-material';
import { blue, red } from '@mui/material/colors';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useNotification from '../../../../../utils/useNotification';
import getBoxTypeList from '../../../../../services/getBoxTypeList';
import updateBoxType from '../../../../../services/updateBoxType';
import deleteBoxType from '../../../../../services/deleteBoxType';
import AddBoxType from '../AddBoxType/AddBoxType';

const validationSchema = yup.object({
  name: yup.string('Enter box size name').required('Name is required'),
});

const BoxTypeTable = ({ createSuccess, isEnable }) => {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [msg, sendNotification] = useNotification();
  const [searchText, setSearchText] = useState('');
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
    const api = {
      Name: searchText,
      PageIndex: pg + 1,
      PageSize: rpg,
      IsEnable: isEnable,
    };
    getBoxTypeList(api)
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
    const api = {
      Name: searchText,
      PageIndex: pg + 1,
      PageSize: rpg,
      IsEnable: isEnable,
    };
    getBoxTypeList(api)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setTableTotal(res.totalRecord);
        createSuccess = false;
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }, [createSuccess, pg, rpg, searchText, msg]);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  const [field, setField] = React.useState({
    id: '',
    name: '',
    status: true,
  });
  const handleOpen = () => setOpen(true);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleClose = () => {
    formik.resetForm({
      values: {
        name: '',
        description: '',
        status: '',
      },
    });
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '16px',
    boxShadow: 24,
    p: '2rem',
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: field,
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const api = {
        id: field.id,
        name: val.name,
        isEnable: field.status,
      };
      updateBoxType(api)
        .then((res) => {
          if (res.status == 200) {
            sendNotification({
              msg: 'Box type update success',
              variant: 'success',
            });
          } else {
            sendNotification({ msg: 'Box type update fail', variant: 'error' });
          }
          handleClose();
        })
        .catch((err) => {
          sendNotification({ msg: err, variant: 'error' });
        });
    },
  });

  function openUpdateBoxType(row) {
    setField({
      id: row.id,
      name: row.name,
      status: row.isEnable,
    });
    setOpen(true);
  }
  function apiDeleteBoxType(id) {
    deleteBoxType(id)
      .then((res) => {
        if (res.status == 200) {
          sendNotification({
            msg: 'Box type delete success',
            variant: 'success',
          });
        } else {
          sendNotification({ msg: 'Box type delete fail', variant: 'error' });
        }
      })
      .catch((err) => {
        console.log({ msg: err, variant: 'error' });
      });
  }
  return (
    <Box>
      <AddBoxType
        open={openAdd}
        setOpen={setOpenAdd}
        msg={msg}
        sendNotification={sendNotification}
      />
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography
              id='modal-modal-title'
              variant='h5'
              component='h2'
              textAlign='center'
              fontWeight='bold'
              color={blue[500]}
            >
              UPDATE BOX TYPE
            </Typography>
            <Box
              component='form'
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Box sx={{ paddingBottom: '1rem' }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    margin='normal'
                    fullWidth
                    required
                    id='name'
                    label='Name'
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <Box sx={{ width: '50%', paddingTop: '1%' }}>
                    <FormControl fullWidth>
                      <InputLabel id='statusLabel'>Status</InputLabel>
                      <Select
                        labelId='statusLabel'
                        id='status'
                        label='Status'
                        value={formik.values.status}
                        onChange={(e) => {
                          formik.setFieldValue('status', e.target.value);
                        }}
                      >
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button variant='contained' type='submit'>
                  Update
                </Button>
                <Button variant='outlined' onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
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
            onClick={handleOpenAdd}
          >
            New box type
          </Button>
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell>Name</TableCell>
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
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
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
                        openUpdateBoxType(row);
                      }}
                    >
                      <Edit sx={{ color: blue[500] }} />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        apiDeleteBoxType(row.id);
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
  );
};

export default BoxTypeTable;
