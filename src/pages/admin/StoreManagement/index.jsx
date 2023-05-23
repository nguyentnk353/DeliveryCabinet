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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MoreVert, SearchOutlined } from '@mui/icons-material';
import getStoreList from '../../../services/getStoreList';
import { useMount } from 'ahooks';
import { green } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
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
const provinceList = [
  { name: 'HCM', key: 1 },
  { name: 'HN', key: 2 },
  { name: 'Khanh Hoa', key: 3 },
];
const index = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

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
    getStoreList()
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: '700' }}>
          Store List
        </Typography>
        <Button
          variant='contained'
          onClick={() => navigate('/admin/new-store', { replace: true })}
        >
          + New store
        </Button>
      </Box>
      <Paper sx={{ borderRadius: '16px' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: '#f4f6f8',
            borderRadius: '16px 16px 0 0',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='All' {...a11yProps(0)} />
            <Tab label='Active' {...a11yProps(1)} />
            <Tab label='Inactive' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box
          sx={{
            p: '2%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <Autocomplete
            disablePortal
            id='province'
            options={provinceList}
            getOptionLabel={(option) => option.name}
            onChange={() => {
              callApiDistrict(host + 'p/' + $('#province').val() + '?depth=2');
            }}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label='Province' />}
          />
          <Autocomplete
            disablePortal
            id='district'
            options={provinceList}
            getOptionLabel={(option) => option.name}
            onChange={() => {
              callApiWard(host + 'd/' + $('#district').val() + '?depth=2');
            }}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label='City' />}
          />
          <Autocomplete
            disablePortal
            id='ward'
            options={provinceList}
            getOptionLabel={(option) => option.name}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label='District' />}
          />
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
        </Box>
        <TabPanel value={value} index={0}>
          <Box>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                  <TableRow>
                    <TableCell>Id</TableCell>
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
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.id}
                      </TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.userId}</TableCell>
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box>Table 2</Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box>Table 3</Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default index;
