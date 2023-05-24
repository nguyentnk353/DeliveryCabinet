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
import getBoxSizeList from '../../../services/getBoxSizeList';
import { useMount } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';

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

  // useEffect(() => {

  // });
  useMount(() => {
    getBoxSizeList()
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
      })
      .catch((err) => {
        console.log(err);
      });
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
            ADD NEW BOX SIZE
          </Typography>
          <Box component='form' sx={{ mt: 1 }}>
            <Box sx={{ padding: '2rem' }}>
              <TextField
                margin='normal'
                fullWidth
                required
                id='name'
                label='Name'
                autoFocus
                // value={formik.values.address}
                // onChange={formik.handleChange}
                // error={formik.touched.address && Boolean(formik.errors.address)}
                // helperText={formik.touched.address && formik.errors.address}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='length'
                  label='Length'
                  autoFocus
                  // value={formik.values.address}
                  // onChange={formik.handleChange}
                  // error={formik.touched.address && Boolean(formik.errors.address)}
                  // helperText={formik.touched.address && formik.errors.address}
                />
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='height'
                  label='Height'
                  autoFocus
                  // value={formik.values.address}
                  // onChange={formik.handleChange}
                  // error={formik.touched.address && Boolean(formik.errors.address)}
                  // helperText={formik.touched.address && formik.errors.address}
                />
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='price'
                  label='Price'
                  autoFocus
                  // value={formik.values.address}
                  // onChange={formik.handleChange}
                  // error={formik.touched.address && Boolean(formik.errors.address)}
                  // helperText={formik.touched.address && formik.errors.address}
                />
              </Box>
              <TextField
                margin='normal'
                fullWidth
                required
                id='description'
                label='Description'
                autoFocus
                // value={formik.values.address}
                // onChange={formik.handleChange}
                // error={formik.touched.address && Boolean(formik.errors.address)}
                // helperText={formik.touched.address && formik.errors.address}
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
              <Button variant='contained'>Add</Button>
              <Button variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Paper sx={{ p: '2%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            Box size management
          </Typography>
          <Button variant='contained' onClick={handleOpen}>
            + New box size
          </Button>
        </Box>
        <Box>
          <Box sx={{ paddingTop: '2rem' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>Height</TableCell>
                    <TableCell>Price</TableCell>
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
                        {row.name}
                      </TableCell>
                      <TableCell>{row.length}</TableCell>
                      <TableCell>{row.height}</TableCell>
                      <TableCell>{row.multiplyPrice}</TableCell>
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