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
import getLockerList from '../../../../services/getLockerList';
import { blue, green, red } from '@mui/material/colors';
import deleteLocker from './../../../../services/deleteLocker';
import useNotification from '../../../../utils/useNotification';
import updateLocker from './../../../../services/updateLocker';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AssignModal from './AssignModal';
import { Empty } from 'antd';

const validationSchema = yup.object({
  name: yup.string('Enter box size name').required('Name is required'),
});

const LockerTable = ({ search, isEnable }) => {
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
      Name: '',
      IsEnable: isEnable,
      StoreId: '',
      PageIndex: pg + 1,
      PageSize: rpg,
    };
    getLockerList(payload)
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
    const payload = {
      Name: search,
      IsEnable: isEnable,
      StoreId: search,
      PageIndex: pg + 1,
      PageSize: rpg,
    };
    getLockerList(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }, [pg, rpg, search, msg]);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [field, setField] = React.useState({
    id: '',
    name: '',
    status: true,
    storeId: 0,
    description: '',
  });
  const [field2, setField2] = React.useState({
    id: '',
    name: '',
    storeId: '',
    status: true,
    description: '',
  });
  const handleOpen = () => setOpen(true);
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
    width: 700,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: field,
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const api = {
        id: field.id,
        name: val.name,
        storeId: field.storeId,
        description: val.description,
        isEnable: val.status,
      };
      updateLocker(api)
        .then((res) => {
          if (res.status == 200) {
            sendNotification({
              msg: 'Cabinet update success',
              variant: 'success',
            });
          } else {
            sendNotification({ msg: 'Cabinet update fail', variant: 'error' });
          }
          handleClose();
        })
        .catch((err) => {
          sendNotification({ msg: err, variant: 'error' });
        });
    },
  });

  function openUpdate(row) {
    setField({
      id: row.id,
      name: row.name,
      status: row.isEnable,
      storeId: row.storeId,
      description: row.description,
    });
    setOpen(true);
  }
  function apiDelete(id) {
    deleteLocker(id)
      .then((res) => {
        if (res.status == 200) {
          sendNotification({
            msg: 'Cabinet delete success',
            variant: 'success',
          });
        } else {
          sendNotification({ msg: 'Cabinet delete fail', variant: 'error' });
        }
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }
  function openAssign(row) {
    setField2({
      id: row.id,
      name: row.name,
      storeId: row.storeId,
      status: row.isEnable,
      description: row.description,
    });
    setOpen2(true);
  }
  return (
    <Box>
      <AssignModal
        open={open2}
        setOpen={setOpen2}
        field={field2}
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
              UPDATE CABINET
            </Typography>
            <Box
              component='form'
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Box sx={{ padding: '2rem' }}>
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
                <TextField
                  margin='normal'
                  fullWidth
                  id='description'
                  label='Description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
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

      <Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Rows</TableCell>
                <TableCell>Columns</TableCell>
                <TableCell>Store</TableCell>
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
                    navigate('/admin/cabinet-detail', {
                      state: {
                        cabinetInfo: row,
                      },
                    })
                  }
                >
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.row}</TableCell>
                  <TableCell>{row.col}</TableCell>
                  <TableCell>
                    {row.store.id != 0 ? row.store.name : 'Unassign'}
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
                          openUpdate(row);
                        }}
                      >
                        <Edit sx={{ color: blue[500] }} />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          apiDelete(row.id);
                        }}
                      >
                        <DeleteForever sx={{ color: red[600] }} />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          openAssign(row);
                        }}
                      >
                        <AssignmentTurnedIn sx={{ color: green[500] }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {table.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8}>
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
    </Box>
  );
};

export default LockerTable;
