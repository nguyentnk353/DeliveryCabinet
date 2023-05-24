import {
  Box,
  Button,
  Paper,
  Typography,
  Tabs,
  Tab,
  Autocomplete,
  TextField,
  InputAdornment,
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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MoreVert, SearchOutlined } from '@mui/icons-material';
import { useMount } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import getBoxTypeList from '../../../services/getBoxTypeList';
import * as yup from 'yup';
import { useFormik } from 'formik';
import createBoxType from './../../../services/createBoxType';

function createData(name, dsa, maths, dbms, networking) {
  return { name, dsa, maths, dbms, networking };
}

const rows = [
  createData('John', 80, 66, 76, 89),
  createData('Sandeep', 82, 83, 79, 98),
  createData('Raman', 85, 79, 80, 85),
  createData('Saini', 75, 67, 85, 78),
  createData('Virat', 90, 89, 84, 76),
  createData('Rohit', 86, 83, 95, 88),
  createData('Smriti', 92, 90, 89, 80),
  createData('Mandhana', 86, 88, 88, 89),
  createData('Deepti', 79, 86, 80, 88),
];

const validationSchema = yup.object({
  name: yup.string('Enter box type name').required('Name is required'),
  price: yup.string('Enter box type price').required('Price is required'),
});
const index = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  const [table, setTable] = useState([]);
  const [createSucess, setCreateSucess] = useState(false);
  // useEffect(() => {

  // });
  useMount(() => {
    getBoxTypeList()
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  useEffect(() => {
    getBoxTypeList()
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setCreateSucess(false);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const api = {
        name: val.name,
        multiplyPrice: val.price,
      };
      createBoxType(api)
        .then((res) => {
          setCreateSucess(true);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <Box sx={{ p: '5%' }}>
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
            ADD NEW BOX TYPE
          </Typography>
          <Box
            component='form'
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box sx={{ padding: '2rem', display: 'flex', gap: 2 }}>
              <TextField
                margin='normal'
                // width='80%'
                id='name'
                label='Name'
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                margin='normal'
                // width='20%'
                required
                id='price'
                label='Price'
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
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
                Add
              </Button>
              <Button variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Box paddingBottom='3rem'>
        <Typography variant='h6' fontWeight='bold'>
          Service type management
        </Typography>
      </Box>

      <Paper sx={{ p: '2%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            id='filled-search'
            placeholder='Search...'
            type='search'
            variant='outlined'
            sx={{ width: 450 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
          <Box>
            <Button variant='contained' onClick={handleOpen}>
              + New service type
            </Button>
          </Box>
        </Box>
        <Box>
          <Box sx={{ paddingTop: '2rem' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
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
                      <TableCell>{row.multiplyPrice}</TableCell>
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
                        <IconButton>
                          <MoreVert />
                        </IconButton>
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
              count={rows.length}
              rowsPerPage={rpg}
              page={pg}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default index;
