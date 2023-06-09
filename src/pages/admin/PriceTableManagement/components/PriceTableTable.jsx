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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMount } from 'ahooks';
import { DeleteForever, Edit, MoreVert } from '@mui/icons-material';
import getBoxTypeList from './../../../../services/getBoxTypeList';
import useNotification from '../../../../utils/useNotification';
import { blue, red } from '@mui/material/colors';
import deleteBoxType from './../../../../services/deleteBoxType';
import { useFormik } from 'formik';
import * as yup from 'yup';
import updateBoxType from './../../../../services/updateBoxType';
import getPriceTableList from './../../../../services/getPriceTableList';
import moment from 'moment/moment';

const validationSchema = yup.object({
  name: yup.string('Enter box size name').required('Name is required'),
});

const PriceTableTable = ({ searchText, createSuccess, isEnable }) => {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
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
    const api = {
      Name: searchText,
      PageIndex: pg + 1,
      PageSize: rpg,
      IsEnable: isEnable,
    };
    getPriceTableList(api)
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
    const api = {
      Name: searchText,
      PageIndex: pg + 1,
      PageSize: rpg,
      IsEnable: isEnable,
    };
    getPriceTableList(api)
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

  const [field, setField] = React.useState({
    id: '',
    name: '',
    status: true,
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
        sendNotification({ msg: err, variant: 'error' });
      });
  }

  function showDateFilter(date) {
    const binary = parseInt((+date).toString(2)).toString();
    const b = binary.split('').map(Number);
    const check = b.map((e, i) => {
      let d = i + 2;
      if (d == 8) d = 'Sun';

      if (e == 1)
        return (
          <FormControlLabel disabled control={<Checkbox checked />} label={d} />
        );
      else
        return <FormControlLabel disabled control={<Checkbox />} label={d} />;
    });
    return check;
  }
  return (
    <Box>
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
                        value={field.status}
                        label='Status'
                        onChange={(e) => {
                          setField((preState) => ({
                            ...preState,
                            status: e.target.value,
                          }));
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
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Apply from</TableCell>
              <TableCell>Apply to</TableCell>
              <TableCell>Date apply</TableCell>
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
                  {moment(row.applyFrom).format('DD /MM /YYYY')}
                </TableCell>
                <TableCell>
                  {moment(row.applyTo).format('DD /MM /YYYY')}
                </TableCell>
                <TableCell>{showDateFilter(row.dateFilter)}</TableCell>
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

export default PriceTableTable;
