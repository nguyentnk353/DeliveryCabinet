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
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
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
import getBoxSizeList from '../../../../../services/getBoxSizeList';
import updateBoxSize from '../../../../../services/updateBoxSize';
import deleteBoxSize from '../../../../../services/deleteBoxSize';
import AddBoxSize from '../AddBoxSize/AddBoxSize';

const validationSchema = yup.object({
  name: yup.string('Enter box size name').required('Name is required'),
});

const BoxSizeTable = ({ createSuccess, isEnable }) => {
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
    getBoxSizeList(api)
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
    getBoxSizeList(api)
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
    description: '',
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
        description: val.description,
        isEnable: val.status,
      };
      updateBoxSize(api)
        .then((res) => {
          if (res.status == 200) {
            sendNotification({
              msg: 'Box size update success',
              variant: 'success',
            });
          } else {
            sendNotification({ msg: 'Box size update fail', variant: 'error' });
          }
          handleClose();
        })
        .catch((err) => {
          console.log({ msg: err, variant: 'error' });
        });
    },
  });

  function openUpdateBoxSize(row) {
    setField({
      id: row.id,
      name: row.name,
      status: row.isEnable,
      description: row.description,
    });
    setOpen(true);
  }
  function apiDeleteBoxSize(id) {
    deleteBoxSize(id)
      .then((res) => {
        if (res.status == 200) {
          sendNotification({
            msg: 'Box size delete success',
            variant: 'success',
          });
        } else {
          sendNotification({ msg: 'Box size delete fail', variant: 'error' });
        }
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }
  return (
    <Box>
      <AddBoxSize
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
              UPDATE BOX SIZE
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
                <TextField
                  margin='normal'
                  fullWidth
                  id='description'
                  label='Description'
                  autoFocus
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
            New box size
          </Button>
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Length</TableCell>
              <TableCell>Height</TableCell>
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
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.length}</TableCell>
                <TableCell>{row.height}</TableCell>
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
                        openUpdateBoxSize(row);
                      }}
                    >
                      <Edit sx={{ color: blue[500] }} />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        apiDeleteBoxSize(row.id);
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

export default BoxSizeTable;
